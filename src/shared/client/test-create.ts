import { CreateTestParams } from "testmatic";
import { BASE_URL } from "./base";

export function testCreate(createTestParams: CreateTestParams) {
  return fetch(`${BASE_URL}/tests`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createTestParams),
  });
}
