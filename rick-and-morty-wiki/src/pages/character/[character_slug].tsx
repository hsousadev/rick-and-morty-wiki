import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { SmileyBlank } from "@phosphor-icons/react";

import Hero from "./components/Hero";
import smoothScroll from "@/shared/utils/smoothScroll";

import CharacterCard from "@/shared/components/CharacterCard";
import Paginate from "@/shared/components/Paginate";

import { Container, Content, HeroContent } from "./styles";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const characterList = await res.json();

  return {
    props: {
      characterList,
    },
  };
}

const Character = ({ characterList }: any) => {
  const router = useRouter();
  const { character_slug } = router.query;

  const [character, setCharacter] = useState<any>();
  const [characterListData, setCharacterListData] = useState(
    characterList?.results
  );

  const handleNewCharacterPage = async (page: number) => {
    smoothScroll("more-character");

    const pageNumber = page + 1;
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${pageNumber}`
    );
    const newCharacterPageList = await res.json();
    setCharacterListData(newCharacterPageList?.results);
  };

  useEffect(() => {
    const getCharacterRequested = async () => {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/${character_slug}`
      );

      const characterResquested = await res.json();

      setCharacter(characterResquested);
    };

    getCharacterRequested();
  }, [character_slug]);

  return (
    <Container>
      {character && (
        <HeroContent>
          <Hero
            name={character?.name}
            status={character?.status}
            species={character?.species}
            gender={character?.gender}
            origin={character?.origin}
            location={character?.location}
            image={character?.image}
            episodes={character?.episode}
          />
        </HeroContent>
      )}

      <Content>
        <div id="more-character" className="more-character">
          <SmileyBlank size={48} color={`var(--FONT-COLOR)`} />
          <h3>
            Mais <br /> personagens
          </h3>
        </div>

        <div className="characters">
          {characterListData?.map((character: any) => (
            <CharacterCard
              id={character?.id}
              key={character?.id}
              image={character?.image}
              name={character?.name}
              status={character?.status}
              species={character?.species}
              origin={character?.origin?.name}
            />
          ))}
        </div>
      </Content>

      <Paginate
        pageCount={characterList?.info?.pages}
        onPageChange={(selectedItem: { selected: number }) =>
          handleNewCharacterPage(selectedItem?.selected)
        }
      />
    </Container>
  );
};

export default Character;
