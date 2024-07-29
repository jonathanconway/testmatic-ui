import { ReactNode } from "react";

import { Button } from "../button";
import { Stack, StackProps } from "../layout";
import { ListBox, ListBoxItem } from "../list-box";
import { Popover } from "../popover";
import { TextBox } from "../text-box";

import * as Styled from "./add-remove-list-box.styles";
import { useAddRemoveListBox } from "./use-add-remove-list-box.hooks";

export interface AddRemoveListBoxAddItemPopupContentProps {
  readonly close: VoidFunction;
}

export interface AddRemoveListBoxHeaderContentProps {
  readonly onAddInputInput: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

export interface AddRemoveListBoxProps extends StackProps {
  readonly items?: readonly string[];

  readonly renderHeaderContent?: (
    props: AddRemoveListBoxHeaderContentProps,
  ) => ReactNode;

  readonly renderAddItemPopupContent?: (
    params: AddRemoveListBoxAddItemPopupContentProps,
  ) => ReactNode;

  readonly onAddItem?: (value: string) => void;
  readonly onDeleteItem?: (value: string) => void;
  readonly onEditItem?: (oldValue: string, newValue: string) => void;
}

export function AddRemoveListBox(props: AddRemoveListBoxProps) {
  const {
    addInputValue,
    addButtonRef,
    isAddButtonEnabled,
    isAddItemPopupOpen,
    handleAddInputInput,
    handleAddButtonClick,
    handleAddItemPopupClose,
  } = useAddRemoveListBox(props);

  const {
    items,

    renderHeaderContent,
    renderAddItemPopupContent,

    onAddItem,
    onDeleteItem,
    onEditItem,
    ...restProps
  } = props;

  return (
    <Stack spacing={0.5} overflow="scroll" height="100%" {...restProps}>
      <Stack spacing={0.5} direction="row" justifyContent="space-evenly">
        {props.renderHeaderContent ? (
          <Styled.HeaderContainer>
            {props.renderHeaderContent({
              onAddInputInput: handleAddInputInput,
            })}
          </Styled.HeaderContainer>
        ) : (
          <TextBox value={addInputValue} onInput={handleAddInputInput} />
        )}

        <Button
          size="small"
          disabled={!isAddButtonEnabled}
          ref={addButtonRef}
          onClick={handleAddButtonClick}
        >
          Add
        </Button>

        {props.renderAddItemPopupContent && (
          <Popover
            isOpen={isAddItemPopupOpen}
            anchorElement={addButtonRef.current}
          >
            {props.renderAddItemPopupContent({
              close: handleAddItemPopupClose,
            })}
          </Popover>
        )}
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
