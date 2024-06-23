import { useQuery } from "@tanstack/react-query";
import { Project, createProjectView } from "testmatic";

async function getProject() {
  const fetchProjectResponse = await fetch("http://localhost:3100/project");
  const fetchProjectJSON = await fetchProjectResponse.json();
  const project = createProjectView(fetchProjectJSON as Project);
  return project;
}

const USE_GET_PROJECT_QUERY_KEY = "project";

export function useGetProject() {
  return useQuery({
    queryKey: [USE_GET_PROJECT_QUERY_KEY],
    queryFn: getProject,
  });
}
