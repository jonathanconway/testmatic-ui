import { ProjectView, convertProjectToProjectJSON } from "testmatic";

import { LOCAL_STORAGE_KEY } from "./local-storage-key";
import { RefreshProjectLocalStorageEvent } from "./refresh-project-local-storage-event";

export function saveProjectLocalStorage(project: ProjectView) {
  const projectJSON = convertProjectToProjectJSON(project);
  const projectJSONValue = JSON.stringify(projectJSON);

  localStorage.setItem(LOCAL_STORAGE_KEY, projectJSONValue);

  window.dispatchEvent(new RefreshProjectLocalStorageEvent());
}
