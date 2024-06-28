import { FC } from "react";

export type Props<T extends FC> = Parameters<T>[0];
