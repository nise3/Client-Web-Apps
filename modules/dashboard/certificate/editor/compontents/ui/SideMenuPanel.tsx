import {ArrowLeftIcon} from '@heroicons/react/outline';
import React from 'react';
import {useSetRecoilState} from 'recoil';
import {EditorPanel} from '../../interfaces/Editor';
import {activePanelState} from '../../state/atoms/editor';
import {Button, IconButton} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
interface Props {
  children?: React.ReactNode;
  title?: React.ReactText;
  className?: string;
  actions?: React.ReactNode;
  previous?: EditorPanel;
}

function SideMenuPanel({children, title, className, actions, previous}: Props) {
  const setActivePanel = useSetRecoilState(activePanelState);

  const handleClickBack = () => {
    if (previous) {
      setActivePanel(previous);
    }
  };

  return (
    <div className='side-menu-panel'>
      <div className='side-menu-panel-header'>
        {previous && (
          <div className='side-menu-panel-prev-icon'>
            <IconButton
              aria-label='delete'
              size='small'
              onClick={handleClickBack}
              sx={{
                width: '1rem',
                height: '1rem',
                padding: '.25rem',
              }}
              disableRipple>
              <KeyboardBackspaceIcon />
            </IconButton>
          </div>
        )}
        <h2 className='side-menu-panel-text-icon'>{title}</h2>
      </div>
      <div className='side-menu-panel-content'>{children}</div>
    </div>
  );
}

export default SideMenuPanel;
