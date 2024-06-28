import { TestEditor } from "./test-editor";
import { RouteObject } from "react-router-dom";
import { Test, createTest } from "testmatic";

export const TEST_EDITOR_ROUTE: RouteObject = {
  path: "/test/:testName?",
  element: <TestEditor />,
};

export function testEditorRoute(testName: string) {
  return `/test/${testName}`;
}

export const TEST_NEW_NAME = "new_test";

export const TEST_NEW = createTest({
  title: "New test",
  stepTexts: ["First step"],
}) as Test;

export function testEditorNewTestRoute() {
  return testEditorRoute(TEST_NEW_NAME);
}
