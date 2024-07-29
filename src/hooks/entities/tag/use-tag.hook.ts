import { useParams } from "react-router-dom";

import { TagEditorRouteParams } from "../../../shared";
import { useStorage } from "../../storage";
import { useProject } from "../project";

export function useTag() {
  const { tagName = "" } = useParams<TagEditorRouteParams>();

  const { project } = useProject();

  const tag = tagName ? project.tagsByName[tagName] : undefined;

  const { updateTagTitle, updateTagDescription } = useStorage();

  const updateTitle = (newTitle: string) => updateTagTitle(tagName, newTitle);

  const updateDescription = (newDescription: string) =>
    updateTagDescription(tagName, newDescription);

  return {
    tag,

    updateTitle,
    updateDescription,
  };
}
