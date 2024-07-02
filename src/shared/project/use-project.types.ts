import { ProjectView } from "testmatic";

export interface UseProjectResult {
  readonly project: ProjectView;
  readonly saveProject: (updatedProject: ProjectView) => void;
  readonly refetch: VoidFunction;
}
