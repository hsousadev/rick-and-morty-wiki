import styled, { keyframes } from "styled-components";

const drift = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
  50% { transform: translate3d(12px, -18px, 0) rotate(8deg); }
`;

const spinSlow = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0.25; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.15); }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  .halftone {
    position: absolute;
    inset: 0;
    opacity: 0.14;
    background-image: radial-gradient(var(--FONT-COLOR) 1px, transparent 1.15px);
    background-size: 12px 12px;
  }

  .scribble,
  .portal,
  .star,
  .label {
    position: absolute;
  }

  .portal {
    border-radius: 50%;
    border: 8px solid transparent;
    background:
      conic-gradient(from 40deg, var(--PORTAL-CYAN), var(--PORTAL-LIME), var(--CHAOS-PINK), var(--PORTAL-CYAN))
        padding-box,
      repeating-conic-gradient(#0000 0 12deg, var(--INK) 0 14deg) border-box;
    animation: ${spinSlow} 22s linear infinite;
    filter: drop-shadow(0 0 18px color-mix(in srgb, var(--PORTAL-CYAN) 45%, transparent));
  }

  .portal.one {
    width: 340px;
    height: 340px;
    top: -90px;
    right: -80px;
    opacity: 0.35;
  }

  .portal.two {
    width: 180px;
    height: 180px;
    bottom: 18%;
    left: -70px;
    opacity: 0.28;
    animation-duration: 16s;
    animation-direction: reverse;
  }

  .portal.three {
    width: 90px;
    height: 90px;
    top: 42%;
    right: 8%;
    opacity: 0.4;
    animation-duration: 11s;
  }

  .scribble {
    animation: ${drift} 9s ease-in-out infinite;
  }

  .star {
    width: 10px;
    height: 10px;
    background: var(--PORTAL-LIME);
    clip-path: polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    animation: ${twinkle} 2.8s ease-in-out infinite;
  }

  .label {
    font-family: var(--FONT-DISPLAY);
    font-size: 13px;
    letter-spacing: 0.08em;
    color: var(--PORTAL-CYAN);
    border: 2px dashed var(--PORTAL-CYAN);
    padding: 4px 8px;
    border-radius: 999px;
    transform: rotate(-12deg);
    opacity: 0.55;
  }
`;

export default function SceneBackdrop() {
  return (
    <Backdrop aria-hidden>
      <div className="halftone" />
      <div className="portal one" />
      <div className="portal two" />
      <div className="portal three" />
      <svg
        className="scribble"
        style={{ top: "18%", left: "6%", width: 140 }}
        viewBox="0 0 140 60"
        fill="none"
      >
        <path
          d="M4 32c18-28 38 24 58-8 16-26 34 22 52-6 8-12 18 8 22 16"
          stroke="var(--CHAOS-PINK)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="scribble"
        style={{ bottom: "28%", right: "10%", width: 120, animationDelay: "1.4s" }}
        viewBox="0 0 120 80"
        fill="none"
      >
        <path
          d="M8 40c8-22 28-22 36 0s28 22 36 0 24-20 32 8"
          stroke="var(--PORTAL-LIME)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <span className="star" style={{ top: "12%", left: "22%" }} />
      <span className="star" style={{ top: "30%", right: "18%", animationDelay: "0.6s" }} />
      <span className="star" style={{ bottom: "22%", left: "18%", animationDelay: "1.1s" }} />
      <span className="star" style={{ top: "58%", right: "30%", animationDelay: "1.8s" }} />
      <span className="label" style={{ top: "22%", right: "26%" }}>
        DIM C-137
      </span>
      <span className="label" style={{ bottom: "34%", left: "8%", transform: "rotate(8deg)" }}>
        SCHWIFTY
      </span>
    </Backdrop>
  );
}
