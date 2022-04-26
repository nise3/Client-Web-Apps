import Konva from "konva";
import { atom } from "recoil";
import { EditorPanel } from "../../interfaces/Editor";
import { Template } from "../../interfaces/StageConfig";
// import { untrackedHistoryEffect } from "../effects/history";

export const activePanelState = atom<EditorPanel>({
  key: "activePanelState",
  default: EditorPanel.Settings,
  //   effects_UNSTABLE: [untrackedHistoryEffect],
});

export const selectedElementIdState = atom<string | undefined>({
  key: "selectedElementIdState",
  default: undefined,
  // effects_UNSTABLE: [untrackedHistoryEffect],
});
export const isLoadingState = atom({
  key: "isLoadingState",
  default: false,
});

export const highlightedElementIdState = atom<string | undefined>({
  key: "highlightedElementIdState",
  default: undefined,
});
export const ratioState = atom({
  key: "ratioState",
  default: 1,
});
