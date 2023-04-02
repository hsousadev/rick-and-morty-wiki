import smoothScroll from "@/shared/utils/smoothScroll";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Hero from "@/shared/components/Hero";

import { MonitorPlay } from "@phosphor-icons/react";

import { LocationProps, LocationListProps } from "./interfaces";

import { Container, Content, HeroContent } from "./styles";
import MoreSection from "@/shared/components/MoreSection";
import Paginate from "@/shared/components/Paginate";
import LocationCard from "@/shared/components/LocationCard";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps() {
  const res = await fetch("https://rickandmortyapi.com/api/location");
  const episodeList = await res.json();
  const results = episodeList.results;
  const info = episodeList.info;

  return {
    props: {
      results,
      info,
    },
  };
}

const Location = ({ results, info }: LocationListProps) => {
  const router = useRouter();
  const { location_slug } = router.query;

  const [location, setLocation] = useState<LocationProps>();
  const [locationListData, setLocationListData] = useState(results);

  const handleNewLocationPage = async (page: number) => {
    smoothScroll("more-section");

    const pageNumber = page + 1;
    const res = await fetch(
      `https://rickandmortyapi.com/api/location/?page=${pageNumber}`
    );
    const newEpisodePageList = await res.json();
    setLocationListData(newEpisodePageList?.results);
  };

  useEffect(() => {
    const getLocationRequested = async () => {
      const res = await fetch(
        `https://rickandmortyapi.com/api/location/${location_slug}`
      );

      const locationResquested = await res.json();

      setLocation(locationResquested);
    };

    getLocationRequested();
  }, [location_slug]);

  return (
    <Container>
      {location && (
        <HeroContent>
          <Hero
            id={location.id}
            name={location.name}
            type={location.type}
            dimension={location.dimension}
            residents={location.residents}
          />
        </HeroContent>
      )}

      <Content>
        <MoreSection
          icon={<MonitorPlay size={48} color={`var(--FONT-COLOR)`} />}
          text="Localizações"
        />

        <div className="locations">
          {locationListData?.map((location: LocationProps) => (
            <LocationCard
              id={location.id}
              name={location.name}
              type={location.type}
            />
          ))}
        </div>
      </Content>

      <Paginate
        pageCount={info?.pages}
        onPageChange={(selectedItem: { selected: number }) =>
          handleNewLocationPage(selectedItem?.selected)
        }
      />
    </Container>
  );
};

export default Location;