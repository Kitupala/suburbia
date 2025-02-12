import React, { FC } from "react";
import { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { PrismicText, SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { Skater } from "@/slices/TeamGrid/Skater";

export type TeamGridProps = SliceComponentProps<Content.TeamGridSlice>;

/**
 * Component for "TeamGrid" Slices.
 */
const TeamGrid: FC<TeamGridProps> = async ({ slice }) => {
  const client = createClient();
  const skaters = await client.getAllByType("skater");

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-navy"
    >
      <Heading as="h2" size="lg" className="mb-8 text-center text-white">
        <PrismicText field={slice.primary.heading} />
      </Heading>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {skaters.map((skater, index) => (
          <React.Fragment key={index}>
            {skater.data.first_name && <Skater skater={skater} />}
          </React.Fragment>
        ))}
      </div>
    </Bounded>
  );
};

export default TeamGrid;
