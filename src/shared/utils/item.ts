import { Tag, Test, isTest } from "testmatic";

export function itemId(item: Test | Tag) {
  const type = isTest(item) ? "test" : "tag";
  return `${type}_${item.name}`;
}
