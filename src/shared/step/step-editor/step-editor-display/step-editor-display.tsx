import { Link } from "react-router-dom";
import { Step } from "testmatic";

import { useProject } from "../../../project";
import { TagTooltipContents } from "../../../tag";
import { Tooltip } from "../../../tooltip";
import { stepFragments } from "../../step-fragments";

import * as Styled from "./step-editor-display.styles";

interface StepEditorDisplayProps {
  readonly step?: Step;

  readonly onClick?: VoidFunction;
}

export function StepEditorDisplay(props: StepEditorDisplayProps) {
  const { project } = useProject();
  // todo: fix full tag lookup issue

  return (
    <Styled.StepDisplay className="display" onClick={props.onClick}>
      {stepFragments(props.step).map((token, index) => {
        switch (token.type) {
          case "text":
            return (
              <Styled.StepTokenText key={`${token.value}_${index}`}>
                {token.value}
              </Styled.StepTokenText>
            );
          case "tag":
            return (
              <Styled.StepTokenTag key={`${token.value}_${index}`}>
                <Tooltip
                  contents={
                    <TagTooltipContents
                      tag={project?.tagsByName[token.tag.name] ?? token.tag}
                    />
                  }
                >
                  <Link to={`/tag_${token.tag.name}`}>({token.value})</Link>
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

export function focusStepEditorDisplayLastLink(container?: HTMLElement | null) {
  const links = Array.from(container?.querySelectorAll("a") ?? []);
  const lastLink = links?.slice(-1)?.[0];
  lastLink?.focus();
}
