import { BASE_URL } from "./base";

export function testLinkAdd(
  testId: string,
  linkHref: string,
  linkTitle?: string
) {
  return fetch(`${BASE_URL}/tests/${testId}/links`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      href: linkHref,
      title: linkTitle ?? "",
    }),
  });
}
