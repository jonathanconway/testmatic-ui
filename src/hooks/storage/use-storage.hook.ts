import { getStorageFns } from "./storage-fns";

export function useStorage() {
  const storageFns = getStorageFns();

  return storageFns;
}
