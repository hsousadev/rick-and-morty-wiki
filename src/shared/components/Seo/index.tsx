import Head from "next/head";

type SeoProps = {
  title: string;
  description: string;
  image?: string;
};

const DEFAULT_IMAGE =
  "https://rickandmortyapi.com/api/character/avatar/1.jpeg";

export default function Seo({ title, description, image = DEFAULT_IMAGE }: SeoProps) {
  const fullTitle = title.includes("Rick and Morty")
    ? title
    : `${title} | Rick and Morty Wiki`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" href="/favicon.png" type="image/png" />
      <link rel="shortcut icon" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />
    </Head>
  );
}
