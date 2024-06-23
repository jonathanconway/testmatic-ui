import { HTMLProps, Props } from "../../utils";
import { Stack as MUIStack } from "@mui/material";
import { forwardRef } from "react";

type MUIStackProps = Props<typeof MUIStack>;

export type StackProps = HTMLProps<HTMLDivElement> & MUIStackProps;

export const Stack = forwardRef((props: StackProps, ref) => {
  return <MUIStack {...props} ref={ref as any} />;
});
