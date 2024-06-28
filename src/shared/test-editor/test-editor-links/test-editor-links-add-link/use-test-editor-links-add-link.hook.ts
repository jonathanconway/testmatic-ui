import { AddRemoveListBoxAddItemPopupContentProps } from "../../../add-remove-list-box";
import { useGetProject } from "../../../project/use-get-project.hook";
import { usePostProject } from "../../../project/use-post-project.hook";
import { isNotNil } from "../../../utils";
import { ChangeEvent, useMemo, useState } from "react";
import {
  Test,
  createLink,
  isAlreadyExistsError,
  projectAddTestLink,
} from "testmatic";

type UseTestEditorLinksAddLinkProps =
  AddRemoveListBoxAddItemPopupContentProps & {
    readonly test: Test;
  };

interface UseTestEditorLinksAddLink {
  readonly values: {
    readonly href: string;
    readonly title: string;
  };
  readonly form: {
    readonly wasSubmitAttempted?: boolean;
  };
  readonly fields: {
    readonly href: {
      readonly isDirty: boolean;
    };
  };
}

export function useTestEditorLinksAddLink(
  props: UseTestEditorLinksAddLinkProps
) {
  const [state, setState] = useState<UseTestEditorLinksAddLink>({
    values: {
      href: "",
      title: "",
    },
    form: {
      wasSubmitAttempted: false,
    },
    fields: {
      href: {
        isDirty: false,
      },
    },
  });

  const { values, form, fields } = state;

  const errors = useMemo(() => {
    return {
      href: getHrefError(state),
    };
  }, [state]);

  const hasErrors = Object.values(errors).filter(isNotNil).length > 0;

  function handleHrefInput(event: ChangeEvent<HTMLInputElement>) {
    setState((previousState) => ({
      ...previousState,
      values: { ...previousState.values, href: event.target.value },
      fields: {
        ...previousState.fields,
        href: {
          ...previousState.fields.href,
          isDirty: true,
        },
      },
    }));
  }

  function handleTitleInput(event: ChangeEvent<HTMLInputElement>) {
    setState((previousState) => ({
      ...previousState,
      values: { ...previousState.values, title: event.target.value },
    }));
  }

  const { data: project } = useGetProject();

  const { mutate: postProject } = usePostProject();

  function handleSubmitClick() {
    if (!project) {
      return;
    }

    setState((previousState) => ({
      ...previousState,
      form: {
        wasSubmitAttempted: true,
      },
    }));

    if (hasErrors) {
      return;
    }

    const newLink = createLink({
      href: state.values.href,
      title: state.values.title,
    });

    const { test } = props;

    const updatedProject = projectAddTestLink({
      project,
      newLink,
      test,
    });

    if (isAlreadyExistsError(updatedProject)) {
      return;
    }

    postProject(updatedProject);

    props.close();
  }

  return {
    form,
    values,
    fields,
    errors,
    hasErrors,

    handleHrefInput,
    handleTitleInput,
    handleSubmitClick,
  };
}

function isUrl(input: string) {
  try {
    return Boolean(new URL(input));
  } catch (e) {
    return false;
  }
}

function getHrefError(state: UseTestEditorLinksAddLink) {
  if (state.values.href.trim() === "") {
    return "Href is required.";
  }

  if (!isUrl(state.values.href)) {
    return "Href must be a URL.";
  }

  return undefined;
}
