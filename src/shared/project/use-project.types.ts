import { Link, ProjectView, Run, Step, Tag, Test } from "testmatic";

export interface UseProjectResult {
  readonly project: ProjectView;
  readonly saveProject: (updatedProject: ProjectView) => void;
  readonly refetchProject: VoidFunction;
}

export interface UseProjectMethods {
  // Test
  readonly addNewTest: (newTest: Test) => void;
  readonly deleteTest: (lookupTestName: string) => void;
  readonly updateTestTitle: (lookupTestName: string, newTitle: string) => void;
  readonly updateTestDescription: (
    lookupTestName: string,
    newTestDescription: string,
  ) => void;

  // Test - Step
  readonly addNewTestStep: (lookupTestName: string, newStep: Step) => void;
  readonly updateTestStep: (
    lookupTestName: string,
    lookupStepIndex: number,
    updatedStep: Step,
  ) => void;
  readonly deleteTestStep: (
    lookupTestName: string,
    lookupStepIndex: number,
  ) => void;

  // Test - Tag
  readonly addTestTag: (
    lookupTestName: string,
    newOrLookupTagName: string,
  ) => void;
  readonly deleteTestTag: (
    lookupTestName: string,
    lookupTagName: string,
  ) => void;

  // Test - Link
  readonly addTestLink: (lookupTestName: string, newLink: Link) => void;
  readonly deleteTestLink: (
    lookupTestName: string,
    lookupLinkHref: string,
    lookupLinkTitle?: string,
  ) => void;

  // Test - Run
  readonly addNewTestRun: (lookupTestName: string, newRun: Run) => void;
  readonly deleteTestRun: (
    lookupTestName: string,
    lookupRunDateTime: string,
  ) => void;
  readonly updateTestRunDateTime: (
    lookupTestName: string,
    lookupRunDateTime: string,
    newRunDateTime: string,
  ) => void;
  readonly addNewTestRunFile: (
    lookupTestName: string,
    lookupRunDateTime: string,
    newRunFileName: string,
    newRunFileContent: string,
  ) => void;
  readonly addNewTestRunLink: (
    lookupTestName: string,
    lookupRunDateTime: string,
    newRunLinkHref: string,
    newRunLinkTitle?: string,
  ) => void;

  // Tag
  readonly addNewTag: (newTag: Tag) => void;
  readonly updateTagTitle: (lookupTagName: string, newTagTitle: string) => void;
  readonly updateTagDescription: (
    lookupTagName: string,
    newTagDescription: string,
  ) => void;
  readonly addNewTagLink: (
    lookupTagName: string,
    newTagLinkHref: string,
    newTagLinkTitle?: string,
  ) => void;
  readonly deleteTag: (lookupTagName: string) => void;
}
