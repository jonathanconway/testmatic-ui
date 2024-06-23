import { HTMLProps } from "../../utils";
import * as Styled from "./step-adder.styles";

export interface StepAdderProps extends HTMLProps<HTMLTextAreaElement> {}

export function StepAdder(props: StepAdderProps) {
  return <Styled.TextArea placeholder="Add new step" value="" {...props} />;
}
