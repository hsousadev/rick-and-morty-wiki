import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Seo from "@/shared/components/Seo";
import CharacterCard from "@/shared/components/CharacterCard";
import EmptyState from "@/shared/components/EmptyState";
import SeasonGroups from "@/shared/components/SeasonGroups";
import { CatalogSkeletons } from "@/shared/components/Skeletons";
import { useI18n } from "@/i18n/LocaleContext";
import { carouselOnMobile } from "@/shared/styles/mixins";
import { getCharacterById, getCharacters, getEpisodesByIds } from "@/shared/services/rickAndMorty";
import { parseIdList, sharedEpisodeIds } from "@/shared/utils/catalog";
import type { Character, Episode } from "@/shared/types/api";
import { useDebouncedValue } from "@/shared/utils/useDebouncedValue";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: var(--MAX-CONTENT-WIDTH);
  padding: 24px 24px 80px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  h1 strong {
    color: var(--PORTAL-CYAN);
  }

  .pickers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-family: var(--FONT-DISPLAY);
  }

  input {
    height: 48px;
    padding: 0 16px;
    border: 3px solid var(--INK);
    border-radius: 999px;
    background: var(--CARD-BACKGROUND);
    color: var(--FONT-COLOR);
    box-shadow: 4px 4px 0 var(--INK);
  }

  .hints {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .hints button {
    text-align: left;
    padding: 8px 12px;
    border-radius: 12px;
    border: 2px solid var(--INK);
    background: var(--CARD-BACKGROUND);
    color: var(--FONT-COLOR);
  }

  .pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .shared {
    width: 100%;
  }

  .episodes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 24px;
    ${carouselOnMobile("min(72vw, 240px)")}
  }

  @media (max-width: 800px) {
    .pickers,
    .pair {
      grid-template-columns: 1fr;
    }
  }
`;

export default function ComparePage() {
  const router = useRouter();
  const { t } = useI18n();
  const aId = parseIdList(router.query.a as string | string[] | undefined)[0];
  const bId = parseIdList(router.query.b as string | string[] | undefined)[0];

  const [queryA, setQueryA] = useState("");
  const [queryB, setQueryB] = useState("");
  const debouncedA = useDebouncedValue(queryA, 280);
  const debouncedB = useDebouncedValue(queryB, 280);
  const [hintsA, setHintsA] = useState<Character[]>([]);
  const [hintsB, setHintsB] = useState<Character[]>([]);
  const [left, setLeft] = useState<Character | null>(null);
  const [right, setRight] = useState<Character | null>(null);
  const [shared, setShared] = useState<Episode[]>([]);
  const [loadingShared, setLoadingShared] = useState(false);

  useEffect(() => {
    if (debouncedA.length < 2) {
      setHintsA([]);
      return;
    }
    getCharacters({ name: debouncedA }).then((data) => setHintsA(data.results.slice(0, 6)));
  }, [debouncedA]);

  useEffect(() => {
    if (debouncedB.length < 2) {
      setHintsB([]);
      return;
    }
    getCharacters({ name: debouncedB }).then((data) => setHintsB(data.results.slice(0, 6)));
  }, [debouncedB]);

  useEffect(() => {
    if (!router.isReady) return;
    let cancelled = false;

    async function loadA() {
      if (!aId) {
        setLeft(null);
        return;
      }
      const character = await getCharacterById(aId);
      if (!cancelled) setLeft(character);
    }

    loadA();
    return () => {
      cancelled = true;
    };
  }, [aId, router.isReady]);

  useEffect(() => {
    if (!router.isReady) return;
    let cancelled = false;

    async function loadB() {
      if (!bId) {
        setRight(null);
        return;
      }
      const character = await getCharacterById(bId);
      if (!cancelled) setRight(character);
    }

    loadB();
    return () => {
      cancelled = true;
    };
  }, [bId, router.isReady]);

  useEffect(() => {
    if (!left || !right) {
      setShared([]);
      setLoadingShared(false);
      return;
    }

    const leftCharacter = left;
    const rightCharacter = right;
    let cancelled = false;

    async function loadShared() {
      setLoadingShared(true);
      const ids = sharedEpisodeIds(leftCharacter.episode, rightCharacter.episode);
      const episodes = await getEpisodesByIds(ids);
      if (cancelled) return;
      setShared(episodes);
      setLoadingShared(false);
    }

    loadShared();
    return () => {
      cancelled = true;
    };
  }, [left, right]);

  function pick(side: "a" | "b", character: Character) {
    if (side === "a") {
      setLeft(character);
      setQueryA("");
      setHintsA([]);
    } else {
      setRight(character);
      setQueryB("");
      setHintsB([]);
    }

    const nextA = side === "a" ? character.id : aId;
    const nextB = side === "b" ? character.id : bId;
    router.replace(
      {
        pathname: "/compare",
        query: {
          ...(nextA ? { a: String(nextA) } : {}),
          ...(nextB ? { b: String(nextB) } : {}),
        },
      },
      undefined,
      { shallow: true }
    );
  }

  const sharedLabel = useMemo(
    () => `${shared.length} ${t.compare.shared}`,
    [shared.length, t.compare.shared]
  );

  return (
    <Container>
      <Seo title={t.compare.title} description={t.seo.compare} />
      <Content>
        <div>
          <h1>
            {t.compare.title.split(" ")[0]} <strong>{t.compare.title.split(" ").slice(1).join(" ")}</strong>
          </h1>
          <p>{t.compare.subtitle}</p>
        </div>

        <div className="pickers">
          <label>
            {t.compare.pickA}
            <input
              value={queryA}
              onChange={(event) => setQueryA(event.target.value)}
              placeholder={t.compare.search}
            />
            <div className="hints">
              {hintsA.map((item) => (
                <button key={item.id} type="button" onClick={() => pick("a", item)}>
                  {item.name}
                </button>
              ))}
            </div>
          </label>
          <label>
            {t.compare.pickB}
            <input
              value={queryB}
              onChange={(event) => setQueryB(event.target.value)}
              placeholder={t.compare.search}
            />
            <div className="hints">
              {hintsB.map((item) => (
                <button key={item.id} type="button" onClick={() => pick("b", item)}>
                  {item.name}
                </button>
              ))}
            </div>
          </label>
        </div>

        <div className="pair">
          {left ? (
            <CharacterCard
              id={left.id}
              image={left.image}
              name={left.name}
              status={left.status}
              species={left.species}
              origin={left.origin?.name}
            />
          ) : (
            <EmptyState title={t.compare.pickA} />
          )}
          {right ? (
            <CharacterCard
              id={right.id}
              image={right.image}
              name={right.name}
              status={right.status}
              species={right.species}
              origin={right.origin?.name}
            />
          ) : (
            <EmptyState title={t.compare.pickB} />
          )}
        </div>

        {left && right ? (
          <div className="shared">
            <h2>{sharedLabel}</h2>
            {loadingShared ? (
              <CatalogSkeletons count={4} />
            ) : shared.length ? (
              <SeasonGroups episodes={shared} />
            ) : (
              <EmptyState title={t.compare.noneShared} />
            )}
          </div>
        ) : null}
      </Content>
    </Container>
  );
}
