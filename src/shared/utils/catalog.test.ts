import { describe, expect, it } from "vitest";
import {
  chunk,
  groupBySeason,
  idsFromUrls,
  parseCapsule,
  parseIdList,
  serializeCapsule,
  sharedEpisodeIds,
} from "./catalog";

describe("idsFromUrls", () => {
  it("extracts unique numeric ids", () => {
    expect(
      idsFromUrls([
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2",
        "https://rickandmortyapi.com/api/episode/1",
      ])
    ).toEqual([1, 2]);
  });
});

describe("parseIdList", () => {
  it("parses comma lists and ignores junk", () => {
    expect(parseIdList("1, 2, x, 2")).toEqual([1, 2]);
  });
});

describe("capsule", () => {
  it("round-trips favorite ids", () => {
    const capsule = parseCapsule({ c: "1,2", e: "3", l: "" });
    expect(capsule).toEqual({ c: [1, 2], e: [3], l: [] });
    expect(serializeCapsule(capsule)).toEqual({ c: "1,2", e: "3" });
  });
});

describe("groupBySeason", () => {
  it("groups SxxExx codes", () => {
    const groups = groupBySeason([
      { episode: "S02E01" },
      { episode: "S01E02" },
      { episode: "S01E01" },
    ]);
    expect(groups.map(([season, items]) => [season, items.map((item) => item.episode)])).toEqual([
      [1, ["S01E02", "S01E01"]],
      [2, ["S02E01"]],
    ]);
  });
});

describe("sharedEpisodeIds", () => {
  it("returns intersection", () => {
    expect(
      sharedEpisodeIds(
        ["https://rickandmortyapi.com/api/episode/1", "https://rickandmortyapi.com/api/episode/10"],
        ["https://rickandmortyapi.com/api/episode/10", "https://rickandmortyapi.com/api/episode/3"]
      )
    ).toEqual([10]);
  });
});

describe("chunk", () => {
  it("splits long id lists", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });
});
