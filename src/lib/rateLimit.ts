export function handleRateLimit(status: number) {
  if (status === 429) {
    return {
      isRateLimited: true,
      retryAfter: 60, // seconds
    };
  }

  return {
    isRateLimited: false,
    retryAfter: 0,
  };
}