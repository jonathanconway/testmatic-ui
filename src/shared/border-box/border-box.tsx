import { BoxProps } from "../box";
import * as Styled from "./border-box.styles";

export interface BorderBoxProps extends BoxProps {}

export function BorderBox(props: BorderBoxProps) {
  return <Styled.BorderBox {...props} />;
}
