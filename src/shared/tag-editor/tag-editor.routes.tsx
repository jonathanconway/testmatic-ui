import { RouteObject } from "react-router-dom";
import { Tag, createTag } from "testmatic";

import { TagEditor } from "./tag-editor";

export const TAG_EDITOR_ROUTE: RouteObject = {
  path: "/tag/:tagName?",
  element: <TagEditor />,
};

export function tagEditorRoute(tagName: string) {
  return `/tag/${tagName}`;
}

export const TAG_NEW_NAME = "new_tag";

export const TAG_NEW = createTag({
  title: "New tag",
}) as Tag;

export function tagEditorNewTagRoute() {
  return tagEditorRoute(TAG_NEW_NAME);
}

export interface TagEditorRouteParams extends Record<string, string> {
  readonly tagName: string;
}
