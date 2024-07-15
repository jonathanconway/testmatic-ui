import { useQuery } from "@tanstack/react-query";
import { Project, createProjectView } from "testmatic";

export async function getProject() {
  // todo : use configured port number
  const fetchProjectResponse = await fetch("http://localhost:3100/project");
  const fetchProjectJSON = await fetchProjectResponse.json();
  const project = createProjectView(fetchProjectJSON as Project);
  return project;
}

export const USE_GET_PROJECT_QUERY_KEY = ["project"];

interface UseGetProjectParams {
  readonly enabled: boolean;
}

export function useGetProject(params: UseGetProjectParams) {
  return useQuery({
    queryKey: USE_GET_PROJECT_QUERY_KEY,
    queryFn: getProject,
    enabled: params.enabled,
    retry: () => Boolean(params.enabled),
  });
}
