"use client";

import {
  ColorField,
  Content,
  ImageField,
  isFilled,
  KeyTextField,
} from "@prismicio/client";
import clsx from "clsx";
import { ComponentProps, ReactNode, useEffect } from "react";
import { Heading } from "@/components/Heading";
import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";
import { useCustomizerStore } from "@/store/customizerStore";
import { useRouter } from "next/navigation";

type Props = Pick<
  Content.BoardCustomizerDocumentData,
  "wheels" | "decks" | "metals"
> & { className?: string };

export const Controls = ({ wheels, decks, metals, className }: Props) => {
  const router = useRouter();

  const { wheel, deck, truck, bolt, setWheel, setDeck, setTruck, setBolt } =
    useCustomizerStore();

  useEffect(() => {
    const url = new URL(window.location.href);

    if (isFilled.keyText(wheel?.uid)) url.searchParams.set("wheel", wheel.uid);
    if (isFilled.keyText(deck?.uid)) url.searchParams.set("deck", deck.uid);
    if (isFilled.keyText(truck?.uid)) url.searchParams.set("truck", truck.uid);
    if (isFilled.keyText(bolt?.uid)) url.searchParams.set("bolt", bolt.uid);

    const newUrl = url.href;
    if (newUrl !== window.location.href) {
      router.replace(newUrl);
    }
  }, [router, wheel, deck, truck, bolt]);

  return (
    <div className={clsx("flex flex-col gap-6", className)}>
      <Options title="Deck" selectedName={deck?.uid}>
        {decks.map((item) => (
          <Option
            key={item.uid}
            imageField={item.texture}
            imgixParams={{
              rect: [20, 1550, 1000, 1000],
              width: 150,
              height: 150,
            }}
            selected={item.uid === deck?.uid}
            onClick={() => setDeck(item)}
          >
            {item.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Wheels" selectedName={wheel?.uid}>
        {wheels.map((item) => (
          <Option
            key={item.uid}
            imageField={item.texture}
            imgixParams={{
              rect: [20, 10, 850, 850],
              width: 150,
              height: 150,
            }}
            selected={item.uid === wheel?.uid}
            onClick={() => setWheel(item)}
          >
            {item.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Trucks" selectedName={truck?.uid}>
        {metals.map((item) => (
          <Option
            key={item.uid}
            colorField={item.color}
            selected={item.uid === truck?.uid}
            onClick={() => setTruck(item)}
          >
            {item.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Bolts" selectedName={bolt?.uid}>
        {metals.map((item) => (
          <Option
            key={item.uid}
            colorField={item.color}
            selected={item.uid === bolt?.uid}
            onClick={() => setBolt(item)}
          >
            {item.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
    </div>
  );
};

type OptionsProps = {
  title?: ReactNode;
  selectedName?: KeyTextField;
  children?: ReactNode;
};

function Options({ title, selectedName, children }: OptionsProps) {
  const formattedName = selectedName?.replace(/-/g, " ");

  return (
    <div>
      <div className="flex">
        <Heading as="h2" size="xs" className="mb-2">
          {title}
        </Heading>
        <p className="ml-3 text-zinc-300">
          <span className="select-none text-zinc-500">| </span>
          {formattedName}
        </p>
      </div>
      <ul className="mb-1 flex flex-wrap gap-2">{children}</ul>
    </div>
  );
}

type OptionProps = Omit<ComponentProps<"button">, "children"> & {
  selected: boolean;
  children: ReactNode;
  onClick?: () => void;
} & (
    | {
        imageField: ImageField;
        imgixParams?: PrismicNextImageProps["imgixParams"];
        colorField?: never;
      }
    | {
        colorField: ColorField;
        imageField?: never;
        imgixParams?: never;
      }
  );

function Option({
  children,
  selected,
  imageField,
  imgixParams,
  colorField,
  onClick,
}: OptionProps) {
  return (
    <li>
      <button
        className={clsx(
          "size-10 cursor-pointer rounded-full bg-black p-0.5 outline-2 outline-white",
          selected && "outline",
        )}
        onClick={onClick}
      >
        {imageField ? (
          <PrismicNextImage
            field={imageField}
            imgixParams={imgixParams}
            className="pointer-events-none h-full w-full rounded-full"
            alt=""
          />
        ) : (
          <div
            className="h-full w-full rounded-full"
            style={{ backgroundColor: colorField ?? undefined }}
          />
        )}
        <span className="sr-only">{children}</span>
      </button>
    </li>
  );
}
