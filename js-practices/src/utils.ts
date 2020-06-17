export function track(tag: string) {
  return function trackReturn<T>(data: T): T {
    console.log(`TAG ${tag}: `, data);
    return data;
  };
}
