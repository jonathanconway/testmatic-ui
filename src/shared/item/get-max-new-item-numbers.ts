import { last, orderBy } from "lodash";
import { isNotNil } from "testmatic";

// todo : Maybe this file needs a different name and location?

function getItemTitlePrefix(itemTitle: string) {
  const itemTitleParts = itemTitle.trim().split(" ");

  if (itemTitleParts.length <= 1) {
    return itemTitle;
  }

  const itemTitlePartsLast = itemTitleParts.slice(-1)[0];

  if (!isNaN(Number(itemTitlePartsLast))) {
    return itemTitleParts.slice(0, itemTitleParts.length - 1).join(" ");
  }

  return itemTitle;
}

function getItemTitleNumber(itemTitle: string) {
  const itemTitleParts = itemTitle.trim().split(" ");

  if (itemTitleParts.length <= 1) {
    return undefined;
  }

  const itemTitlePartsLast = last(itemTitleParts);

  if (!isNaN(Number(itemTitlePartsLast))) {
    return Number(itemTitlePartsLast);
  }

  return undefined;
}

export function getMaxNewItemNumber(
  itemTitles: readonly string[],
  itemTitle: string,
) {
  const testTitlePrefix = getItemTitlePrefix(itemTitle);

  const matchingTitles = itemTitles.filter((testTitle) =>
    testTitle.startsWith(testTitlePrefix),
  );

  const matchingTitleNumbers = orderBy(
    matchingTitles.map(getItemTitleNumber).filter(isNotNil),
    [],
    "desc",
  );

  const matchingTitleNumberMax = matchingTitleNumbers[0];

  if (matchingTitles.length > 0) {
    return matchingTitleNumberMax ?? 1;
  }

  return 0;
}

export function getDuplicateItemTitle(
  itemTitles: readonly string[],
  itemTitlePrefix: string,
) {
  const testTitlePrefix = getItemTitlePrefix(itemTitlePrefix);

  const maxNewTestNumber = getMaxNewItemNumber(itemTitles, itemTitlePrefix);
  const testTitleSuffix = maxNewTestNumber ? maxNewTestNumber + 1 : "";
  const duplicateTestTitle = `${testTitlePrefix} ${testTitleSuffix}`.trim();

  return duplicateTestTitle;
}
