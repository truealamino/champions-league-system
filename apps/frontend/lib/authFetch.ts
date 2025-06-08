export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = localStorage.getItem("token");
  // Garante que headers seja sempre um objeto simples
  const headers: Record<string, string> = {
    ...(init.headers instanceof Headers
      ? Object.fromEntries(init.headers.entries())
      : (init.headers as Record<string, string>) || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const res = await fetch(input, { ...init, headers });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
    return null;
  }

  return res;
}
