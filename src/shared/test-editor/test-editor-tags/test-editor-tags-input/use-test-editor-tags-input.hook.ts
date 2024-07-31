import { useProject } from "../../../../hooks";
import { useEditingTest } from "../../use-editing-test.hook";

export function useTestEditorTagsInput() {
  const { project } = useProject();

  const { test } = useEditingTest();

  const testTags = test?.tags.map((tag) => tag.name) ?? [];

  const tagsAvailableForAdding =
    project?.tags?.filter((tag) => !testTags?.includes(tag.name)) ?? [];

  const items = tagsAvailableForAdding.map((tag) => tag.title);

  return {
    items,
  };
}
