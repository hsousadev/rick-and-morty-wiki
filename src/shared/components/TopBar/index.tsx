import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import Logo from "../../../../public/favicon.png";
import DefaultButton from "../DefaultButton";
import PortalRoulette from "../PortalRoulette";
import { Icons } from "./icons";
import { useTheme } from "@/shared/context/ThemeContext";
import { useToast } from "@/shared/context/ToastContext";
import { useI18n } from "@/i18n/LocaleContext";
import { getRandomPortal } from "@/shared/services/rickAndMorty";
import useWindowSize from "@/shared/utils/useWindowSize";

const Container = styled.header<{ $isHome?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px 24px 16px;
  position: relative;
  z-index: 2;
  background: ${(props) =>
    props.$isHome ? "var(--HERO-BAND)" : "transparent"};
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: var(--MAX-CONTENT-WIDTH);
  gap: 16px;

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;

    span {
      font-family: var(--FONT-DISPLAY);
      font-size: 22px;
      font-weight: 700;
      color: var(--ACCENT-TEXT);
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  @media (max-width: 800px) {
    flex-direction: column;

    .buttons {
      justify-content: center;
    }
  }
`;

const BrandMark = styled.div`
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  flex-shrink: 0;

  img {
    width: 56px;
    height: 56px;
    display: block;
  }
`;

export default function TopBar() {
  const { darkTheme, setDarkTheme } = useTheme();
  const { toast } = useToast();
  const { t, toggleLocale } = useI18n();
  const router = useRouter();
  const windowSize = useWindowSize();
  const isMobile = (windowSize.windowWidth ?? 1200) <= 720;
  const isHome = router.pathname === "/" || router.pathname === "/home";
  const isFavorites = router.pathname === "/favorites";
  const [spinning, setSpinning] = useState(false);

  async function spinPortal() {
    if (spinning) return;
    setSpinning(true);
    try {
      const target = await getRandomPortal();
      window.setTimeout(() => {
        router.push(`/${target.type}/${target.id}`);
        setSpinning(false);
      }, 900);
    } catch {
      setSpinning(false);
      toast({ tone: "remove", title: t.roulette.fail });
    }
  }

  return (
    <Container id="top" $isHome={isHome}>
      <PortalRoulette open={spinning} />
      <Content>
        <button className="logo" type="button" onClick={() => router.push("/")}>
          <BrandMark>
            <Image
              src={Logo}
              height={56}
              width={56}
              alt={t.brand}
              priority
            />
          </BrandMark>
          <span>{t.brand}</span>
        </button>

        <div className="buttons">
          {!isFavorites && (
            <DefaultButton
              icon={darkTheme ? Icons.WhiteHeart : Icons.DarkHeart}
              text={isMobile ? "" : t.nav.favorites}
              onClick={() => router.push("/favorites")}
            />
          )}
          {!isHome && (
            <DefaultButton
              icon={darkTheme ? Icons.WhiteHouseSimple : Icons.DarkHouseSimple}
              text={isMobile ? "" : t.nav.home}
              onClick={() => router.push("/")}
            />
          )}
          <DefaultButton
            icon={darkTheme ? Icons.WhitePlanet : Icons.DarkPlanet}
            text={isMobile ? "" : t.nav.roulette}
            onClick={spinPortal}
          />
          <DefaultButton
            icon={darkTheme ? Icons.WhiteSquaresFour : Icons.DarkSquaresFour}
            text={isMobile ? "" : t.nav.compare}
            selected={router.pathname === "/compare"}
            onClick={() => router.push("/compare")}
          />
          <DefaultButton
            icon={darkTheme ? Icons.WhiteGlobe : Icons.DarkGlobe}
            text={t.nav.lang}
            onClick={toggleLocale}
          />
          <DefaultButton
            icon={darkTheme ? Icons.WhiteMoon : Icons.DarkMoon}
            text={isMobile ? "" : t.nav.dark}
            selected={darkTheme}
            onClick={() => {
              if (darkTheme) return;
              setDarkTheme(true);
              toast({
                tone: "info",
                title: t.theme.darkTitle,
                message: t.theme.darkMsg,
              });
            }}
          />
          <DefaultButton
            icon={darkTheme ? Icons.WhiteSun : Icons.DarkSun}
            text={isMobile ? "" : t.nav.light}
            selected={!darkTheme}
            onClick={() => {
              if (!darkTheme) return;
              setDarkTheme(false);
              toast({
                tone: "info",
                title: t.theme.lightTitle,
                message: t.theme.lightMsg,
              });
            }}
          />
        </div>
      </Content>
    </Container>
  );
}
