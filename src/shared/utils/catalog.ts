export function idsFromUrls(urls: string[] = []) {
  return [...new Set(
    urls
      .map((url) => Number(url.split("/").pop()))
      .filter((id) => Number.isFinite(id) && id > 0)
  )];
}

export function parseIdList(value?: string | string[]) {
  const raw = Array.isArray(value) ? value.join(",") : value ?? "";
  return [...new Set(
    raw
      .split(",")
      .map((part) => Number(part.trim()))
      .filter((id) => Number.isFinite(id) && id > 0)
  )];
}

export function toIdQuery(ids: Array<number | undefined>) {
  return ids.filter((id): id is number => typeof id === "number").join(",");
}

export function chunk<T>(items: T[], size = 20) {
  const groups: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    groups.push(items.slice(index, index + size));
  }
  return groups;
}

export function seasonFromCode(code: string) {
  const match = code.match(/S(\d+)/i);
  return match ? Number(match[1]) : 0;
}

export function groupBySeason<T extends { episode: string }>(episodes: T[]) {
  const groups = new Map<number, T[]>();

  episodes.forEach((item) => {
    const season = seasonFromCode(item.episode);
    const current = groups.get(season) ?? [];
    current.push(item);
    groups.set(season, current);
  });

  return [...groups.entries()].sort((a, b) => a[0] - b[0]);
}

export type CapsuleQuery = {
  c: number[];
  e: number[];
  l: number[];
};

export function parseCapsule(query: {
  c?: string | string[];
  e?: string | string[];
  l?: string | string[];
}): CapsuleQuery {
  return {
    c: parseIdList(query.c),
    e: parseIdList(query.e),
    l: parseIdList(query.l),
  };
}

export function serializeCapsule(capsule: CapsuleQuery) {
  const query: Record<string, string> = {};
  if (capsule.c.length) query.c = capsule.c.join(",");
  if (capsule.e.length) query.e = capsule.e.join(",");
  if (capsule.l.length) query.l = capsule.l.join(",");
  return query;
}

export function sharedEpisodeIds(left: string[] = [], right: string[] = []) {
  const rightIds = new Set(idsFromUrls(right));
  return idsFromUrls(left).filter((id) => rightIds.has(id));
}
