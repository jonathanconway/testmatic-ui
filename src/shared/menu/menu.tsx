import { HTMLProps } from "react";

import * as Styled from "./menu.styles";

interface MenuProps extends HTMLProps<HTMLDivElement> {}

export function Menu(props: MenuProps) {
  return <Styled.MenuContainer {...props} />;
}
