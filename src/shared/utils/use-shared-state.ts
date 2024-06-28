import { queryClient } from "../../query-client";
import { QueryKey } from "@tanstack/react-query";
import { isString } from "lodash";
import { useEffect, useMemo } from "react";

export function useSharedState<T>(
  initial: T,
  queryKeyOrString: QueryKey | string
) {
  const queryKey = isString(queryKeyOrString)
    ? [queryKeyOrString]
    : queryKeyOrString;

  const state = useMemo(() => {
    return queryClient?.getQueryData(queryKey) as T;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryClient]);

  useEffect(() => {
    if (!state) {
      queryClient?.setQueryData(queryKey, initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setState = (valueOrUpdater: T | ((previousValue: T) => T)) => {
    queryClient?.setQueryData(queryKey, valueOrUpdater);
    queryClient.refetchQueries({
      queryKey,
    });
  };

  return {
    state,
    setState,
  };
}
