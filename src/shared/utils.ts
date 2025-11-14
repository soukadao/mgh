import { exec } from "node:child_process";
import { promisify } from "node:util";
import { handleTimeout } from "./lib/handle-timeout.js";

export const execAsync = promisify(exec);

export interface FetcherOptions extends RequestInit {
  timeout?: number;
  parseJSON?: boolean;
}

export async function fetcher<T = unknown>(
  url: string,
  options: FetcherOptions = {},
): Promise<T> {
  const { timeout = 10000, parseJSON = true, ...fetchOptions } = options;

  const controller = new AbortController();
  const signal = fetchOptions.signal || controller.signal;

  try {
    const response = await handleTimeout(
      fetch(url, { ...fetchOptions, signal }),
      timeout,
      controller,
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    if (parseJSON) {
      return await response.json();
    }

    return response as T;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred during fetch");
  }
}
