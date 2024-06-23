import { Button } from "../button";
import { Stack, StackProps } from "../layout";
import { ListBox, ListBoxItem } from "../list-box";
import { TextBox } from "../text-box";
import { useAddRemoveListBox } from "./use-add-remove-list-box.hooks";
import { omit } from "lodash";

export interface AddRemoveListBoxProps extends StackProps {
  readonly items?: readonly string[];

  readonly onAddItem?: (value: string) => void;
  readonly onDeleteItem?: (value: string) => void;
  readonly onEditItem?: (oldValue: string, newValue: string) => void;
}

export function AddRemoveListBox(props: AddRemoveListBoxProps) {
  const {
    addInputValue,
    isAddButtonEnabled,
    handleAddInputInput,
    handleAddButtonClick,
  } = useAddRemoveListBox(props);

  const restProps = omit(
    props,
    "items",
    "onAddItem",
    "onDeleteItem",
    "onEditItem"
  );

  return (
    <Stack spacing={0.5} overflow="scroll" height="100%" {...restProps}>
      <Stack spacing={0.5} direction="row" justifyContent="space-evenly">
        <TextBox value={addInputValue} onInput={handleAddInputInput} />

        <Button
          size="small"
          disabled={!isAddButtonEnabled}
          onClick={handleAddButtonClick}
        >
          Add
        </Button>
      </Stack>
      <ListBox>
        {props.children
          ? props.children
          : props.items?.map((item) => (
              <ListBoxItem key={item} value={item}>
                {item}
              </ListBoxItem>
            ))}
      </ListBox>
    </Stack>
  );
}
