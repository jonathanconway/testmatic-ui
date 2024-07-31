import { Item, ItemProps } from "../../item";

import * as Styled from "./menu-item.styles";

export interface MenuItemProps extends ItemProps {
  readonly key?: string;
  readonly isHighlighted?: boolean;
}

export function MenuItem(props: MenuItemProps) {
  const { icon, title, linkHref, isHighlighted, ...restProps } = props;

  return (
    <Styled.MenuItem
      $isHighlighted={Boolean(props.isHighlighted)}
      {...restProps}
    >
      <Item title={props.title} linkHref={props.linkHref} icon={props.icon} />
    </Styled.MenuItem>
  );
}
