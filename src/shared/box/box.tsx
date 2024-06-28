import { Props } from "../utils";
import { Box as MUIBox } from "@mui/material";

export interface BoxProps extends Props<typeof MUIBox> {}

export function Box(props: BoxProps) {
  return <MUIBox {...props} />;
}
