import Image from "next/image";
import styled from "styled-components";
import DarkThemeHeroImage from "@/shared/assets/images/rick_morty_hero_dark_mode.png";
import WhiteThemeHeroImage from "@/shared/assets/images/rick_morty_hero_white_mode.png";
import { Icons } from "./icons";
import { useTheme } from "@/shared/context/ThemeContext";
import { useToast } from "@/shared/context/ToastContext";
import { useI18n } from "@/i18n/LocaleContext";
import DefaultButton from "@/shared/components/DefaultButton";

const Container = styled.div<{ $isDarkTheme: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--MAX-CONTENT-WIDTH);
  width: 100%;
  gap: 32px;
  position: relative;
  padding-bottom: 24px;

  .hero-info h1 strong {
    color: var(--PORTAL-CYAN);
  }

  .hero-info h4 {
    margin: 20px 0 36px;
    max-width: 420px;
    color: var(--FONT-MUTED);
  }

  .buttons {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .theme-phrase {
    margin-top: 20px;
    color: var(--ACCENT-TEXT) !important;
    font-family: var(--FONT-DISPLAY);
    display: inline-block;
    animation: wobble 2.8s ease-in-out infinite;
  }

  .art {
    position: relative;
    flex-shrink: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .hero-image {
    position: relative;
    z-index: 1;
    height: auto;
    width: auto;
    max-height: ${(props) => (props.$isDarkTheme ? "420px" : "460px")};
    object-fit: contain;
  }

  @media (max-width: 1100px) {
    flex-direction: column-reverse;
    text-align: center;

    .hero-info h4,
    .buttons {
      margin-left: auto;
      margin-right: auto;
      justify-content: center;
    }

    .hero-image {
      max-height: ${(props) => (props.$isDarkTheme ? "360px" : "380px")};
    }
  }

  @media (max-width: 560px) {
    .hero-image {
      width: min(100%, ${(props) => (props.$isDarkTheme ? "420px" : "280px")});
      max-height: none;
    }
  }
`;

export default function Hero() {
  const { setDarkTheme, darkTheme } = useTheme();
  const { toast } = useToast();
  const { t, locale } = useI18n();

  return (
    <Container $isDarkTheme={darkTheme}>
      <div className="hero-info">
        <h1>
          {t.hero.title}
          <br />
          {locale === "pt" ? (
            <>
              um só <strong>lugar.</strong>
            </>
          ) : (
            <>
              one <strong>place.</strong>
            </>
          )}
        </h1>
        <h4>{t.hero.subtitle}</h4>
        <div className="buttons">
          <DefaultButton
            icon={darkTheme ? Icons.WhiteMoon : Icons.DarkMoon}
            text={t.nav.dark}
            onClick={() => {
              if (darkTheme) return;
              setDarkTheme(true);
              toast({
                tone: "info",
                title: t.theme.darkTitle,
                message: t.theme.darkMsg,
              });
            }}
            selected={darkTheme}
          />
          <DefaultButton
            icon={darkTheme ? Icons.WhiteSun : Icons.DarkSun}
            text={t.nav.light}
            onClick={() => {
              if (!darkTheme) return;
              setDarkTheme(false);
              toast({
                tone: "info",
                title: t.theme.lightTitle,
                message: t.theme.lightMsg,
              });
            }}
            selected={!darkTheme}
          />
        </div>
        <h4 className="theme-phrase">
          {darkTheme ? t.hero.phraseDark : t.hero.phraseLight}
        </h4>
      </div>

      <div className="art">
        {darkTheme ? (
          <Image
            src={DarkThemeHeroImage}
            width={560}
            height={420}
            alt="Rick e Morty saindo do portal"
            className="hero-image"
            priority
          />
        ) : (
          <Image
            src={WhiteThemeHeroImage}
            width={280}
            height={460}
            alt="Rick e Morty em destaque no modo claro"
            className="hero-image"
            priority
          />
        )}
      </div>
    </Container>
  );
}
