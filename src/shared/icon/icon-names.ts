import { TypeOfConst } from "../utils";

export const IconNames = {
  Close: "close",
  Edit: "edit",
  Delete: "delete",
  Error: "error",
  Expand: "expand",
  Collapse: "collapse",
  Test: "test",
  Tag: "tag",
  Run: "run",
  Failed: "failed",
  Mixed: "mixed",
  Passed: "passed",
  NotRun: "not-run",
  FolderOpen: "folder-open",
  Link: "link",
  ThreeDots: "three-dots",
} as const;

export type IconName = TypeOfConst<typeof IconNames>;
