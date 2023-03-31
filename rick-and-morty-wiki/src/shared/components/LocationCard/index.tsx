import React from "react";

import { Planet, Info, Heart, MapPin } from "@phosphor-icons/react";
import DefaultButton from "../DefaultButton";

import { Container, Content } from "./styles";

interface LocationCardProps {
  type: string;
  name: string;
}

const LocationCard = ({ type, name }: LocationCardProps) => {
  return (
    <Container>
      {type === "Planet" ? (
        <Planet size={48} color={`var(--FONT-COLOR)`} />
      ) : (
        <MapPin size={48} color={`var(--FONT-COLOR)`} />
      )}

      <Content>
        <h4>{type}</h4>
        <h4>{name}</h4>
        <DefaultButton
          icon={<Info size={24} color={`var(--FONT-COLOR)`} />}
          text="Saiba mais"
        />
        <button>
          <Heart size={32} color={`var(--FONT-COLOR)`} />
        </button>
      </Content>
    </Container>
  );
};

export default LocationCard;
