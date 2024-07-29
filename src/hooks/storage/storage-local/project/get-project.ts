import { getProjectFromLocalStorage } from "../../../../shared";
import { GetProjectFn } from "../../../entities";
import { resultOkWithData } from "../../../result";

export const getProject: GetProjectFn = async () => {
  return resultOkWithData(getProjectFromLocalStorage());
};
