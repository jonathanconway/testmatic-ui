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

class RefreshProjectLocalStorageEvent extends Event {
  static type = "refreshprojectlocalstorage";
  constructor() {
    super(RefreshProjectLocalStorageEvent.type);
  }
}

function getProjectFromLocalStorage() {
  const projectLocalStorageValue =
    localStorage.getItem(LOCAL_STORAGE_KEY)?.toString() ??
    JSON.stringify(convertProjectToProjectJSON(emptyProjectView));

  const projectLocalStorageJSON = JSON.parse(projectLocalStorageValue);

  const project = convertProjectJSONToProject(projectLocalStorageJSON);

  return project;
}

export function useProjectLocalStorage(params: UseProjectLocalStorageParams) {
  const [state, setState] = useState<UseProjectLocalStorageState>({});

  useEffect(() => {
    if (!params.enabled) {
      return;
    }

    const project = getProjectFromLocalStorage();

    setState({ project });
  }, [params.enabled]);

  useEffect(() => {
    function handleRefreshProjectLocalStorage() {
      const project = getProjectFromLocalStorage();

      setState({ project });
    }

    if (!params.enabled) {
      return;
    }

    window.addEventListener(
      RefreshProjectLocalStorageEvent.type,
      handleRefreshProjectLocalStorage,
    );

    return () => {
      window.removeEventListener(
        RefreshProjectLocalStorageEvent.type,
        handleRefreshProjectLocalStorage,
      );
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const project: ProjectView = state.project ?? emptyProjectView;

  function saveProject(project: ProjectView) {
    setState({ project });

    const projectJSON = convertProjectToProjectJSON(project);
    const projectJSONValue = JSON.stringify(projectJSON);

    localStorage.setItem(LOCAL_STORAGE_KEY, projectJSONValue);

    window.dispatchEvent(new RefreshProjectLocalStorageEvent());
  }

  const refetch = noop;

  return {
    project,
    saveProject,
    refetch,
  };
}
