const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

let csrfToken = null;

export async function getCsrfToken() {
  const response = await fetch(
    `${API_URL}/auth/csrf`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Unable to initialize security session."
    );
  }

  csrfToken =
    data.csrfToken;

  return csrfToken;
}

async function ensureCsrfToken() {
  if (!csrfToken) {
    await getCsrfToken();
  }

  return csrfToken;
}

export async function apiRequest(
  endpoint,
  options = {}
) {
  const method =
    options.method?.toUpperCase() ||
    "GET";

  const stateChangingMethods = [
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
  ];

  const headers = new Headers(
    options.headers
  );

  if (
    options.body &&
    !headers.has(
      "Content-Type"
    )
  ) {
    headers.set(
      "Content-Type",
      "application/json"
    );
  }

  if (
    stateChangingMethods.includes(
      method
    )
  ) {
    const token =
      await ensureCsrfToken();

    headers.set(
      "X-CSRF-Token",
      token
    );
  }

  const response =
    await fetch(
      `${API_URL}${endpoint}`,
      {
        ...options,
        headers,
        credentials: "include",
      }
    );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Something went wrong."
    );
  }

  return data;
}