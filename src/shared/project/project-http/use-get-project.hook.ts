import { DefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { Project, createProjectView } from "testmatic";

async function getProject() {
  const fetchProjectResponse = await fetch("http://localhost:3100/project");
  const fetchProjectJSON = await fetchProjectResponse.json();
  const project = createProjectView(fetchProjectJSON as Project);
  return project;
}

export const USE_GET_PROJECT_QUERY_KEY = "project";

export function useGetProject(
  options: Partial<DefinedInitialDataOptions<unknown, unknown, unknown>>,
) {
  return useQuery({
    ...options,
    queryKey: [USE_GET_PROJECT_QUERY_KEY],
    queryFn: getProject,
  });
}
