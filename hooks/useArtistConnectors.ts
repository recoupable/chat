"use client";

import { useState, useEffect, useCallback } from "react";
import { useAccessToken } from "@/hooks/useAccessToken";
import { fetchConnectorsApi } from "@/lib/composio/api/fetchConnectorsApi";
import { authorizeConnectorApi } from "@/lib/composio/api/authorizeConnectorApi";
import { disconnectConnectorApi } from "@/lib/composio/api/disconnectConnectorApi";
import { ALLOWED_ARTIST_CONNECTORS } from "@/lib/composio/allowedArtistConnectors";
import type { ConnectorInfo } from "@/hooks/useConnectors";

/**
 * Hook for managing connectors scoped to a specific artist.
 *
 * Why separate from useConnectors: different context (artist account vs. user account),
 * different allowed connectors (TikTok vs. Google tools), and the account_id param
 * changes the entire data scope. Shared API functions in lib/composio/api/ handle DRY.
 */
export function useArtistConnectors(artistAccountId: string | undefined) {
  const accessToken = useAccessToken();

  const [connectors, setConnectors] = useState<ConnectorInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConnectors = useCallback(async () => {
    if (!accessToken || !artistAccountId) {
      setConnectors([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const allConnectors = await fetchConnectorsApi(accessToken, artistAccountId);

      // Filter to artist-allowed connectors only
      const allowed = new Set<string>(ALLOWED_ARTIST_CONNECTORS);
      const visible = allConnectors.filter((c) =>
        allowed.has(c.slug.toLowerCase()),
      );
      setConnectors(visible);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, artistAccountId]);

  const authorize = useCallback(
    async (connector: string): Promise<string | null> => {
      if (!accessToken || !artistAccountId) return null;

      // Build callback URL to return the user to the current page
      const callbackUrl = `${window.location.origin}${window.location.pathname}?artist_connected=true&artist_id=${artistAccountId}`;

      try {
        return await authorizeConnectorApi(accessToken, {
          connector,
          accountId: artistAccountId,
          callbackUrl,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        return null;
      }
    },
    [accessToken, artistAccountId],
  );

  const disconnect = useCallback(
    async (connectedAccountId: string): Promise<boolean> => {
      if (!accessToken || !artistAccountId) return false;

      try {
        await disconnectConnectorApi(accessToken, connectedAccountId, artistAccountId);
        // Refresh the list after disconnect
        await fetchConnectors();
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        return false;
      }
    },
    [accessToken, artistAccountId, fetchConnectors],
  );

  useEffect(() => {
    fetchConnectors();
  }, [fetchConnectors]);

  return {
    connectors,
    isLoading,
    error,
    refetch: fetchConnectors,
    authorize,
    disconnect,
  };
}
