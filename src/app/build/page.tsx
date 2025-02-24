import { createClient } from "@/prismicio";

import { Logo } from "@/components/Logo";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";
import Link from "next/link";
import { Preview } from "@/app/build/Preview";
import { asImageSrc } from "@prismicio/client";
import { Controls } from "@/app/build/Controls";
import Loading from "@/app/build/Loading";

type SearchParams = {
  wheel?: string;
  deck?: string;
  truck?: string;
  bolt?: string;
};

export default async function Page(props: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const client = createClient();
  const customizerSettings = await client.getSingle("board_customizer");
  const { wheels, decks, metals } = customizerSettings.data;

  const defaults = {
    defaultWheel:
      wheels.find((wheel) => wheel.uid === searchParams.wheel) ?? wheels[0]!,
    defaultDeck:
      decks.find((deck) => deck.uid === searchParams.deck) ?? decks[0]!,
    defaultTruck:
      metals.find((metal) => metal.uid === searchParams.truck) ?? metals[0]!,
    defaultBolt:
      metals.find((metal) => metal.uid === searchParams.bolt) ?? metals[0]!,
  };

  const wheelTextureURLs = wheels
    .map((texture) => asImageSrc(texture.texture))
    .filter((url): url is string => Boolean(url));

  const deckTextureURLs = decks
    .map((texture) => asImageSrc(texture.texture))
    .filter((url): url is string => Boolean(url));

  return (
    <div className="flex min-h-screen flex-col bg-amber-100 lg:flex-row">
      <div className="relative aspect-square shrink-0 bg-[#3A414A] lg:aspect-auto lg:grow">
        <div className="absolute inset-0">
          <Preview
            defaults={defaults}
            wheelTextureURLs={wheelTextureURLs}
            deckTextureURLs={deckTextureURLs}
          />
        </div>
        <Link href="/" className="absolute left-6 top-6">
          <Logo className="h-12 text-white" />
        </Link>
      </div>
      <div className="bg-texture grow bg-zinc-900 text-white ~p-4/6 lg:w-96 lg:shrink-0 lg:grow-0">
        <Heading as="h1" size="sm" className="mb-6 mt-0">
          Build your board
        </Heading>
        <Controls
          wheels={wheels}
          decks={decks}
          metals={metals}
          className="mb-6"
        />

        <ButtonLink href="/" color="lime" icon="plus" aria-label="Add to cart">
          Add to cart
        </ButtonLink>
      </div>
      <Loading />
    </div>
  );
}
