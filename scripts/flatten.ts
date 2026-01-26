export function flattenToRecord(input: unknown, prefix = ""): Record<string, string> {
  const out: Record<string, string> = {};

  const walk = (value: unknown, path: string) => {
    if (value == null) return;

    if (typeof value === "string") {
      out[path] = value;
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((v, i) => walk(v, path ? `${path}.${i}` : String(i)));
      return;
    }

    if (typeof value === "object") {
      for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
        const next = path ? `${path}.${k}` : k;
        walk(v, next);
      }
    }
  };

  walk(input, prefix);
  return out;
}