import { TypeOfConst } from "testmatic";

export const ZIndexes = {
  Popper: 150,
  TitleEditorInput: 10,
  ToggleButtonSelected: 10,
  StepEditorDisplayVisible: 10,
  StepEditorDisplayNotVisible: 10,
  StepEditorInputSelectionMeasurer: -10,
  StepEditorInputContainerVisible: 20,
  StepEditorDisplayStepTokenTag: 50,
};

export type ZIndex = TypeOfConst<typeof ZIndexes>;
