import { snakeCase } from "lodash";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Tag } from "testmatic";

import { useProject } from "../../../hooks";
import { ResultTypes } from "../../../hooks/result";
import { showSuccessOrErrorNotification } from "../../notification";
import { useEditingTest } from "../use-editing-test.hook";

interface UseTestEditorTagsState {
  readonly addInputValue: string;
}

export function useTestEditorTags() {
  const tagsContainerRef = useRef<HTMLDivElement>(null);

  const { test } = useEditingTest();

  const { addTagToTest, deleteTagFromTest } = useProject();

  const [state, setState] = useState<UseTestEditorTagsState>({
    addInputValue: "",
  });

  const tags = test?.tags ?? [];

  const handleItemDeleteClick = (tag: Tag) => () => {
    const deleteTagFromTestResult = deleteTagFromTest(test.name, tag.name);

    showSuccessOrErrorNotification(deleteTagFromTestResult, {
      anchorElement: tagsContainerRef.current,
    });
  };

  const addInputValue = state.addInputValue;

  const handleAddInputInput = (event: FormEvent<HTMLInputElement>) => {
    const addInputValue = (event as ChangeEvent<HTMLInputElement>).target.value;

    setState({ addInputValue });
  };

  const handleAddInputSelectItem = (suggestion: string) => {
    setState({ addInputValue: suggestion });
  };

  const isAddButtonEnabled = Boolean(addInputValue);

  const handleAddButtonClick = async () => {
    const value = state.addInputValue;
    const newOrLookupTagName = snakeCase(value);

    const addTagToTestResult = await addTagToTest(
      test.name,
      newOrLookupTagName,
    );

    showSuccessOrErrorNotification(addTagToTestResult, {
      anchorElement: tagsContainerRef.current,
    });

    if (addTagToTestResult.type === ResultTypes.Ok) {
      setState({
        ...state,
        addInputValue: "",
      });
    }
  };

  return {
    tagsContainerRef,
    tags,
    addInputValue,
    isAddButtonEnabled,
    handleAddButtonClick,
    handleAddInputInput,
    handleAddInputSelectItem,
    handleItemDeleteClick,
  };
}
