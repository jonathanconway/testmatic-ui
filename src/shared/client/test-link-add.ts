import { SERVER_BASE_URL } from "./base";

export function testLinkAdd(
  testName: string,
  linkHref: string,
  linkTitle?: string,
) {
  return fetch(`${SERVER_BASE_URL}/tests/${testName}/links`, {
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
