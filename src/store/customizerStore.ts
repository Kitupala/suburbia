import { create } from "zustand";
import { Content } from "@prismicio/client";

type CustomizerState = {
  wheel?: Content.BoardCustomizerDocumentDataWheelsItem;
  deck?: Content.BoardCustomizerDocumentDataDecksItem;
  truck?: Content.BoardCustomizerDocumentDataMetalsItem;
  bolt?: Content.BoardCustomizerDocumentDataMetalsItem;
  setWheel: (wheel: Content.BoardCustomizerDocumentDataWheelsItem) => void;
  setDeck: (deck: Content.BoardCustomizerDocumentDataDecksItem) => void;
  setTruck: (truck: Content.BoardCustomizerDocumentDataMetalsItem) => void;
  setBolt: (bolt: Content.BoardCustomizerDocumentDataMetalsItem) => void;
  initializeDefaults: (defaults: InitialCustomizerState) => void;
};

export interface InitialCustomizerState {
  defaultWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
  defaultDeck?: Content.BoardCustomizerDocumentDataDecksItem;
  defaultTruck?: Content.BoardCustomizerDocumentDataMetalsItem;
  defaultBolt?: Content.BoardCustomizerDocumentDataMetalsItem;
}

export const useCustomizerStore = create<CustomizerState>()((set) => ({
  wheel: undefined,
  deck: undefined,
  truck: undefined,
  bolt: undefined,
  setWheel: (wheel) => set({ wheel }),
  setDeck: (deck) => set({ deck }),
  setTruck: (truck) => set({ truck }),
  setBolt: (bolt) => set({ bolt }),
  initializeDefaults: (defaults) =>
    set({
      wheel: defaults.defaultWheel,
      deck: defaults.defaultDeck,
      truck: defaults.defaultTruck,
      bolt: defaults.defaultBolt,
    }),
}));
