import { useParams } from "react-router-dom";

import { TagEditorRouteParams } from "../../shared";
import { useProject } from "../project";
import { getStorageFns } from "../storage";

export function useTag() {
  const { tagName = "" } = useParams<TagEditorRouteParams>();

  const { project } = useProject();

  const tag = tagName ? project.tagsByName[tagName] : undefined;

  const storageFns = getStorageFns();

  const updateDescription = (newDescription: string) =>
    storageFns.updateTagDescription(tagName, newDescription);

  return {
    test: tag,

    updateDescription,
  };
}
