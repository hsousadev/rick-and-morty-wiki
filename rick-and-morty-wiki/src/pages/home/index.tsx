import { useContext } from "react";

import Hero from "./components/Hero";

import { GlobalContext } from "../../pages/_app";

import { Container, HeroContent } from "./styles";

const Home = () => {
  const { darkTheme } = useContext(GlobalContext);

  return (
    <Container>
      <HeroContent isDarkTheme={darkTheme}>
        <Hero />
      </HeroContent>
    </Container>
  );
};

export default Home;
