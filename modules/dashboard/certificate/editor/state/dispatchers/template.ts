import Konva from "konva";
import { useRecoilCallback } from "recoil";
import { Dimensions, Template } from "../../interfaces/StageConfig";
import { isLoadingState, activePanelState, ratioState } from "../atoms/editor";
import { backgroundState } from "../atoms/template";
// import { templateSelector } from "../selectors/template";

function useTemplateDispatcher() {
  const updateBackground = useRecoilCallback(
    ({ set }) =>
      (background: Konva.ShapeConfig) => {
        set(backgroundState, (config) => ({ ...config, ...background }));
      },
    []
  );

  return {
    updateBackground,
  };
}

export default useTemplateDispatcher;
