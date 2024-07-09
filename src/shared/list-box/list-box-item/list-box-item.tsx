import { HTMLProps } from "react";

import { Box } from "../../box";
import { ICON_SYMBOLS } from "../../icon";
import { IconButton } from "../../icon-button";
import { Stack } from "../../layout";
import { Tooltip } from "../../tooltip";

export interface ListBoxItemProps extends HTMLProps<HTMLDivElement> {
  readonly value: string;

  readonly onEditClick?: VoidFunction;
  readonly onDeleteClick?: VoidFunction;
}

export function ListBoxItem(props: ListBoxItemProps) {
  return (
    <Stack direction="row" padding="0.125rem">
      <Box flex={1} alignItems="center">
        {props.children}
      </Box>

      <Stack direction="row" spacing="0.25rem" alignItems="center">
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
