import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";

type Props = {};

export default async function Page({}: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-amber-100 lg:flex-row">
      <div className="relative aspect-square shrink-0 bg-[#3A414A] lg:aspect-auto lg:grow">
        <Link href="/" className="absolute left-6 top-6">
          <Logo className="h-12 text-white" />
        </Link>
      </div>
      <div className="bg-texture grow bg-zinc-900 text-white ~p-4/6 lg:w-96 lg:shrink-0 lg:grow-0">
        <Heading as="h1" size="sm" className="mb-6 mt-0">
          Build your board
        </Heading>

        <ButtonLink href="/" color="lime" icon="plus" aria-label="Add to cart">
          Add to cart
        </ButtonLink>
      </div>
    </div>
  );
}
