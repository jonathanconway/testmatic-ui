import { SERVER_BASE_URL } from "../../../../shared/client/base";

export function testRunDelete(
  lookupTestNameOrTitle: string,
  lookupRunDateTime: string,
) {
  return fetch(
    `${SERVER_BASE_URL}/tests/${lookupTestNameOrTitle}/runs/${lookupRunDateTime}/result`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );
}
