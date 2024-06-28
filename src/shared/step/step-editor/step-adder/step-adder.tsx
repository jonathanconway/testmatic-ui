import * as Styled from "./step-adder.styles";
import { HTMLProps, forwardRef, KeyboardEvent } from "react";

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
      <Styled.TextArea
        placeholder="Add new step"
        value=""
        ref={ref}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
    );
  }
);
