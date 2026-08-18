import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import styled, { css, keyframes } from "styled-components";

export type ToastTone = "success" | "remove" | "info";

export type ToastInput = {
  title: string;
  message?: string;
  tone?: ToastTone;
};

type ToastItem = ToastInput & { id: number };

type ToastContextValue = {
  toast: (input: ToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const popIn = keyframes`
  0% { transform: scale(0.5) rotate(-14deg) translateY(24px); opacity: 0; }
  55% { transform: scale(1.08) rotate(3deg) translateY(0); opacity: 1; }
  100% { transform: scale(1) rotate(-2deg); opacity: 1; }
`;

const Viewport = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 80;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
  max-width: min(360px, calc(100vw - 32px));

  @media (max-width: 720px) {
    right: 50%;
    bottom: 18px;
    transform: translateX(50%);
  }
`;

const Bubble = styled.div<{ $tone: ToastTone; $tilt: number }>`
  pointer-events: auto;
  position: relative;
  padding: 14px 18px 16px;
  border: 3px solid var(--INK);
  border-radius: 22px 26px 26px 8px;
  box-shadow: 6px 6px 0 var(--INK);
  animation: ${popIn} 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: rotate(${(props) => props.$tilt}deg);
  font-family: var(--FONT-DISPLAY);

  ${(props) =>
    props.$tone === "success" &&
    css`
    background: var(--PORTAL-LIME-FILL);
      color: #06101c;
    `}

  ${(props) =>
    props.$tone === "remove" &&
    css`
      background: var(--CHAOS-PINK);
      color: #fff;
    `}

  ${(props) =>
    props.$tone === "info" &&
    css`
      background: var(--PORTAL-CYAN);
      color: #06101c;
    `}

  .stamp {
    position: absolute;
    top: -12px;
    right: 12px;
    font-size: 11px;
    letter-spacing: 0.08em;
    border: 2px solid currentColor;
    border-radius: 999px;
    padding: 2px 8px;
    transform: rotate(8deg);
    background: inherit;
  }

  strong {
    display: block;
    font-size: 18px;
    line-height: 1.1;
  }

  p {
    margin-top: 4px;
    font-family: var(--FONT-BODY);
    font-size: 13px;
    color: inherit;
    opacity: 0.9;
  }

  &::after {
    content: "";
    position: absolute;
    left: 18px;
    bottom: -14px;
    width: 18px;
    height: 18px;
    background: inherit;
    border-right: 3px solid var(--INK);
    border-bottom: 3px solid var(--INK);
    transform: rotate(32deg);
  }
`;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((input: ToastInput) => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current.slice(-3), { ...input, id }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 2800);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Viewport role="status" aria-live="polite" aria-atomic="true">
        {toasts.map((item, index) => (
          <Bubble
            key={item.id}
            $tone={item.tone ?? "info"}
            $tilt={index % 2 === 0 ? -2 : 2}
          >
            <span className="stamp">
              {item.tone === "remove" ? "POOF" : item.tone === "success" ? "BAM" : "OK"}
            </span>
            <strong>{item.title}</strong>
            {item.message ? <p>{item.message}</p> : null}
          </Bubble>
        ))}
      </Viewport>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
