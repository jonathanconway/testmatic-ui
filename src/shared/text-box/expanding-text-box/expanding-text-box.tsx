import { HTMLProps, LegacyRef, forwardRef } from "react";

import * as Styled from "./expanding-text-box.styles";
import { useExpandingTextBox } from "./use-expanding-text-box.hook";

interface ExpandingTextBoxProps extends HTMLProps<HTMLTextAreaElement> {
  readonly outdent?: boolean;
  readonly hoverBorder?: boolean;
}

export const ExpandingTextBox = forwardRef(
  (props: ExpandingTextBoxProps, ref: LegacyRef<HTMLTextAreaElement>) => {
    const { outdent, hoverBorder, ...restProps } = props;

    const { isEmpty, sizerValue, handleInput, handleKeyDown } =
      useExpandingTextBox(props);

    return (
      <Styled.TextAreaContainer $outdent={props.outdent}>
        <Styled.TextArea
          {...restProps}
          ref={ref}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          $isEmpty={isEmpty}
          $hoverBorder={props.hoverBorder}
          $outdent={props.outdent}
        />

        <Styled.Sizer dangerouslySetInnerHTML={{ __html: sizerValue }} />
      </Styled.TextAreaContainer>
    );
  },
);
