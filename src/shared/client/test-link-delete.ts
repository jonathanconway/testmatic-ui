import { BASE_URL } from "./base";

export function testLinkDelete(testId: string, linkHref: string) {
  return fetch(`${BASE_URL}/tests/${testId}/links/${linkHref}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
