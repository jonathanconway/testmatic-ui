import { isSurge } from "../../env";
import { useProjectLocalStorage } from "../../shared";
import { useProjectHttp } from "../../shared/project/project-http";
import { useStorage } from "../storage";

export function useProject() {
  const { addNewTest, deleteTest, addNewTag, deleteTag } = useStorage();

  // todo: move these to the hooks folder
  const projectLocalStorage = useProjectLocalStorage({ enabled: isSurge });

  const projectHttp = useProjectHttp({ enabled: !isSurge });

  const { project, saveProject, refetchProject } = isSurge
    ? projectLocalStorage
    : projectHttp;

  return {
    project,
    saveProject,
    refetchProject,

    addNewTest,
    deleteTest,

    addNewTag,
    deleteTag,
  };
}
