import { TypeOfConst } from "testmatic";

export const ZIndexes = {
  Popper: 3,
  TitleEditorInput: 1,
  ToggleButtonSelected: 1,
  StepEditorDisplayVisible: 1,
  StepEditorDisplayNotVisible: 1,
  StepEditorInputSelectionMeasurer: -10,
  StepEditorInputContainerVisible: 2,
};

export type ZIndex = TypeOfConst<typeof ZIndexes>;
