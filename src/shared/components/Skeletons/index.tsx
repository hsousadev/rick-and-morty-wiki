import styled, { keyframes } from "styled-components";
import { sticker } from "@/shared/styles/mixins";

const shimmer = keyframes`
  0% { background-position: 120% 0; }
  100% { background-position: -120% 0; }
`;

const Bone = styled.div`
  ${sticker}
  pointer-events: none;
  min-height: 220px;
  padding: 16px;
  background:
    linear-gradient(
      100deg,
      var(--CARD-BACKGROUND) 20%,
      color-mix(in srgb, var(--PORTAL-CYAN) 28%, var(--CARD-BACKGROUND)) 50%,
      var(--CARD-BACKGROUND) 80%
    );
  background-size: 220% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;

  &:hover {
    transform: none;
    box-shadow: 6px 6px 0 var(--INK);
  }
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  gap: 24px;
  margin-top: 24px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
`;

export function CardSkeleton() {
  return <Bone aria-hidden />;
}

export function CatalogSkeletons({ count = 6 }: { count?: number }) {
  return (
    <Grid role="status" aria-live="polite">
      {Array.from({ length: count }, (_, index) => (
        <CardSkeleton key={index} />
      ))}
    </Grid>
  );
}
