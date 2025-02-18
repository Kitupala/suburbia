"use client";

import { useProgress } from "@react-three/drei";
import clsx from "clsx";
import { Logo } from "@/components/Logo";

const Loading = () => {
  const { progress } = useProgress();

  return (
    <div
      className={clsx(
        "absolute inset-0 grid place-content-center bg-brand-navy font-sans text-[15vh] text-white transition-opacity duration-1000",
        progress >= 100 ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <Logo className="h-[15vh] animate-squiggle text-brand-pink" />
      <p className="w-full animate-squiggle content-center text-center leading-none text-brand-lime">
        LOADING...
      </p>
    </div>
  );
};

export default Loading;
