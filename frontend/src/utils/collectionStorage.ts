/**
 * Небольшие функции для временного хранения коллекций в localStorage.
 * После подключения Backend чтение и запись будут заменены API-сервисами.
 */

export function readCollection<T>(storageKey: string): T[] {
  try {
    const rawValue = window.localStorage.getItem(storageKey);

    if (!rawValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(rawValue);

    return Array.isArray(parsedValue) ? (parsedValue as T[]) : [];
  } catch {
    return [];
  }
}

export function writeCollection<T>(storageKey: string, items: T[]): void {
  window.localStorage.setItem(storageKey, JSON.stringify(items));
}

export function createLocalId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
