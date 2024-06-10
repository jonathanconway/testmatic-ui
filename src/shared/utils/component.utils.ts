import { DetailedHTMLProps, HTMLAttributes } from "react";

export type HTMLProps<
  T,
  A extends HTMLAttributes<T> = HTMLAttributes<T>
> = DetailedHTMLProps<A, T>;
