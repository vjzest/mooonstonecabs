import { QueryClient } from "@tanstack/react-query";

// ⭐ BACKEND BASE URL from Vercel Env
const BASE_URL = import.meta.env.VITE_API_URL;
// Example: https://moonstone-website.onrender.com

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown,
): Promise<Response> {

  // ⭐ Ensure URL always begins with "/"
  const finalUrl = BASE_URL + (url.startsWith("/") ? url : "/" + url);

  const res = await fetch(finalUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn =
  ({ on401 }: { on401: UnauthorizedBehavior }) =>
  async ({ queryKey }) => {

    // ⭐ Create clean path: /api/admin/bookings etc.
    const path = "/" + queryKey.join("/");

    const fullUrl = BASE_URL + path;

    const res = await fetch(fullUrl, {
      credentials: "include",
    });

    if (on401 === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
