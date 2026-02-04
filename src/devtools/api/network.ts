import { fetch } from "@tauri-apps/plugin-http";
import { notifyAsyncOperationStatus } from "./indicators";

/**
 *Perform an HTTP request using the default client.

@example
 import { fetch } from '@tauri-apps/plugin-http';
    const response = await fetch('http://localhost:3003/users/2', {
    method: 'GET',
    });
 */
const powerfulFetch = async <T>(
  url: string,
  options?: RequestInit
): Promise<Response> => {
  notifyAsyncOperationStatus({
    title: "Fetching data",
    description: url,
    status: "IN_PROGRESS",
  });
  const response = await fetch(url, options).catch((error: unknown) => {
    notifyAsyncOperationStatus({
      title: "Failed to fetch data",
      description: url,
      status: "ERROR",
    });
    throw error;
  });
  notifyAsyncOperationStatus({
    title: "Successfully fetched data",
    description: url,
    status: "SUCCESS",
  });
  return response;
};
export {
  powerfulFetch,
};
