import { useRouter } from "next/router";

import { Planet, Info, Heart, MapPin } from "@phosphor-icons/react";

import LocationCardProps from "@/shared/types/LocationCardProps";
import DefaultButton from "../DefaultButton";

import { Container, Content } from "./styles";

const LocationCard = ({ id, type, name }: LocationCardProps) => {
  const router = useRouter();

  return (
    <Container>
      {name && (
        <>
          {type === "Planet" ? (
            <Planet size={48} color={`var(--FONT-COLOR)`} />
          ) : (
            <MapPin size={48} color={`var(--FONT-COLOR)`} />
          )}
          <Content>
            <h4>{type === "unknown" ? "Desconhecido" : type}</h4>
            <h4>{name}</h4>
            <DefaultButton
              icon={<Info size={24} color={`var(--FONT-COLOR)`} />}
              text="Saiba mais"
              onClick={() => router.push(`/location/${id}`)}
            />
            <button>
              <Heart size={32} color={`var(--FONT-COLOR)`} />
            </button>
          </Content>
        </>
      )}
    </Container>
  );
};

export default LocationCard;
