import { ProjectView } from "testmatic";

import { ResultError, ResultOkWithData } from "../result";

export type GetProjectFn = () => Promise<
  ResultOkWithData<ProjectView> | ResultError
>;
