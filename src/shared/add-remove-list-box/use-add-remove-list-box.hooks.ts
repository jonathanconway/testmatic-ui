import { ChangeEvent, useState } from "react";

interface UseAddRemoveListBoxProps {
  readonly onAddItem?: (value: string) => void;
}

interface UseAddRemoveListBoxState {
  readonly addInputValue: string;
}

export function useAddRemoveListBox(props: UseAddRemoveListBoxProps) {
  const [state, setState] = useState<UseAddRemoveListBoxState>({
    addInputValue: "",
  });

  const isAddButtonEnabled = state.addInputValue.trim() !== "";

  function handleAddInputInput(event: ChangeEvent<HTMLInputElement>) {
    setState((previousState) => ({
      ...previousState,
      addInputValue: event.target.value,
    }));
  }

  function handleAddButtonClick() {
    props.onAddItem?.(state.addInputValue);

    setState((previousState) => ({
      ...previousState,
      addInputValue: "",
    }));
  }

  return {
    addInputValue: state.addInputValue,
    isAddButtonEnabled,
    handleAddInputInput,
    handleAddButtonClick,
  };
}
