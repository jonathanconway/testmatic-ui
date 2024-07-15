import { AddRemoveListBoxAddItemPopupContentProps } from "../../../add-remove-list-box";
import { Button } from "../../../button";
import { Stack } from "../../../layout";
import { PopoverWindow } from "../../../popover";
import { Label } from "../../../text";
import { TextBox } from "../../../text-box";
import { RequiredChip, ValidationError } from "../../../validation";

import { useTestEditorLinksAddLink } from "./use-test-editor-links-add-link.hook";

type LinksBoxAddLinkProps = AddRemoveListBoxAddItemPopupContentProps;

export function LinksBoxAddLink(props: LinksBoxAddLinkProps) {
  const {
    values,
    form,
    fields,
    errors,

    handleHrefInput,
    handleTitleInput,
    handleSubmitClick,
  } = useTestEditorLinksAddLink(props);

  return (
    <PopoverWindow
      title="Add link"
      style={{ width: "250px" }}
      onClose={props.close}
    >
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Stack spacing={0.5}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Label>URL</Label>
              <RequiredChip />
            </Stack>
            <TextBox
              autoFocus
              value={values.href}
              hasError={
                (form.wasSubmitAttempted || fields.href.isDirty) &&
                Boolean(errors.href)
              }
              onChange={handleHrefInput}
            />
            {(form.wasSubmitAttempted || fields.href.isDirty) &&
              errors.href && <ValidationError message={errors.href} />}
          </Stack>

          <Stack spacing={0.5}>
            <Label>Title</Label>
            <TextBox value={values.title} onChange={handleTitleInput} />
          </Stack>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <div></div>
          <Button onClick={handleSubmitClick}>Save</Button>
        </Stack>
      </Stack>
    </PopoverWindow>
  );
}
