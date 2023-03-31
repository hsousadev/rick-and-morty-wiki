import React from "react";

import { Container } from "./styles";

export async function getStaticProps() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const character = await res.json();

  return {
    props: {
      character,
    },
  };
}

const Character = ({ character }: any) => {
  return <Container>Character</Container>;
};

export default Character;
