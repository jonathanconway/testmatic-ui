import { TypeOfConst } from "testmatic";

export const StackOrders = {
  AutoSuggest: 10,
};

export type StackOrder = TypeOfConst<typeof StackOrders>;
