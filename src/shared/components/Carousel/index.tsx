import { useRef, type KeyboardEvent, type ReactNode } from "react";

type CarouselProps = {
  children: ReactNode;
  className?: string;
  label: string;
};

export default function Carousel({ children, className, label }: CarouselProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    ref.current?.scrollBy({
      left: event.key === "ArrowRight" ? 280 : -280,
      behavior: "smooth",
    });
  }

  return (
    <div
      ref={ref}
      className={className}
      tabIndex={0}
      role="region"
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );
}
