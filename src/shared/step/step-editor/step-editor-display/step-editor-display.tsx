import { HTMLProps } from "react";
import { Link } from "react-router-dom";
import { Step, Tag, createTagFromName } from "testmatic";

import { useProject } from "../../../../hooks";
import { TagTooltipContents } from "../../../tag";
import { tagEditorRoute } from "../../../tag-editor";
import { Tooltip } from "../../../tooltip";
import { parseStepFragments } from "../../step-fragments";

import * as Styled from "./step-editor-display.styles";

interface StepEditorDisplayProps
  extends Omit<HTMLProps<HTMLDivElement>, "step"> {
  readonly step?: Step;
  readonly isVisible?: boolean;
}

export function StepEditorDisplay(props: StepEditorDisplayProps) {
  const { step, isVisible, ...restProps } = props;

  const { project } = useProject();

  // todo: fix full tag lookup issue

  const stepFragments = parseStepFragments(props.step);

  return (
    <Styled.StepDisplay $isVisible={props.isVisible ?? true} {...restProps}>
      {stepFragments.map((token, index) => {
        switch (token.type) {
          case "text":
            return (
              <Styled.StepTokenText key={`${token.value}_${index}`}>
                {token.value}
              </Styled.StepTokenText>
            );
          case "tag":
            const tag = token.tag?.name
              ? project?.tagsByName[token.tag.name] ?? token.tag
              : (createTagFromName(token.value) as Tag);

            return (
              <Styled.StepTokenTag key={`${token.value}_${index}`}>
                <Tooltip contents={<TagTooltipContents tag={tag} />}>
                  <Link to={tagEditorRoute(tag.name)}>({token.value})</Link>
                </Tooltip>
              </Styled.StepTokenTag>
            );
          default:
            return null;
        }
      })}
    </Styled.StepDisplay>
  );
}
