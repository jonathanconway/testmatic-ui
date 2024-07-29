import { Icon, IconName } from "../icon";
import { Stack } from "../layout";
import { Link } from "../link";
import { Text } from "../text";

interface ItemProps {
  readonly icon?: IconName;
  readonly title: string;
  readonly linkHref?: string;
}

export function Item(props: ItemProps) {
  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      {props.icon && <Icon icon={props.icon} />}
      {props.linkHref ? (
        <Link to={props.linkHref}>{props.title}</Link>
      ) : (
        <Text>{props.title}</Text>
      )}
    </Stack>
  );
}
