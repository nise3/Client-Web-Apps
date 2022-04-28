import React, {useState} from 'react';
import CanvasContainer from './components/CanvasContainer';
import EditorMenu from './components/EditorMenu';
import EditorMenuPanel from './components/EditorMenuPanel';
import {MenuOption} from './components/util/MenuOption';

function Editor() {
  const [selectedMenuOption, setSelectedMenuOption] = useState(MenuOption.TEXT);

  const changeMenuOtion = (id: any) => {
    return (e: MouseEvent) => {
      e.preventDefault();
      setSelectedMenuOption(id);
    };
  };

  return (
    <div className='editor-container'>
      <div className='side-panel'>
        <div className='inner-side-panel'>
          <EditorMenu
            selectedItem={selectedMenuOption}
            onChange={changeMenuOtion}
          />
          <EditorMenuPanel selectedItem={selectedMenuOption} />
        </div>
      </div>
      <CanvasContainer />
    </div>
  );
}

export default Editor;
