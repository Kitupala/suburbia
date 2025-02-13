"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Skateboard } from "@/components/Skateboard";

type Props = {
  deckTextureURL: string;
  wheelTextureURL: string;
  truckColor: string;
  boltColor: string;
};

export const InteractiveSkateboard = ({
  deckTextureURL,
  wheelTextureURL,
  truckColor,
  boltColor,
}: Props) => {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <Canvas
        className="min-h-[60rem] w-full"
        camera={{ position: [1.5, 1, 1.4], fov: 55 }}
      >
        <Suspense>
          <Scene
            deckTextureURL={deckTextureURL}
            wheelTextureURL={wheelTextureURL}
            truckColor={truckColor}
            boltColor={boltColor}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

const Scene = ({
  deckTextureURL,
  wheelTextureURL,
  truckColor,
  boltColor,
}: Props) => {
  return (
    <group>
      <OrbitControls />
      <Environment files="/hdr/warehouse-256.hdr" />

      <Skateboard
        wheelTextureURLs={[wheelTextureURL]}
        wheelTextureURL={wheelTextureURL}
        deckTextureURLs={[deckTextureURL]}
        deckTextureURL={deckTextureURL}
        truckColor={truckColor}
        boltColor={boltColor}
        constantWheelSpin
      />
      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
    </group>
  );
};
