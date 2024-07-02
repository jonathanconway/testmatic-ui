import { noop } from "lodash";
import { useEffect, useState } from "react";
import {
  ProjectView,
  convertProjectJSONToProject,
  convertProjectToProjectJSON,
} from "testmatic";

import { emptyProjectView } from "../empty-project";

interface UseProjectLocalStorageParams {
  readonly enabled: boolean;
}

interface UseProjectLocalStorageState {
  readonly project?: ProjectView;
}

const LOCAL_STORAGE_KEY = "testmatic_project";

export function useProjectLocalStorage(params: UseProjectLocalStorageParams) {
  const [state, setState] = useState<UseProjectLocalStorageState>({});

  useEffect(() => {
    if (!params.enabled) {
      return;
    }

    const projectLocalStorageValue =
      localStorage.getItem(LOCAL_STORAGE_KEY)?.toString() ??
      JSON.stringify(convertProjectToProjectJSON(emptyProjectView));

    const projectLocalStorageJSON = JSON.parse(projectLocalStorageValue);

    const project = convertProjectJSONToProject(projectLocalStorageJSON);

    setState({ project });
  }, [params.enabled]);

  const project: ProjectView = state.project ?? emptyProjectView;

  function saveProject(project: ProjectView) {
    setState({ project });
    const projectJSON = convertProjectToProjectJSON(project);
    const projectJSONValue = JSON.stringify(projectJSON);
    localStorage.setItem(LOCAL_STORAGE_KEY, projectJSONValue);
  }

  const refetch = noop;

  return {
    project,
    saveProject,
    refetch,
  };
}
