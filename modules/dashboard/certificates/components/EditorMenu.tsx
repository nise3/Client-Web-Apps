import React from 'react';
import SideMenu from './ui/SideMenu';
import BackgroundToolButton from './button/BackgroundToolButton';
import ElementsToolButton from './button/ElementToolButton';
import TemplateToolButton from './button/TemplateToolButton';
import TextToolButton from './button/TextToolButton';
import {MenuOption} from './util/MenuOption';

interface Props {
  selectedItem: MenuOption;
  onChange: Function;
}

function EditorMenu({selectedItem, onChange}: Props) {
  return (
    <SideMenu>
      <div className='side-tabs-container'>
        <div className='side-tabs-inner'>
          <BackgroundToolButton
            selectedItem={selectedItem}
            onClickHandler={onChange(MenuOption.BACKGROUND)}
          />
          <TextToolButton
            selectedItem={selectedItem}
            onClickHandler={onChange(MenuOption.TEXT)}
          />
          <ElementsToolButton
            selectedItem={selectedItem}
            onClickHandler={onChange(MenuOption.ELEMENT)}
          />
          <TemplateToolButton
            selectedItem={selectedItem}
            onClickHandler={onChange(MenuOption.TEMEPLATE)}
          />
        </div>
      </div>
    </SideMenu>
  );
}

export default EditorMenu;
