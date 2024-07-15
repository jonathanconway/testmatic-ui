import { noop } from "lodash";
import { useEffect, useState } from "react";
import { ProjectView } from "testmatic";

import { emptyProjectView } from "../empty-project";

import { getProjectFromLocalStorage } from "./get-project-local-storage";
import { RefreshProjectLocalStorageEvent } from "./refresh-project-local-storage-event";
import { saveProjectToLocalStorage } from "./save-project-local-storage";

interface UseProjectLocalStorageParams {
  readonly enabled: boolean;
}

interface UseProjectLocalStorageState {
  readonly project?: ProjectView;
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

    saveProjectToLocalStorage(project);
  }

  const refetch = noop;

  return {
    project,
    saveProject,
    refetch,
  };
}
