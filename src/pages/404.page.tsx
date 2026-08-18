import { useRouter } from "next/router";
import styled from "styled-components";
import Seo from "@/shared/components/Seo";
import DefaultButton from "@/shared/components/DefaultButton";
import { useTheme } from "@/shared/context/ThemeContext";
import { Icons as TopBarIcons } from "@/shared/components/TopBar/icons";

const Container = styled.main`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 16px;
  padding: 64px 24px;

  h1 {
    max-width: 640px;
  }

  p {
    color: var(--FONT-MUTED);
    max-width: 420px;
  }
`;

export default function NotFoundPage() {
  const router = useRouter();
  const { darkTheme } = useTheme();

  return (
    <Container>
      <Seo
        title="Página não encontrada"
        description="Esse portal não leva a lugar nenhum. Volta pro início da wiki."
      />
      <h1>Essa dimensão não existe.</h1>
      <p>O portal abriu no lugar errado. Volta pro início e tenta de novo.</p>
      <DefaultButton
        icon={darkTheme ? TopBarIcons.WhiteHouseSimple : TopBarIcons.DarkHouseSimple}
        text="Voltar ao início"
        onClick={() => router.push("/")}
      />
    </Container>
  );
}
