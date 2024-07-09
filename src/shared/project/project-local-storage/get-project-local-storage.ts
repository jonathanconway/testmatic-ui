import {
  convertProjectJSONToProject,
  convertProjectToProjectJSON,
} from "testmatic";

import { emptyProjectView } from "../empty-project";

import { LOCAL_STORAGE_KEY } from "./local-storage-key";

export function getProjectFromLocalStorage() {
  const projectLocalStorageValue =
    localStorage.getItem(LOCAL_STORAGE_KEY)?.toString() ??
    JSON.stringify(convertProjectToProjectJSON(emptyProjectView));

  const projectLocalStorageJSON = JSON.parse(projectLocalStorageValue);

  const project = convertProjectJSONToProject(projectLocalStorageJSON);

  return project;
}
