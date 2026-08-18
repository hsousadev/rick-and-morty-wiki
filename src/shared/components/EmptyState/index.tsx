import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 40px 16px;
  border: 3px dashed var(--INK);
  border-radius: 28px;
  background: color-mix(in srgb, var(--CARD-BACKGROUND) 80%, transparent);
  text-align: center;

  h3 {
    color: var(--PORTAL-CYAN);
  }

  p {
    color: var(--FONT-MUTED);
    max-width: 420px;
  }
`;

type EmptyStateProps = {
  title: string;
  description?: string;
};

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Container>
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
    </Container>
  );
}
