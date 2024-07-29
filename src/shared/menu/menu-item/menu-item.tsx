import { ItemProps } from "../../item";

import * as Styled from "./menu-item.styles";

export interface MenuItemProps extends ItemProps {
  readonly key?: string;
}

export function MenuItem(props: MenuItemProps) {
  const { icon, title, linkHref, ...restProps } = props;

  return (
    <Styled.MenuItem
      icon={props.icon}
      title={props.title}
      linkHref={props.linkHref}
      {...restProps}
    >
      {props.title}
    </Styled.MenuItem>
  );
}
