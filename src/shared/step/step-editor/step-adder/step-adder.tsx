import { HTMLProps, KeyboardEvent, forwardRef } from "react";

import { Box } from "../../../box";
import { Stack } from "../../../layout";

import * as Styled from "./step-adder.styles";

export interface StepAdderProps extends HTMLProps<HTMLTextAreaElement> {
  readonly onGoPrevious: VoidFunction;
}

export const StepAdder = forwardRef(
  (props: StepAdderProps, ref?: React.LegacyRef<HTMLTextAreaElement>) => {
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
      <Stack direction="row" width="100%" gap="0.5rem">
        <Styled.TextArea
          placeholder="Add new step"
          value=""
          ref={ref}
          onKeyDown={handleKeyDown}
          {...restProps}
        />
        <Box width="1rem"></Box>
      </Stack>
    );
  },
);
