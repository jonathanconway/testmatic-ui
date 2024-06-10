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

export function stepFragments(step: Step): readonly StepFragment[] {
  const tagsByName = Object.fromEntries(
    step.tags.map((tag) => [tag.title.toLowerCase().trim(), tag])
  );

  const tokens = step.text.split("(").flatMap((item) => item.split(")"));

  const fragments = tokens.map((value) =>
    tagsByName[value.toLowerCase().trim()]
      ? { type: "tag", value, tag: tagsByName[value] }
      : { type: "text", value }
  ) as readonly StepFragment[];

  return fragments;
}
