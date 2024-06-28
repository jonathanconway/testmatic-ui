import { Text, TextProps } from "./text";

export function Label(props: Omit<TextProps, "type">) {
  return <Text type="label" {...props} />;
}
