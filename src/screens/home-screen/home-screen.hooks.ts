import { useGetProject } from "../../shared/project";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tag, Test } from "testmatic";

export function useHomeScreen() {
  const { itemId: selectedItemId = undefined } = useParams();
  const navigate = useNavigate();

  const { data: project } = useGetProject();

  const selectedItem = useMemo(() => {
    if (!project || !selectedItemId) {
      return;
    }

    switch (true) {
      case selectedItemId.startsWith("test"):
        if (selectedItemId === "test_new") {
          return {
            name: "test_new",
            type: "test",
            title: "New test",
            links: [],
            steps: [{ text: "First step", tags: [] }],
            tags: [],
            runs: [],
          } as Test;
        }
        return project.testsByName[selectedItemId.replace("test_", "")];
      case selectedItemId.startsWith("tag"):
        if (selectedItemId === "tag_new") {
          return {
            name: "tag_new",
            type: "tag",
            title: "New tag",
            links: [],
          } as Tag;
        }
        return project.tagsByName[selectedItemId.replace("tag_", "")];
    }
  }, [project, selectedItemId]);

  const onClickTestAdd = () => {
    navigate("/test_new");
  };

  const onClickTagAdd = () => {
    navigate("/tag_new");
  };

  const onCloseClick = () => {
    navigate("/");
  };

  return {
    project,
    selectedItemId,
    selectedItem,
    onClickTestAdd,
    onClickTagAdd,
    onCloseClick,
  };
}
