import styled from "styled-components";
import DefaultButton from "../DefaultButton";
import { Icons } from "./icons";
import { useTheme } from "@/shared/context/ThemeContext";
import { useI18n } from "@/i18n/LocaleContext";

type TitleSectionProps = {
  id: string;
  title: string;
  onClick?: () => void;
  isSearching?: boolean;
  resultsCount?: number;
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 56px;

  h3 {
    background: var(--PORTAL-LIME-FILL);
    color: #06101c;
    border: 3px solid var(--INK);
    box-shadow: 4px 4px 0 var(--INK);
    padding: 8px 16px;
    border-radius: 16px;
    transform: rotate(-1deg);
  }

  h4 {
    color: var(--FONT-MUTED);
  }

  .swipe-hint {
    display: none;
    font-family: var(--FONT-DISPLAY);
    font-size: 13px;
    color: var(--PORTAL-CYAN);
    transform: rotate(2deg);
  }

  @media (max-width: 860px) {
    .swipe-hint {
      display: inline-block;
      animation: wobble 1.8s ease-in-out infinite;
    }
  }
`;

export default function TitleSection({
  title,
  id,
  onClick,
  isSearching,
  resultsCount,
}: TitleSectionProps) {
  const { darkTheme } = useTheme();
  const { t } = useI18n();

  return (
    <Container id={id}>
      <h3>{title}</h3>
      {onClick ? (
        <DefaultButton
          icon={darkTheme ? Icons.WhiteSquaresFour : Icons.DarkSquaresFour}
          text={t.sections.seeAll}
          onClick={onClick}
        />
      ) : null}
      {isSearching ? (
        <h4>{resultsCount ?? 0} {t.sections.results}</h4>
      ) : null}
      <span className="swipe-hint">{t.sections.swipe}</span>
    </Container>
  );
}
