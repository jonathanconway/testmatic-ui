import { Header, HeaderProps } from "./header";
import { Stack, StackProps } from "./stack";

export type LayoutProps =
  | ({
      readonly type: "stack";
    } & StackProps)
  | ({
      readonly type: "header";
    } & HeaderProps);

export function Layout({ type, ...restProps }: LayoutProps) {
  switch (type) {
    case "header":
      return <Header {...restProps} />;
    case "stack":
      return <Stack {...restProps} />;
  }
}
