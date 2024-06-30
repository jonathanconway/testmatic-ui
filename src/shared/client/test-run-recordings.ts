import { SERVER_BASE_URL } from "./base";

export interface TestRunRecordingsParams {
  readonly testName: string;
  readonly runDateTime: string;
}

export type TestRunRecordingsResult = readonly TestRunRecording[];

export interface TestRunRecording {
  readonly thumbnailFilename: string;
  readonly thumbnailPathFilename: string;
  readonly thumbnailUrl: string;
}

export async function testRunRecordings({
  testName,
  runDateTime,
}: TestRunRecordingsParams) {
  const response = await fetch(
    `${SERVER_BASE_URL}/tests/${testName}/runs/${runDateTime}/recordings`,
  );
  const json = await response.json();

  return json as readonly TestRunRecording[];
}
