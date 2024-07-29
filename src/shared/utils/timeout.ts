export async function timeout(ms?: number) {
  return new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, ms);
  });
}

export async function timeoutCall<T>(
  callback: () => T,
  ms?: number,
): Promise<T> {
  return new Promise<T>((res) => {
    setTimeout(() => {
      const returnVal = callback();
      res(returnVal);
    }, ms);
  });
}
