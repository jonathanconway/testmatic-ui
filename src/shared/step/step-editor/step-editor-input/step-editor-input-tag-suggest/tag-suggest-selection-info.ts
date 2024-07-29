import { Maybe } from "../../../../utils";

export interface InputTagSelectionInfo {
  readonly openBracketIndex: number;
  readonly closeBracketIndex: number;
  readonly valueBetweenBrackets: string;
  readonly valueBetweenBracketsBeforeCursor: string;
}

export function getInputTagSelectionInfo({
  value,
  selectionStart,
  selectionEnd,
}: {
  readonly value: string;
  readonly selectionStart: number | null;
  readonly selectionEnd: number | null;
}): Maybe<InputTagSelectionInfo> {
  const selectionStartOrDefault = selectionStart ?? 0;
  const selectionEndOrDefault = selectionEnd ?? 0;

  const valueBeforeSelection = value.substring(0, selectionStartOrDefault);
  const valueAfterSelection = value.substring(selectionEndOrDefault);

  const lastIndexOfOpenBracketBeforeSelection =
    valueBeforeSelection.lastIndexOf("(");
  const lastIndexOfCloseBracketBeforeSelection =
    valueBeforeSelection.lastIndexOf(")");

  const firstIndexOfOpenBracketAfterSelection =
    valueAfterSelection.indexOf("(") + 1;
  const firstIndexOfCloseBracketAfterSelection =
    valueAfterSelection.indexOf(")") + 1;

  const firstIndexOfBracketAfterSelection = [
    firstIndexOfOpenBracketAfterSelection,
    firstIndexOfCloseBracketAfterSelection,
  ]
    .filter((value) => value > 0)
    .sortBy()[0];

  const closeBracketAfterOpenBracket =
    lastIndexOfCloseBracketBeforeSelection >
    lastIndexOfOpenBracketBeforeSelection;

  const noOpenBracket = lastIndexOfOpenBracketBeforeSelection === -1;

  if (noOpenBracket || closeBracketAfterOpenBracket) {
    return undefined;
  }

  const openBracketIndex = lastIndexOfOpenBracketBeforeSelection + 1;

  const closeBracketIndex = firstIndexOfBracketAfterSelection
    ? selectionEndOrDefault + firstIndexOfBracketAfterSelection - 1
    : value.length;

  const valueBetweenBrackets = value.substring(
    openBracketIndex,
    closeBracketIndex,
  );

  const valueBetweenBracketsBeforeCursor = value.substring(
    openBracketIndex,
    selectionStartOrDefault,
  );

  return {
    openBracketIndex,
    closeBracketIndex,
    valueBetweenBrackets,
    valueBetweenBracketsBeforeCursor,
  };
}
