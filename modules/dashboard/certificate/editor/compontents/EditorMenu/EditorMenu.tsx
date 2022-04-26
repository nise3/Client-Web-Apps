import React from "react";
import ElementsToolButton from "./buttons/ElementsToolButton";
import ImageToolButton from "./buttons/ImageToolButton";
import SettingsToolButton from "./buttons/SettingsToolButton";
import TextToolButton from "./buttons/TextToolButton";
import Logo from "./buttons/Logo";
import SideMenu from "../ui/SideMenu";
import { useRecoilValue } from "recoil";
import { ratioState } from "../../state/atoms/editor";

function EditorMenu() {
  const ratio = useRecoilValue(ratioState);

  return (
    <SideMenu>
      <Logo />
      <div className="editor-menu">
        <SettingsToolButton />
        <TextToolButton />
        <ImageToolButton />
        <ElementsToolButton />
      </div>
    </SideMenu>
  );
}

export default EditorMenu;
