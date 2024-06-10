/* eslint-disable no-extend-native */
import { sortBy } from "lodash";

declare global {
  interface Array<T> {
    sortBy(this: Array<T>): Array<T>;
  }
}

Array.prototype.sortBy = function <T>(this: Array<T>) {
  return sortBy(this);
};
