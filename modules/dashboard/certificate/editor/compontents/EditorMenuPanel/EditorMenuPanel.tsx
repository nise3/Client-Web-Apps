import React from "react";
import { useRecoilValue } from "recoil";
import { EditorPanel } from "../../interfaces/Editor";
import {
  activePanelState,
  selectedElementIdState,
} from "../../state/atoms/editor";
import SideMenuPanel from "../ui/SideMenuPanel";
import ElementToolPanel from "./ElementMenuPanel";
import SettingsToolPanel from "./SettingsToolPanel/SettingsToolPanel";
import TextPropertiesPanel from "./TextPropertyPanel";
import TextToolPanel from "./TextToolPanel";

function EditorMenuPanel() {
  const activePanel = useRecoilValue(activePanelState);
  const selectedElementId = useRecoilValue(selectedElementIdState);

  if (selectedElementId) {
    switch (activePanel) {
      case EditorPanel.TextProperties:
        return <TextPropertiesPanel elementId={selectedElementId} />;
    }
  }

  switch (activePanel) {
    case EditorPanel.Settings:
      return <SettingsToolPanel />;
    case EditorPanel.Text:
      return <TextToolPanel />;
    // case EditorPanel.Image:
    //   return <ImageToolPanel />;
    case EditorPanel.Elements:
      return <ElementToolPanel />;
    default:
      return <SideMenuPanel />;
  }
}

export default EditorMenuPanel;
