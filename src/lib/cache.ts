type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

const cacheStore: Record<string, CacheEntry<any>> = {};

export function getCachedData<T>(key: string, duration: number): T | null {
  const entry = cacheStore[key];
  if (!entry) return null;

  const isValid = Date.now() - entry.timestamp < duration;
  return isValid ? entry.data : null;
}

export function setCachedData<T>(key: string, data: T) {
  cacheStore[key] = {
    data,
    timestamp: Date.now(),
  };
}