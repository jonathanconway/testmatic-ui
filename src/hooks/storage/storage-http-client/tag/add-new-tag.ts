import { Tag } from "testmatic";

import { AddNewTagFn } from "../../../entities";
import { responseToResult } from "../../../response";

import { tagPost } from "./tag-post.http";

export const addNewTag: AddNewTagFn = async (newTag: Tag) => {
  const response = await tagPost({
    title: newTag.title,
    description: newTag.description,
    // todo : fix
    links: newTag.links.map((l) => l.href),
    tagType: newTag.type,
  });

  return responseToResult(response);
};
