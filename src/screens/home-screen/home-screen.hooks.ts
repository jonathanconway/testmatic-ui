import { useGetProject } from "../../shared/project";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

export function useHomeScreen() {
  const { itemId: selectedItemId = undefined } = useParams();

  const { data: project } = useGetProject();

  const selectedItem = useMemo(() => {
    if (!project || !selectedItemId) {
      return;
    }

    switch (true) {
      case selectedItemId.startsWith("test"):
        return project.testsByName[selectedItemId.replace("test_", "")];
      case selectedItemId.startsWith("tag"):
        return project.tagsByName[selectedItemId.replace("tag_", "")];
    }
  }, [project, selectedItemId]);

  return {
    project,
    selectedItemId,
    selectedItem,
  };
}
