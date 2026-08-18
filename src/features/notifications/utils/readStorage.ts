const STORAGE_PREFIX = "vendri.notifications.read";

function storageKey(userId: string, companyId: string) {
  return `${STORAGE_PREFIX}:${companyId}:${userId}`;
}

export function loadReadNotificationIds(
  userId: string,
  companyId: string,
): Set<string> {
  try {
    const raw = localStorage.getItem(storageKey(userId, companyId));
    if (!raw) {
      return new Set();
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return new Set();
    }
    return new Set(parsed.filter((id): id is string => typeof id === "string"));
  } catch {
    return new Set();
  }
}

export function saveReadNotificationIds(
  userId: string,
  companyId: string,
  ids: Set<string>,
) {
  localStorage.setItem(
    storageKey(userId, companyId),
    JSON.stringify([...ids]),
  );
}
