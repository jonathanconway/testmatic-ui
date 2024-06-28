import { Box } from "../../box";
import { Stack } from "../stack";
import { HTMLProps, ReactNode } from "react";

export type HeaderProps = HTMLProps<HTMLDivElement> & {
  readonly headingSlot?: ReactNode;
  readonly actionsSlot?: ReactNode;
};

export function Header(props: HeaderProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Box flex={1} overflow="hidden">
        {props.headingSlot}
      </Box>
      <div>{props.actionsSlot}</div>
    </Stack>
  );
}
