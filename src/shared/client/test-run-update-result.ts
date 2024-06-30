import { RunResult } from "testmatic";

import { SERVER_BASE_URL } from "./base";

export async function testRunUpdateResult(
  testName: string,
  dateTime: string,
  result?: RunResult,
) {
  return await fetch(
    `${SERVER_BASE_URL}/tests/${testName}/runs/${dateTime}/result`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        result,
      }),
    },
  );
}
