import styled from "styled-components";
import DefaultButton from "@/shared/components/DefaultButton";
import { Icons } from "./icons";
import { useTheme } from "@/shared/context/ThemeContext";
import { useI18n } from "@/i18n/LocaleContext";

type FilterProps = {
  status: string;
  species: string;
  gender: string;
  onStatus: (value: string) => void;
  onSpecies: (value: string) => void;
  onGender: (value: string) => void;
  onClear: () => void;
};

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 32px;

  .category,
  .filters {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  h4 {
    font-family: var(--FONT-DISPLAY);
  }

  @media (max-width: 600px) {
    flex-direction: column;

    .category {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export default function Filter({
  status,
  species,
  gender,
  onStatus,
  onSpecies,
  onGender,
  onClear,
}: FilterProps) {
  const { darkTheme } = useTheme();
  const { t } = useI18n();
  const isFiltering = Boolean(status || species || gender);

  return (
    <Container>
      <div className="category">
        <h4>{t.filter.status}:</h4>
        <div className="filters">
          <DefaultButton
            icon={darkTheme ? Icons.WhitePulse : Icons.DarkPulse}
            text={t.filter.alive}
            onClick={() => onStatus("alive")}
            selected={status === "alive"}
          />
          <DefaultButton
            icon={darkTheme ? Icons.WhiteSkull : Icons.DarkSkull}
            text={t.filter.dead}
            onClick={() => onStatus("dead")}
            selected={status === "dead"}
          />
          <DefaultButton
            icon={darkTheme ? Icons.WhiteQuestion : Icons.DarkQuestion}
            text={t.filter.unknown}
            onClick={() => onStatus("unknown")}
            selected={status === "unknown"}
          />
        </div>
      </div>
      <div className="category">
        <h4>{t.filter.species}:</h4>
        <div className="filters">
          <DefaultButton
            icon={darkTheme ? Icons.WhitePerson : Icons.DarkPerson}
            text={t.filter.human}
            onClick={() => onSpecies("human")}
            selected={species === "human"}
          />
          <DefaultButton
            icon={darkTheme ? Icons.WhiteAlien : Icons.DarkAlien}
            text={t.filter.alien}
            onClick={() => onSpecies("alien")}
            selected={species === "alien"}
          />
          <DefaultButton
            icon={darkTheme ? Icons.WhiteRobot : Icons.DarkRobot}
            text={t.filter.robot}
            onClick={() => onSpecies("robot")}
            selected={species === "robot"}
          />
          <DefaultButton
            icon={darkTheme ? Icons.WhiteQuestion : Icons.DarkQuestion}
            text={t.filter.unknown}
            onClick={() => onSpecies("unknown")}
            selected={species === "unknown"}
          />
        </div>
      </div>
      <div className="category">
        <h4>{t.filter.gender}:</h4>
        <div className="filters">
          <DefaultButton
            icon={darkTheme ? Icons.WhiteGenderMale : Icons.DarkGenderMale}
            text={t.filter.male}
            onClick={() => onGender("male")}
            selected={gender === "male"}
          />
          <DefaultButton
            icon={darkTheme ? Icons.WhiteGenderFemale : Icons.DarkGenderFemale}
            text={t.filter.female}
            onClick={() => onGender("female")}
            selected={gender === "female"}
          />
          <DefaultButton
            icon={darkTheme ? Icons.WhiteQuestion : Icons.DarkQuestion}
            text={t.filter.unknown}
            onClick={() => onGender("unknown")}
            selected={gender === "unknown"}
          />
        </div>
      </div>
      {isFiltering ? (
        <DefaultButton
          icon={darkTheme ? Icons.WhiteXCircle : Icons.DarkXCircle}
          text={t.filter.clear}
          onClick={onClear}
        />
      ) : null}
    </Container>
  );
}
