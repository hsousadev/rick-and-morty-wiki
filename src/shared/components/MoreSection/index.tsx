import Image from "next/image";
import styled from "styled-components";
import { useI18n } from "@/i18n/LocaleContext";

type MoreSectionProps = {
  icon: string;
  text: string;
  id?: string;
  hidePrefix?: boolean;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 32px 0 16px;

  h3 {
    line-height: 1.1;
  }

  .swipe-hint {
    display: none;
    margin-left: auto;
    font-family: var(--FONT-DISPLAY);
    font-size: 13px;
    color: var(--PORTAL-CYAN);
  }

  @media (max-width: 860px) {
    .swipe-hint {
      display: inline-block;
      animation: wobble 1.8s ease-in-out infinite;
    }
  }
`;

export default function MoreSection({ icon, text, id, hidePrefix }: MoreSectionProps) {
  const { t } = useI18n();

  return (
    <Container id={id}>
      <Image src={icon} width={48} height={48} alt="" />
      <h3>
        {hidePrefix ? (
          text
        ) : (
          <>
            {t.sections.morePrefix}
            <br />
            {text}
          </>
        )}
      </h3>
      <span className="swipe-hint">{t.sections.swipe}</span>
    </Container>
  );
}
