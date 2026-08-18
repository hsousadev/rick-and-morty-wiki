import Image from "next/image";
import styled from "styled-components";
import BlueHeartOutline from "@/shared/assets/icons/BlueHeartOutline.svg";
import HighlightImage from "@/shared/assets/images/rick-and-morty-fav.png";
import { useTheme } from "@/shared/context/ThemeContext";
import { useI18n } from "@/i18n/LocaleContext";

const Container = styled.div<{ $isDarkMode: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: var(--MAX-CONTENT-WIDTH);
  padding: 16px 24px 32px;
  gap: 24px;

  .page-title h1 strong {
    color: var(--PORTAL-CYAN);
  }

  img.highlight {
    transform: ${(props) => (props.$isDarkMode ? "none" : "scaleX(-1)")};
  }

  @media (max-width: 700px) {
    flex-direction: column;
    text-align: center;
  }
`;

export default function Hero() {
  const { darkTheme } = useTheme();
  const { t } = useI18n();

  return (
    <Container $isDarkMode={darkTheme}>
      <div className="page-title">
        <Image src={BlueHeartOutline} width={56} height={56} alt="" />
        <h1>
          {t.favorites.headline}
          <br /> <strong>{t.favorites.headlineStrong}</strong>
        </h1>
      </div>
      <Image className="highlight" src={HighlightImage} alt="" width={280} />
    </Container>
  );
}
