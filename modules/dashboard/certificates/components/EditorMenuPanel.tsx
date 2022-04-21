import Menu from '@mui/icons-material/Menu';
import {selectorAll} from 'd3';
import React, {useCallback} from 'react';
import PrimaryJobInformation from '../../jobLists/jobPost/steps/PrimaryJobInformation';
import TextEditMenu from './EditorMenuPanel/TextEditPanel';
import {MenuOption} from './util/MenuOption';

interface Props {
  selectedItem: MenuOption;
}

function EditorMenuPanel({selectedItem}: Props) {
  const GetEditorMenuPanel = useCallback(() => {
    if (selectedItem) {
      switch (selectedItem) {
        case MenuOption.TEXT:
          return <TextEditMenu />;
        default:
          return <>Yet To Implementend</>;
      }
    } else {
      return <></>;
    }
  }, [selectedItem]);

  return (
    <div className='side-panel-menu-container'>{GetEditorMenuPanel()} </div>
  );
}

export default EditorMenuPanel;
