interface AuthFetchOptions extends RequestInit {
  url: string;
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  signal?: AbortSignal | null;
}

export const authFetch = ({
  url,
  method = "GET",
  headers,
  body,
  ...rest
}: AuthFetchOptions) => {
  const fetchOptions: RequestInit = {
    method,
    credentials: "include",
    headers: {
      ...headers,
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    ...(method !== "GET" && body ? { body } : {}),
    ...rest,
  };

  return fetch(url, fetchOptions);
};
