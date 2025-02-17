"use client";

import { Suspense, useEffect, useRef } from "react";
import { asImageSrc, Content } from "@prismicio/client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  CameraControls,
  Environment,
  Preload,
  useTexture,
} from "@react-three/drei";
import { useCustomizerStore } from "@/store/customizerStore";
import { Skateboard } from "@/components/Skateboard";

const DEFAULT_WHEEL_TEXTURE = "/skateboard/SkateWheel.png";
const DEFAULT_DECK_TEXTURE = "/skateboard/Deck.webp";
const DEFAULT_TRUCK_COLOR = "#6F6E6A";
const DEFAULT_BOLT_COLOR = "#6F6E6A";
const ENVIRONMENT_COLOR = "#3B3A3A";

interface PreviewProps {
  defaults: {
    defaultWheel: Content.BoardCustomizerDocumentDataWheelsItem | undefined;
    defaultDeck: Content.BoardCustomizerDocumentDataDecksItem | undefined;
    defaultTruck: Content.BoardCustomizerDocumentDataMetalsItem | undefined;
    defaultBolt: Content.BoardCustomizerDocumentDataMetalsItem | undefined;
  };
  wheelTextureURLs: string[];
  deckTextureURLs: string[];
}

export const Preview = ({
  defaults,
  wheelTextureURLs,
  deckTextureURLs,
}: PreviewProps) => {
  const cameraControls = useRef<CameraControls>(null);
  const floorRef = useRef<THREE.Mesh>(null);
  const initializeDefaults = useCustomizerStore(
    (state) => state.initializeDefaults,
  );

  useEffect(() => {
    initializeDefaults(defaults);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { wheel, deck, truck, bolt } = useCustomizerStore();

  const wheelTextureURL = asImageSrc(wheel?.texture) ?? DEFAULT_WHEEL_TEXTURE;
  const deckTextureURL = asImageSrc(deck?.texture) ?? DEFAULT_DECK_TEXTURE;
  const truckColor = truck?.color ?? DEFAULT_TRUCK_COLOR;
  const boltColor = bolt?.color ?? DEFAULT_BOLT_COLOR;

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(0, 0.3, 0),
      new THREE.Vector3(1.5, 0.8, 0),
    );
  }, [deck]);

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(-0.12, 0.29, 0.57),
      new THREE.Vector3(0.1, 0.25, 0.9),
    );
  }, [truck]);

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(-0.08, 0.54, 0.64),
      new THREE.Vector3(0.09, 1, 0.9),
    );
  }, [wheel]);

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(-0.25, 0.3, 0.62),
      new THREE.Vector3(-0.5, 0.35, 0.8),
    );
  }, [bolt]);

  function setCameraControls(target: THREE.Vector3, pos: THREE.Vector3) {
    if (!cameraControls.current) return;

    cameraControls.current.setTarget(target.x, target.y, target.z, true);
    cameraControls.current.setPosition(pos.x, pos.y, pos.z, true);
  }

  function onCameraControlStart() {
    if (
      !cameraControls.current ||
      !floorRef.current ||
      cameraControls.current.colliderMeshes.length > 0
    )
      return;

    cameraControls.current.colliderMeshes = [floorRef.current];
  }

  return (
    <Canvas camera={{ position: [2.5, 1, 0], fov: 50 }} shadows>
      <Suspense fallback={null}>
        <Environment
          files={"/hdr/warehouse-512.hdr"}
          environmentIntensity={0.6}
        />
        <directionalLight
          castShadow
          lookAt={[0, 0, 0]}
          position={[1, 1, 1]}
          intensity={1.6}
        />
        <fog attach="fog" args={[ENVIRONMENT_COLOR, 3, 15]} />
        <color attach="background" args={[ENVIRONMENT_COLOR]} />
        <StageFloor />

        <mesh rotation={[-Math.PI / 2, 0, 0]} ref={floorRef}>
          <planeGeometry args={[6, 6]} />
          <meshBasicMaterial visible={false} />
        </mesh>
        <Skateboard
          wheelTextureURLs={wheelTextureURLs}
          wheelTextureURL={wheelTextureURL}
          deckTextureURLs={deckTextureURLs}
          deckTextureURL={deckTextureURL}
          truckColor={truckColor}
          boltColor={boltColor}
          pose="side"
        />
        <CameraControls
          ref={cameraControls}
          onStart={onCameraControlStart}
          minDistance={0.2}
          maxDistance={4}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

function StageFloor() {
  const normalMap = useTexture("/concrete-normal.avif");
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(30, 30);
  normalMap.anisotropy = 8;

  const material = new THREE.MeshStandardMaterial({
    roughness: 0.75,
    color: ENVIRONMENT_COLOR,
    normalMap,
  });

  return (
    <mesh
      castShadow
      receiveShadow
      material={material}
      position={[0, -0.005, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <circleGeometry args={[20, 32]} />
    </mesh>
  );
}
