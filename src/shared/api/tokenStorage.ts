const ACCESS_TOKEN_KEY = "vendri.accessToken";
const SESSION_USER_KEY = "vendri.sessionUser";

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function getStoredSessionUser<T>(): T | null {
  const raw = localStorage.getItem(SESSION_USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as T;
  } catch {
    localStorage.removeItem(SESSION_USER_KEY);
    return null;
  }
}

export function setStoredSessionUser(user: unknown) {
  localStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
}

export function clearStoredSessionUser() {
  localStorage.removeItem(SESSION_USER_KEY);
}

export function clearSession() {
  clearAccessToken();
  clearStoredSessionUser();
}
