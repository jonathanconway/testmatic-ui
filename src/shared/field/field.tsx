import { Stack } from "../layout";
import { Label } from "../text";
import { ValidationError } from "../validation";
import { ReactNode } from "react";

interface FieldProps {
  readonly labelText: string;
  readonly input?: ReactNode;
  readonly validationErrorMessage?: string;
}

export function Field(props: FieldProps) {
  return (
    <Stack spacing={1}>
      <Label>{props.labelText}</Label>

      {props.input}

      {props.validationErrorMessage && (
        <ValidationError message={props.validationErrorMessage} />
      )}
    </Stack>
  );
}
