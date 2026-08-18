import styled, { keyframes } from "styled-components";
import { useI18n } from "@/i18n/LocaleContext";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, #050814 78%, transparent);
  backdrop-filter: blur(6px);

  .portal {
    width: min(220px, 54vw);
    height: min(220px, 54vw);
    border-radius: 50%;
    position: relative;
  }

  .ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(
      var(--PORTAL-CYAN),
      var(--PORTAL-LIME-FILL),
      var(--CHAOS-PINK),
      var(--PORTAL-CYAN)
    );
    animation: ${spin} 0.7s linear infinite;
  }

  .hole {
    position: absolute;
    inset: 28px;
    border-radius: 50%;
    background: #050814;
    border: 3px solid var(--INK);
    display: grid;
    place-items: center;
    z-index: 1;
    padding: 16px;
    text-align: center;
  }

  p {
    font-family: var(--FONT-DISPLAY);
    color: var(--PORTAL-LIME-FILL);
    font-size: 18px;
  }
`;

export default function PortalRoulette({ open }: { open: boolean }) {
  const { t } = useI18n();
  if (!open) return null;

  return (
    <Overlay role="status" aria-live="polite">
      <div className="portal" aria-hidden>
        <span className="ring" />
        <span className="hole">
          <p>{t.roulette.jumping}</p>
        </span>
      </div>
    </Overlay>
  );
}
