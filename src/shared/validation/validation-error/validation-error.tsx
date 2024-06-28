import { Icon } from "../../icon";
import { Stack } from "../../layout";
import { Error } from "../../text";

interface ValidationErrorProps {
  readonly message?: string;
}

export function ValidationError(props: ValidationErrorProps) {
  return props.message ? (
    <Stack direction="row" alignItems="center">
      <Icon icon="error" color="red" />
      <Error>{props.message}</Error>
    </Stack>
  ) : null;
}
