"use client";

import { useEffect, useState } from "react";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { toast } from "sonner";

/**
 * Handle the OAuth callback after an artist connector is authorized.
 *
 * Checks for `artist_connected=true` and `artist_id` in the URL search params
 * (set by the callback_url passed to the authorize endpoint). When detected:
 * 1. Finds the artist by ID from the loaded artists list
 * 2. Opens the settings modal on the "Connectors" tab
 * 3. Cleans up the URL params
 * 4. Shows a success toast
 *
 * Why window.location.search instead of useSearchParams():
 * useSearchParams() from next/navigation requires a Suspense boundary and can
 * trigger re-suspensions during re-render cascades, which would unmount the
 * entire provider tree and reset modal state. Using the raw DOM API avoids
 * this interaction entirely.
 *
 * @returns The default tab to show in Settings ("connectors" if callback detected, otherwise "general")
 */
export function useArtistConnectorCallback(): string {
  const {
    artists,
    toggleUpdate,
    setIsOpenSettingModal,
  } = useArtistProvider();
  const [defaultTab, setDefaultTab] = useState("general");

  useEffect(() => {
    // Read URL params directly from the DOM — avoids Next.js useSearchParams() Suspense issues
    const params = new URLSearchParams(window.location.search);
    const isCallback = params.get("artist_connected") === "true";
    const artistId = params.get("artist_id");

    if (!isCallback || !artistId) return;

    // Wait until artists are loaded before finding the target
    if (!artists || artists.length === 0) return;

    const artist = artists.find(
      (a: { account_id: string }) => a.account_id === artistId,
    );

    if (!artist) return;

    // Open settings modal to the Connectors tab for this artist
    toggleUpdate(artist);
    setIsOpenSettingModal(true);
    setDefaultTab("connectors");

    // Clean up URL params
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, "", cleanUrl);

    toast.success("Connector connected successfully");
  }, [artists, toggleUpdate, setIsOpenSettingModal]);

  return defaultTab;
}
