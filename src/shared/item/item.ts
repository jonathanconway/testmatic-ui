import { ReactNode } from "react";

export interface Item<T> {
  readonly value: T;
  readonly label?: string | ReactNode;
}
