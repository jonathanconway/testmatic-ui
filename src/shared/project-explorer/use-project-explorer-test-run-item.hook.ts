import { Run } from "testmatic";

export function useProjectExplorerTestRunItem() {
  const handleDeleteRunClick = (run: Run) => () => {};

  return {
    handleDeleteRunClick,
  };
}
