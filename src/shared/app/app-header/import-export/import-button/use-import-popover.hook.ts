import { ChangeEvent, useState } from "react";
import { convertProjectJSONToProject } from "testmatic";

import { useProject } from "../../../../../hooks";
import { showSuccessNotification } from "../../../../notification";

interface UseImportPopoverParams {
  readonly onClose?: VoidFunction;
}

interface UseImportPopoverState {
  readonly fileInputError?: string;
}

export function useImportPopover(params: UseImportPopoverParams) {
  const [state, setState] = useState<UseImportPopoverState>({});

  const { saveProject } = useProject();

  function handleFileInputChange(event: ChangeEvent<HTMLInputElement>) {
    try {
      const input = event.target;

      const reader = new FileReader();

      reader.onload = async function () {
        const input = event.target;

        const reader = new FileReader();
        reader.onload = function () {
          const jsonString = reader?.result?.toString();

          if (!jsonString) {
            return;
          }

          if (!confirmImport()) {
            return;
          }

          importJson(jsonString);
        };

        if (!input.files) {
          return;
        }

        reader.readAsText(input.files[0]);
      };

      if (!input.files) {
        return;
      }

      reader.readAsDataURL(input.files[0]);
    } catch (err) {}
  }

  function confirmImport() {
    return window.confirm(
      "This will overwrite the current project\nAre you sure you want to proceed?",
    );
  }

  function importJson(jsonString: string) {
    try {
      const json = JSON.parse(jsonString);

      const projectView = convertProjectJSONToProject(json);

      saveProject(projectView);

      showSuccessNotification("Project imported successfully");

      params.onClose?.();
    } catch (err) {
      setState({
        fileInputError:
          "Error importing project. Please check that JSON is correctly formatted.",
      });
    }
  }

  const { fileInputError } = state;

  return {
    fileInputError,
    handleFileInputChange,
  };
}
