import { ChangeEvent, ReactNode, useRef, useState } from "react";

import { AddRemoveListBoxHeaderContentProps } from "./add-remove-list-box";

interface UseAddRemoveListBoxParams {
  readonly headerContent?: ReactNode;

  readonly renderHeaderContent?: (
    props: AddRemoveListBoxHeaderContentProps,
  ) => ReactNode;
  readonly renderAddItemPopupContent?: (params: {
    readonly close: VoidFunction;
  }) => ReactNode;

  readonly onAddItem?: (value: string) => void;
}

interface UseAddRemoveListBoxState {
  readonly addInputValue: string;
  readonly isAddItemPopupOpen: boolean;
}

export function useAddRemoveListBox(params: UseAddRemoveListBoxParams) {
  const [state, setState] = useState<UseAddRemoveListBoxState>({
    addInputValue: "",
    isAddItemPopupOpen: false,
  });

  const addButtonRef = useRef<HTMLButtonElement>(null);

  const isInlineAddInputRendered = Boolean(!params.renderAddItemPopupContent);

  const isAddButtonEnabled = !params.renderHeaderContent
    ? state.addInputValue.trim() !== ""
    : true;

  const addInputValue = state.addInputValue;

  function handleAddInputInput(event: ChangeEvent<HTMLInputElement>) {
    setState((previousState) => ({
      ...previousState,
      addInputValue: event.target.value,
    }));
  }

  function handleAddButtonClick() {
    if (params.renderAddItemPopupContent) {
      openAddItemPopup();
      return;
    }

    params.onAddItem?.(state.addInputValue);

    setState((previousState) => ({
      ...previousState,
      addInputValue: "",
    }));
  }

  const openAddItemPopup = () => {
    setState((previousState) => ({
      ...previousState,
      isAddItemPopupOpen: true,
    }));
  };

  const isAddItemPopupOpen = state.isAddItemPopupOpen;

  const handleAddItemPopupClose = () => {
    setState((previousState) => ({
      ...previousState,
      isAddItemPopupOpen: false,
    }));
  };

  return {
    addInputValue,
    isAddButtonEnabled,
    addButtonRef,
    isInlineAddInputRendered,
    isAddItemPopupOpen,
    handleAddInputInput,
    handleAddButtonClick,
    handleAddItemPopupClose,
  };
}
