import { Button } from "../../../../button";
import { Field } from "../../../../field";
import { PopupWindow } from "../../../../popup";
import { Props } from "../../../../utils";

import { useImportPopup } from "./use-import-popup.hook";

export function ImportPopup(props: Props<typeof PopupWindow>) {
  const { fileInputError, handleFileInputChange } = useImportPopup(props);

  return (
    <PopupWindow
      title="Import project"
      actions={<Button default>Import</Button>}
      width="20rem"
      {...props}
    >
      <Field
        label="Select project file to import (*.json)"
        input={
          <input
            type="file"
            accept="json/plain"
            onChange={handleFileInputChange}
          />
        }
        validationErrorMessage={fileInputError}
      />
    </PopupWindow>
  );
}
