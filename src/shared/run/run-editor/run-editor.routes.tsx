import { RunEditor } from "./run-editor";
import { RouteObject } from "react-router-dom";

export const RUN_EDITOR_ROUTE: RouteObject = {
  path: "/run/:testName/:runDateTime?",
  element: <RunEditor />,
};

export function runEditorRoute({
  testName,
  runDateTime,
}: RunEditorRouteParams) {
  return `/run/${testName}/${runDateTime}`;
}

export interface RunEditorRouteParams extends Record<string, string> {
  readonly testName: string;
  readonly runDateTime: string;
}
