import { Button } from "../../../../button";
import { Field } from "../../../../field";
import { PopoverWindow } from "../../../../popover";
import { Props } from "../../../../utils";

import { useImportPopover } from "./use-import-popover.hook";

export function ImportPopover(props: Props<typeof PopoverWindow>) {
  const { fileInputError, handleFileInputChange } = useImportPopover(props);

  return (
    <PopoverWindow
      title="Import project"
      actions={<Button default>Import</Button>}
      width="20rem"
      {...props}
    >
      <Field
        labelText="Select project file to import (*.json)"
        input={
          <input
            type="file"
            accept="json/plain"
            onChange={handleFileInputChange}
          />
        }
        validationErrorMessage={fileInputError}
      />
    </PopoverWindow>
  );
}
