import { Text, TextProps } from "./text";

export function Error(props: Omit<TextProps, "type">) {
  return <Text type="error" {...props} />;
}
