import { ICON_SYMBOLS } from "../../icon";
import { IconButton } from "../../icon-button";
import { Stack } from "../../layout";
import { Tooltip } from "../../tooltip";
import { HTMLProps } from "../../utils";
import { Box } from "@mui/material";

export interface ListBoxItemProps extends HTMLProps<HTMLDivElement> {
  readonly value: string;

  readonly onEditClick?: VoidFunction;
  readonly onDeleteClick?: VoidFunction;
}

export function ListBoxItem(props: ListBoxItemProps) {
  return (
    <Stack direction="row" padding="0.125rem">
      <Box flex={1}>{props.children}</Box>

      <Stack direction="row" spacing="0.25rem">
        <Tooltip contents="Edit">
          <IconButton icon="edit" onClick={props.onEditClick}>
            {ICON_SYMBOLS.edit}
          </IconButton>
        </Tooltip>
        <Tooltip contents="Delete">
          <IconButton icon="delete" onClick={props.onDeleteClick}>
            {ICON_SYMBOLS.delete}
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
