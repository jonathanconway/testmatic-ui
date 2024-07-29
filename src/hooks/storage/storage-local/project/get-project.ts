import { getProjectFromLocalStorage } from "../../../../shared";
import { GetProjectFn } from "../../../project";
import { resultOkWithData } from "../../../result";

export const getProject: GetProjectFn = async () => {
  return resultOkWithData(getProjectFromLocalStorage());
};
