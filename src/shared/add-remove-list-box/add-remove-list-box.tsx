import { Button } from "../button";
import { Stack, StackProps } from "../layout";
import { ListBox, ListBoxItem } from "../list-box";
import { Popover } from "../popover";
import { TextBox } from "../text-box";
import * as Styled from "./add-remove-list-box.styles";
import { AddRemoveListBoxAddItemPopupContentProps } from "./add-remove-list-box.types";
import { useAddRemoveListBox } from "./use-add-remove-list-box.hooks";
import { ReactNode } from "react";

export interface AddRemoveListBoxProps extends StackProps {
  readonly items?: readonly string[];

  readonly headerContent?: ReactNode;

  readonly renderAddItemPopupContent?: (
    params: AddRemoveListBoxAddItemPopupContentProps
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
    isInlineAddInputRendered,
    isAddItemPopupOpen,
    handleAddInputInput,
    handleAddButtonClick,
    handleAddItemPopupClose,
  } = useAddRemoveListBox(props);

  const {
    items,
    headerContent,

    renderAddItemPopupContent,

    onAddItem,
    onDeleteItem,
    onEditItem,
    ...restProps
  } = props;

  return (
    <Stack spacing={0.5} overflow="scroll" height="100%" {...restProps}>
      <Stack spacing={0.5} direction="row" justifyContent="space-evenly">
        {isInlineAddInputRendered ? (
          <TextBox value={addInputValue} onInput={handleAddInputInput} />
        ) : (
          <Styled.HeaderContainer>{props.headerContent}</Styled.HeaderContainer>
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
