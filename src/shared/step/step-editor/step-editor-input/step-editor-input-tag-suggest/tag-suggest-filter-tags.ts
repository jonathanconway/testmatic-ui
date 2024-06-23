import { Tag } from "testmatic";

export function filterTags(tags?: readonly Tag[], filterText?: string) {
  if (!filterText) {
    return tags;
  }

  if (!filterText.trim()) {
    return tags;
  }

  filterText = filterText.trim().toLowerCase();

  return tags?.filter((tag) =>
    tag.title.trim().toLowerCase().startsWith(filterText!)
  );
}
