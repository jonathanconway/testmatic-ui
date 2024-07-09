import { Project, createProjectView } from "testmatic";

import { queryClient } from "../../../../query-client";
import { Maybe } from "../../../../shared";
import {
  USE_GET_PROJECT_QUERY_KEY,
  getProject as getProjectHttp,
} from "../../../../shared/project/project-http/use-get-project.hook";
import { GetProjectFn } from "../../../project";
import { resultOkWithData } from "../../../result";

export const getProject: GetProjectFn = async () => {
  const cachedProject = queryClient.getQueryData(
    USE_GET_PROJECT_QUERY_KEY,
  ) as Maybe<Project>;
  if (cachedProject) {
    // todo: project view should be cached
    return resultOkWithData(createProjectView(cachedProject));
  }

  const fetchedProject = await getProjectHttp();
  queryClient.setQueryData(USE_GET_PROJECT_QUERY_KEY, fetchedProject);
  return resultOkWithData(fetchedProject);
};
