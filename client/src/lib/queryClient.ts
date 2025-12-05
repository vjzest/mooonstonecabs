import { QueryClient } from "@tanstack/react-query";

// ⭐ Backend base URL (Render backend)
const BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
// Removes trailing "/" so URLs do not break

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

/**
 * ⭐ UNIVERSAL API Request Utility
 * Automatically:
 * - Prepends BASE_URL
 * - Fixes slashes
 * - Sends JSON
 * - Validates HTTP status
 */
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown
): Promise<Response> {
  
  // Safe path creation
  const cleanUrl = url.startsWith("/") ? url : "/" + url;
  const finalUrl = BASE_URL + cleanUrl;

  const res = await fetch(finalUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : undefined,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include", // required for future auth
  });

  await throwIfResNotOk(res);
  return res;
}

/**
 * ⭐ Query Function Generator for react-query
 * Automatically builds URLs from query keys
 */
type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn =
  ({ on401 }: { on401: UnauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // queryKey example: ["api", "bookings", "list"]
    const path = "/" + queryKey.join("/");

    const finalUrl = BASE_URL + path;

    const res = await fetch(finalUrl, {
      credentials: "include",
    });

    if (on401 === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

/**
 * ⭐ QueryClient Setup
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
