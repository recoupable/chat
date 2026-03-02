"use client";

import { useArtistProvider } from "@/providers/ArtistProvider";
import { useArtistConnectorCallback } from "@/hooks/useArtistConnectorCallback";
import Modal from "./Modal";
import Settings from "./ArtistSetting/Settings";

const ArtistSettingModal = () => {
  const { isOpenSettingModal, toggleSettingModal } = useArtistProvider();

  // Handles OAuth redirect: detects ?artist_connected=true in URL,
  // auto-opens modal to the Connectors tab, and returns the default tab.
  const defaultTab = useArtistConnectorCallback();

  return (
    <>
      {isOpenSettingModal && (
        <Modal onClose={toggleSettingModal}>
          <Settings defaultTab={defaultTab} />
        </Modal>
      )}
    </>
  );
};

export default ArtistSettingModal;
