import React from 'react';
import BackgroundIcon from '../../icon/BackgroundIcon';
import SideMenuButton from './../SideMenuButton';

function ElementsToolButton() {
  return (
    <SideMenuButton onClick={() => {}} selected={false} icon={BackgroundIcon}>
      Elements
    </SideMenuButton>
  );
}

export default ElementsToolButton;
