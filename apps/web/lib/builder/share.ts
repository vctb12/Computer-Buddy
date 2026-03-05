export const encodeBuild = (obj: Record<string, string>) => encodeURIComponent(JSON.stringify(obj));
export const decodeBuild = (raw: string | null) => {
  if (!raw) return {} as Record<string, string>;
  try { return JSON.parse(decodeURIComponent(raw)) as Record<string, string>; } catch { return {}; }
};
