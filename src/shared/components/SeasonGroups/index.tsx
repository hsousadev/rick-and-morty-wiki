import styled from "styled-components";
import EpisodeCard from "@/shared/components/EpisodeCard";
import Carousel from "@/shared/components/Carousel";
import EmptyState from "@/shared/components/EmptyState";
import { groupBySeason } from "@/shared/utils/catalog";
import { carouselOnMobile } from "@/shared/styles/mixins";
import { useI18n } from "@/i18n/LocaleContext";
import type { Episode } from "@/shared/types/api";

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .season-title {
    margin-top: 28px;
    font-size: 20px;
    color: var(--ACCENT-TEXT);
  }

  .episodes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    width: 100%;
    gap: 24px;
    margin-top: 12px;
    ${carouselOnMobile("min(72vw, 240px)")}
  }
`;

export default function SeasonGroups({ episodes }: { episodes: Episode[] }) {
  const { t } = useI18n();
  const groups = groupBySeason(episodes);

  if (!groups.length) {
    return <EmptyState title={t.empty.noEpisodes} />;
  }

  return (
    <Wrap>
      {groups.map(([season, items]) => (
        <section key={season}>
          <h3 className="season-title">
            {t.sections.season} {String(season).padStart(2, "0")}
          </h3>
          <Carousel className="episodes" label={t.a11y.carousel}>
            {items.map((item) => (
              <EpisodeCard
                key={item.id}
                id={item.id}
                name={item.name}
                episode={item.episode}
              />
            ))}
          </Carousel>
        </section>
      ))}
    </Wrap>
  );
}
