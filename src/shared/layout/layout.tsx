import { Stack, StackProps } from "./stack";

export type LayoutProps = {
  readonly type: "stack";
} & StackProps;

export function Layout(props: LayoutProps) {
  return <Stack {...props} />;
}
