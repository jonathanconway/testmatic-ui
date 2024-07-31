import { Step, Tag } from "testmatic";

export interface StepFragmentBase {
  readonly value: string;
}

export interface StepFragmentText extends StepFragmentBase {
  readonly type: "text";
}

export interface StepFragmentTag extends StepFragmentBase {
  readonly type: "tag";
  readonly tag: Tag;
}

export type StepFragment = StepFragmentText | StepFragmentTag;

// todo : fix to allow for trailing (, ).
export function parseStepFragments(step?: Step): readonly StepFragment[] {
  if (!step) {
    return [];
  }

  const tagsByTitle = Object.fromEntries(
    step.tags.map((tag) => [tag.title.toLowerCase().trim(), tag]),
  );

  const tokens = step.text.split("(").flatMap((item) => item.split(")"));

  const fragments = tokens.map((value) =>
    tagsByTitle[value]
      ? { type: "tag", value, tag: tagsByTitle[value] }
      : { type: "text", value },
  ) as readonly StepFragment[];

  return fragments;
}
