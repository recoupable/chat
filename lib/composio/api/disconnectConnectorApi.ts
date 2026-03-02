import { NEW_API_BASE_URL } from "@/lib/consts";

/**
 * Disconnect a connected account from a third-party service.
 *
 * @param accessToken - Bearer token for authentication
 * @param connectedAccountId - The Composio connected account ID to disconnect
 * @param accountId - Optional account ID for ownership verification (e.g., artist ID)
 * @returns true on success
 */
export async function disconnectConnectorApi(
  accessToken: string,
  connectedAccountId: string,
  accountId?: string,
): Promise<boolean> {
  const response = await fetch(`${NEW_API_BASE_URL}/api/connectors`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      connected_account_id: connectedAccountId,
      ...(accountId && { account_id: accountId }),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to disconnect connector");
  }

  return true;
}
