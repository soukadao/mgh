export function handleTimeout<T>(
  request: Promise<T>,
  ms = 10000,
  controller?: AbortController,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      controller?.abort();
      reject(new Error(`Operation timed out after ${ms}ms`));
    }, ms);

    request.then(resolve, reject).finally(() => clearTimeout(timer));
  });
}
