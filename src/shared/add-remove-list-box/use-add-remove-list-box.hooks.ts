import { AddRemoveListBoxAddItemPopupContentProps } from "./add-remove-list-box.types";
import { ChangeEvent, ReactNode, useRef, useState } from "react";

interface UseAddRemoveListBoxProps {
  readonly renderAddItemPopupContent?: (
    params: AddRemoveListBoxAddItemPopupContentProps
  ) => ReactNode;

  readonly onAddItem?: (value: string) => void;
}

interface UseAddRemoveListBoxState {
  readonly addInputValue: string;
  readonly isAddItemPopupOpen: boolean;
}

export function useAddRemoveListBox(props: UseAddRemoveListBoxProps) {
  const [state, setState] = useState<UseAddRemoveListBoxState>({
    addInputValue: "",
    isAddItemPopupOpen: false,
  });

  const addButtonRef = useRef<HTMLButtonElement>(null);

  const isInlineAddInputRendered = !props.renderAddItemPopupContent;

  const isAddButtonEnabled = isInlineAddInputRendered
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
    if (props.renderAddItemPopupContent) {
      openAddItemPopup();
      return;
    }

    props.onAddItem?.(state.addInputValue);

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
