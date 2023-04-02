import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SmileyBlank, LinkBreak } from "@phosphor-icons/react";

import smoothScroll from "@/shared/utils/smoothScroll";

import Hero from "./components/Hero";
import Filter from "./components/Filter";

import CharacterCard from "@/shared/components/CharacterCard";
import Paginate from "@/shared/components/Paginate";

import CharacterProps from "./interfaces";
import CharacterListProps from "./interfaces";

import { Container, Content, HeroContent } from "./styles";
import MoreSection from "@/shared/components/MoreSection";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const characterList = await res.json();
  const results = characterList.results;
  const info = characterList.info;

  return {
    props: {
      results,
      info,
    },
  };
}

const Character = ({ results, info }: CharacterListProps) => {
  const router = useRouter();
  const { character_slug } = router.query;

  const [character, setCharacter] = useState<CharacterProps>();
  const [characterListData, setCharacterListData] = useState(results);
  const [infoPage, setInfoPage] = useState(info);

  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");

  const handleNewCharacterPage = async (page: number) => {
    const pageNumber = page + 1;
    smoothScroll("more-section");

    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${pageNumber}&status=${status}&species=${species}&gender=${gender}`
    );
    const newCharacterPageList = await res.json();

    setCharacterListData(newCharacterPageList?.results);
    setInfoPage(newCharacterPageList?.info);
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
            id={character.id}
            name={character?.name}
            status={character?.status}
            species={character?.species}
            gender={character?.gender}
            origin={character?.origin}
            location={character?.location}
            image={character?.image}
            episode={character?.episode}
            info={{
              pages: 0,
              count: 0,
              next: "",
            }}
            results={[]}
          />
        </HeroContent>
      )}

      <Content>
        <div className="section-and-filter">
          <MoreSection
            icon={<SmileyBlank size={48} color={`var(--FONT-COLOR)`} />}
            text="personagens"
          />

          <Filter
            setCharacterListData={setCharacterListData}
            setInfoPage={setInfoPage}
            status={status}
            setStatus={setStatus}
            species={species}
            setSpecies={setSpecies}
            gender={gender}
            setGender={setGender}
          />
        </div>

        {characterListData && (
          <div className="characters">
            {characterListData?.map((character: CharacterProps) => (
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
        )}
      </Content>

      {!characterListData && (
        <h2 style={{ marginBottom: "64px" }}>
          <LinkBreak size={48} /> Nenhum resultado encontrado
        </h2>
      )}

      {infoPage?.pages > 1 && (
        <Paginate
          pageCount={infoPage?.pages}
          onPageChange={(selectedItem: { selected: number }) =>
            handleNewCharacterPage(selectedItem?.selected)
          }
        />
      )}
    </Container>
  );
};

export default Character;
