import Image from "next/image";
import styled, { keyframes } from "styled-components";
import logo from "@/shared/assets/icons/rick-and-morty-no-border-logo.svg";
import smoothScroll from "@/shared/utils/smoothScroll";
import { useI18n } from "@/i18n/LocaleContext";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const bob = keyframes`
  0%, 100% { transform: translateY(0) rotate(-6deg); }
  50% { transform: translateY(-10px) rotate(4deg); }
`;

const Container = styled.footer`
  position: relative;
  width: 100%;
  margin-top: 48px;
  overflow: hidden;
  background: var(--PAGE-BG-ALT);
  z-index: 1;

  .tear {
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    height: 48px;
    color: var(--PAGE-BG);
  }

  .field {
    position: relative;
    max-width: var(--MAX-CONTENT-WIDTH);
    margin: 0 auto;
    padding: 72px 24px 36px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: end;
    gap: 24px;
  }

  .bubble {
    justify-self: start;
    max-width: 280px;
    background: var(--PAPER);
    border: 3px solid var(--INK);
    border-radius: 28px 28px 28px 6px;
    padding: 16px 18px;
    box-shadow: 6px 6px 0 var(--INK);
    transform: rotate(-3deg);
    animation: ${bob} 4.5s ease-in-out infinite;

    p {
      font-family: var(--FONT-DISPLAY);
      font-size: 18px;
      line-height: 1.2;
    }

    span {
      display: block;
      margin-top: 6px;
      color: var(--PORTAL-CYAN);
      font-size: 13px;
    }
  }

  .portal-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .portal-btn {
    width: 168px;
    height: 168px;
    border-radius: 50%;
    position: relative;
    isolation: isolate;
  }

  .ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(
      var(--PORTAL-CYAN),
      var(--PORTAL-LIME),
      var(--CHAOS-PINK),
      var(--PORTAL-CYAN)
    );
    animation: ${spin} 8s linear infinite;
  }

  .hole {
    position: absolute;
    inset: 22px;
    border-radius: 50%;
    background: #050814;
    border: 3px solid var(--INK);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    z-index: 1;
    padding: 8px;
  }

  .hole span {
    font-family: var(--FONT-DISPLAY);
    color: var(--ACCENT-TEXT);
    font-size: 14px;
    text-align: center;
    line-height: 1.15;
    white-space: pre-line;
  }

  .continued {
    font-family: var(--FONT-DISPLAY);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: 12px;
    color: var(--FONT-MUTED);
  }

  .meta {
    justify-self: end;
    text-align: right;
  }

  .stamp {
    display: inline-block;
    border: 3px solid var(--DEAD);
    color: var(--DEAD);
    font-family: var(--FONT-DISPLAY);
    font-size: 22px;
    padding: 6px 12px;
    transform: rotate(12deg);
    margin-bottom: 16px;
  }

  .copyrights {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;

    a {
      color: var(--PORTAL-CYAN);
      border-bottom: 2px solid var(--PORTAL-LIME);
    }
  }

  .caption {
    margin-top: 8px;
    border-top: 3px solid var(--INK);
    padding: 16px 24px 28px;
    text-align: center;
    font-family: var(--FONT-DISPLAY);
    font-size: 13px;
    color: var(--FONT-MUTED);
  }

  @media (max-width: 860px) {
    .field {
      grid-template-columns: 1fr;
      justify-items: center;
      text-align: center;
    }

    .bubble,
    .meta,
    .copyrights {
      justify-self: center;
      text-align: center;
      align-items: center;
    }
  }
`;

export default function Footer() {
  const { t } = useI18n();

  return (
    <Container>
      <svg className="tear" viewBox="0 0 1440 48" preserveAspectRatio="none">
        <path
          fill="currentColor"
          d="M0 0h1440v18s-70 28-160 18c-110-12-140-34-250-20-90 12-120 34-210 18S680 4 560 18 390 52 280 32 140 4 0 22V0Z"
        />
      </svg>
      <div className="field">
        <div className="bubble">
          <p>Wubba Lubba Dub Dub.</p>
          <span>Cápsula C-137 · fim do episódio?</span>
        </div>
        <div className="portal-wrap">
          <button
            type="button"
            className="portal-btn"
            onClick={() => smoothScroll("top")}
            aria-label="Voltar ao topo pelo portal"
          >
            <span className="ring" />
            <span className="hole">
              <Image src={logo} alt="" width={54} height={54} />
              <span>
                {t.footer.jump.split(" ").join("\n")}
              </span>
            </span>
          </button>
          <p className="continued">{t.footer.continued}</p>
        </div>
        <div className="meta">
          <div className="stamp">THE END?</div>
          <div className="copyrights">
            <h4>Copyright © 2026</h4>
            <h4>
              {t.footer.developed}{" "}
              <a
                href="https://henriquehs.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Henrique Sousa
              </a>
            </h4>
          </div>
        </div>
      </div>
      <p className="caption">
        {t.footer.caption}
      </p>
    </Container>
  );
}
