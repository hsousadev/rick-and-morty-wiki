import { useRouter } from "next/router";

import { MonitorPlay, Info, Heart } from "@phosphor-icons/react";

import DefaultButton from "../DefaultButton";

import { Container } from "./styles";

interface EpisodeCardProps {
  id?: number;
  name: string;
  episode: string;
}

const EpisodeCard = ({ id, name, episode }: EpisodeCardProps) => {
  const router = useRouter();

  return (
    <Container>
      <div>
        <MonitorPlay size={24} color={`var(--FONT-COLOR)`} />
        <h4>
          {name} {episode}
        </h4>
      </div>
      <div>
        <DefaultButton
          icon={<Info size={24} color={`var(--FONT-COLOR)`} />}
          text="Saiba mais"
          onClick={() => router.push(`/episode/${id}`)}
        />
        <button>
          <Heart size={32} color={`var(--FONT-COLOR)`} />
        </button>
      </div>
    </Container>
  );
};

export default EpisodeCard;
