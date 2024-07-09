import { isSurge } from "../../env";

import { useProjectHttp } from "./project-http";
import { useProjectLocalStorage } from "./project-local-storage";
import { UseProjectResult } from "./use-project.types";

export function useProject(): UseProjectResult {
  const projectLocalStorage = useProjectLocalStorage({ enabled: isSurge });

  const projectHttp = useProjectHttp({ enabled: !isSurge });

  return isSurge ? projectLocalStorage : projectHttp;
}
