import { HTMLProps } from "react";

import { Icon, IconName } from "../icon";
import { Stack } from "../layout";
import { Link } from "../link";
import { Text } from "../text";

export interface ItemProps extends HTMLProps<HTMLDivElement> {
  readonly icon?: IconName;
  readonly title: string;
  readonly linkHref?: string;
}

export function Item(props: ItemProps) {
  const { icon, title, linkHref, ...restProps } = props;

  return (
    <Stack
      direction="row"
      paddingX={0.25}
      spacing={1}
      alignItems="center"
      {...restProps}
    >
      {props.icon && <Icon icon={props.icon} />}

      {props.linkHref ? (
        <Link to={props.linkHref}>{props.title}</Link>
      ) : (
        <Text>{props.title}</Text>
      )}
    </Stack>
  );
}
