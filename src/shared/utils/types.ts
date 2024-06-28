export type TypeOfConst<Const> = Const[keyof Const];

export type Maybe<T> = T | undefined;

export function isNotNil<T>(item?: T | undefined | null | false): item is T {
  return Boolean(item);
}
