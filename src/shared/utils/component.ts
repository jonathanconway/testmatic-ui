import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

export type Props<T extends FC> = Parameters<T>[0];

export type HTMLProps<
  T,
  A extends HTMLAttributes<T> = HTMLAttributes<T>
> = DetailedHTMLProps<A, T>;
