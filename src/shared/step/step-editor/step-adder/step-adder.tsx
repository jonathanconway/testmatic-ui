import { HTMLProps, KeyboardEvent, LegacyRef, forwardRef } from "react";

import { Box } from "../../../box";
import { Stack } from "../../../layout";

import * as Styled from "./step-adder.styles";

export interface StepAdderProps extends HTMLProps<HTMLTextAreaElement> {
  readonly onGoPrevious: VoidFunction;
}

export const StepAdderIds = {
  Input: "step-adder-input",
};

export const StepAdder = forwardRef(
  (props: StepAdderProps, ref?: LegacyRef<HTMLTextAreaElement>) => {
    const { onGoPrevious, ...restProps } = props;

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
      switch (event.key) {
        case "ArrowUp":
          handleKeyDownArrowUp();
          break;
      }
    };

    const handleKeyDownArrowUp = () => {
      props.onGoPrevious();
    };

    return (
      <Stack direction="row" width="100%" gap="0.5rem" margin="1px">
        <Styled.TextArea
          id={StepAdderIds.Input}
          placeholder="Add new step"
          ref={ref}
          onKeyDown={handleKeyDown}
          rows={1}
          {...restProps}
        />
        <Box width="1rem">{/* Spacer for action button */}</Box>
      </Stack>
    );
  },
);
