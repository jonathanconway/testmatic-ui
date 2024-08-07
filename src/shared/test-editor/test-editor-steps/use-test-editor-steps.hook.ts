import { useTestEditorStepsAdding } from "./use-test-editor-steps-adding.hook";
import { useTestEditorStepsEditing } from "./use-test-editor-steps-editing.hook";

export function useTestEditorSteps() {
  const editing = useTestEditorStepsEditing();
  const adding = useTestEditorStepsAdding();

  return {
    editing,
    adding,
  };
}
