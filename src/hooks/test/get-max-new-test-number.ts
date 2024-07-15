import { orderBy } from "lodash";
import { ProjectView, isNotNil } from "testmatic";

function getTestTitlePrefix(testTitle: string) {
  const testTitleParts = testTitle.trim().split(" ");

  if (testTitleParts.length <= 1) {
    return testTitle;
  }

  const testTitlePartsLast = testTitleParts.slice(-1)[0];

  if (!isNaN(Number(testTitlePartsLast))) {
    return testTitleParts.slice(0, testTitleParts.length - 1).join(" ");
  }

  return testTitle;
}

function getTestTitleNumber(testTitle: string) {
  const testTitleParts = testTitle.trim().split(" ");

  if (testTitleParts.length <= 1) {
    return undefined;
  }

  const testTitlePartsLast = testTitleParts.slice(-1)[0];

  if (!isNaN(Number(testTitlePartsLast))) {
    return Number(testTitlePartsLast);
  }

  return undefined;
}

export function getMaxNewTestNumber(project: ProjectView, testTitle: string) {
  const testTitlePrefix = getTestTitlePrefix(testTitle);

  const matchingTitles = project.tests
    .filter((test) => test.title.startsWith(testTitlePrefix))
    .map((test) => test.title);

  const matchingTitleNumbers = orderBy(
    matchingTitles.map(getTestTitleNumber).filter(isNotNil),
    [],
    "desc",
  );

  const matchingTitleNumberMax = matchingTitleNumbers[0];

  if (matchingTitles.length > 0 && matchingTitleNumberMax) {
    return matchingTitleNumberMax;
  }

  return 1;
}

export function getDuplicateTestTitle(project: ProjectView, testTitle: string) {
  const testTitlePrefix = getTestTitlePrefix(testTitle);

  const duplicateTestTitle = `${testTitlePrefix} ${getMaxNewTestNumber(project, testTitle) + 1}`;

  return duplicateTestTitle;
}
