import { ReactNode } from "react";

import { Stack } from "../layout";
import { Label } from "../text";
import { ValidationError } from "../validation";

interface FieldProps {
  readonly label: ReactNode;
  readonly input?: ReactNode;
  readonly validationErrorMessage?: string;
}

export function Field(props: FieldProps) {
  return (
    <Stack spacing={1}>
      <Label>{props.label}</Label>

      {props.input}

      {props.validationErrorMessage && (
        <ValidationError message={props.validationErrorMessage} />
      )}
    </Stack>
  );
}
