import { TypeOfConst } from "../utils";

export const IconNames = {
  Close: "close",
  Collapse: "collapse",
  Delete: "delete",
  Edit: "edit",
  Error: "error",
  Expand: "expand",
  Failed: "failed",
  FolderOpen: "folder-open",
  Info: "info",
  Link: "link",
  Mixed: "mixed",
  NotRun: "not-run",
  Passed: "passed",
  Run: "run",
  Tag: "tag",
  Test: "test",
  ThreeDots: "three-dots",
} as const;

export type IconName = TypeOfConst<typeof IconNames>;
