import { Icon, IconNames } from "../../icon";
import { Stack } from "../../layout";
import { Error } from "../../text";

interface ValidationErrorProps {
  readonly message?: string;
}

export function ValidationError(props: ValidationErrorProps) {
  return props.message ? (
    <Stack direction="row" alignItems="start" spacing={1}>
      <Icon icon={IconNames.Error} color="red" />
      <Error>{props.message}</Error>
    </Stack>
  ) : null;
}
