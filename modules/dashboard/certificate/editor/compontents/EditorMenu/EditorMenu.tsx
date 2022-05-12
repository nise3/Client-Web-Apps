import React from 'react';
import SideMenu from '../ui/SideMenu';
import ElementsToolButton from './buttons/ElementsToolButton';
import ImageToolButton from './buttons/ImageToolButton';
import InputToolButton from './buttons/InputToolButton';
import Logo from './buttons/Logo';
import SettingsToolButton from './buttons/SettingsToolButton';
import TextToolButton from './buttons/TextToolButton';

function EditorMenu() {

  return (
    <SideMenu>
      <Logo />
      <div className='editor-menu'>
        <SettingsToolButton />
        <TextToolButton />
        <ImageToolButton />
        <ElementsToolButton />
        <InputToolButton />
      </div>
    </SideMenu>
  );
}

export default EditorMenu;
