import { Metadata } from "next";
import { asImageSrc, Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage");
  const slices = bundleFeatureHighlightSlices(page.data.slices);

  return (
    <SliceZone
      slices={slices}
      components={{
        ...components,
        feature_highlight_bundle: ({
          slice,
        }: SliceComponentProps<FeatureHighlightBundleSlice>) => (
          <div>
            <SliceZone slices={slice.slices} components={components} />
          </div>
        ),
      }}
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      title: isFilled.keyText(page.data.meta_title)
        ? page.data.meta_title
        : undefined,
      description: isFilled.keyText(page.data.meta_description)
        ? page.data.meta_description
        : undefined,
      images: isFilled.image(page.data.meta_image)
        ? [asImageSrc(page.data.meta_image)]
        : undefined,
    },
  };
}

type FeatureHighlightBundleSlice = {
  id: string;
  slice_type: "feature_highlight_bundle";
  slices: Content.FeatureHighlightSlice[];
};

const bundleFeatureHighlightSlices = (
  slices: Content.HomepageDocumentDataSlicesSlice[],
) => {
  const result: (
    | Content.HomepageDocumentDataSlicesSlice
    | FeatureHighlightBundleSlice
  )[] = [];

  for (const slice of slices) {
    if (slice.slice_type !== "feature_highlight") {
      result.push(slice);
      continue;
    }

    const bundle = result.at(-1);
    if (bundle?.slice_type === "feature_highlight_bundle") {
      bundle.slices.push(slice);
    } else {
      result.push({
        id: `${slice.id}-bundle`,
        slice_type: "feature_highlight_bundle",
        slices: [slice],
      });
    }
  }

  return result;
};
