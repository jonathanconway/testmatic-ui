import { ICON_SYMBOLS } from "../../icon";
import { IconButton } from "../../icon-button";
import { Stack } from "../../layout";
import { Tooltip } from "../../tooltip";
import { Box as MUIBox } from "@mui/material";
import { HTMLProps } from "react";

export interface ListBoxItemProps extends HTMLProps<HTMLDivElement> {
  readonly value: string;

  readonly onEditClick?: VoidFunction;
  readonly onDeleteClick?: VoidFunction;
}

export function ListBoxItem(props: ListBoxItemProps) {
  return (
    <Stack direction="row" padding="0.125rem">
      <MUIBox flex={1}>{props.children}</MUIBox>

      <Stack direction="row" spacing="0.25rem">
        <Tooltip contents="Edit">
          <IconButton icon="edit" size="small" onClick={props.onEditClick}>
            {ICON_SYMBOLS.edit}
          </IconButton>
        </Tooltip>
        <Tooltip contents="Delete">
          <IconButton icon="delete" size="small" onClick={props.onDeleteClick}>
            {ICON_SYMBOLS.delete}
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
