import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { ButtonLink } from "@/components/ButtonLink";

type Props = {
  skater: Content.SkaterDocument;
};

export const Skater = ({ skater }: Props) => {
  return (
    <div className="group relative flex flex-col items-center gap-4">
      <div className="stack-layout overflow-hidden rounded-md border-2 border-brand-gray/30">
        <PrismicNextImage
          field={skater.data.photo_background}
          width={500}
          imgixParams={{ q: 20 }}
          alt=""
          className="scale-110 transform transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:brightness-90 group-hover:saturate-[.8]"
        />
        <PrismicNextImage
          field={skater.data.photo_foreground}
          width={500}
          alt=""
          className="transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
        />
        <div className="relative h-48 w-full place-self-end bg-gradient-to-t from-black via-transparent to-transparent" />
        <h3 className="relative grid place-self-end justify-self-start p-2 font-sans text-brand-gray ~text-2xl/3xl">
          <span className="mb-[-.3em] block">{skater.data.first_name}</span>
          <span className="block">{skater.data.last_name}</span>
        </h3>
      </div>
      <ButtonLink
        field={skater.data.customizer_link}
        size="sm"
        aria-label="Build their board"
      >
        Build their board
      </ButtonLink>
    </div>
  );
};
