import { getClientApiBaseUrl } from "@/lib/api/getClientApiBaseUrl";
import readApiError from "@/lib/billing/readApiError";
import type { AutoTopUpSettings } from "@/lib/recoup/getAccountAutoTopUp";

export interface AutoTopUpInput {
  enabled: boolean;
  amountCents: number;
  thresholdCents: number;
}

/** PUT /api/accounts/{id}/auto-top-up; throws the api's message on a 4xx or an error envelope. */
async function updateClientAutoTopUp(
  accountId: string,
  accessToken: string,
  input: AutoTopUpInput,
): Promise<AutoTopUpSettings> {
  const response = await fetch(
    `${getClientApiBaseUrl()}/api/accounts/${accountId}/auto-top-up`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(input),
    },
  );
  if (!response.ok) throw await readApiError(response);
  const body = await response.json();
  if (body?.status === "error") {
    throw new Error(
      typeof body.error === "string" ? body.error : "Could not save settings",
    );
  }
  return body;
}

export default updateClientAutoTopUp;
