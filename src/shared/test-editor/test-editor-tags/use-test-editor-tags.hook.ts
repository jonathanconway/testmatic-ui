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

  const handleItemDeleteClick = (tag: Tag) => async () => {
    const result = await deleteTagFromTest(test.name, tag.name);

    showSuccessOrErrorNotification(result, {
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

    const result = await addTagToTest(test.name, newOrLookupTagName);

    showSuccessOrErrorNotification(result, {
      anchorElement: tagsContainerRef.current,
    });

    if (result.type === ResultTypes.Ok) {
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
