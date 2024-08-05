import {
  Link,
  projectDeleteTestLink,
  throwIfResultWithDataError,
} from "testmatic";

import { useProject } from "../../../hooks";
import { useEditingTest } from "../use-editing-test.hook";

export function useTestLinks() {
  const { project, saveProject } = useProject();

  const { test } = useEditingTest();

  const links = test?.links ?? [];

  function handleDeleteClick(linkToDelete: Link) {
    if (!project || !test) {
      return;
    }

    const lookupTestNameOrTitle = test.name;

    const lookupTestLinkHref = linkToDelete.href;

    const { data: updatedProject } = throwIfResultWithDataError(
      projectDeleteTestLink({
        project,
        lookupTestNameOrTitle,
        lookupTestLinkHref,
      }),
    );

    saveProject(updatedProject);
  }
  return {
    links,

    handleDeleteClick,
  };
}
