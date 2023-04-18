export function convertKeys(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(convertKeys);
  }
  if (typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const camelKey = key.replace(/_\w/g, (m) => m[1].toUpperCase());
      acc[camelKey] = convertKeys(value);
      return acc;
    }, {} as any); // Use the `as any` assertion here
  }
  return obj;
}
