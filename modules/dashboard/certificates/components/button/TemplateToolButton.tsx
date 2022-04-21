import React from 'react';
import ElementIcon from '../../icon/ElementIcon';
import SideMenuButton from './../SideMenuButton';

function ElementsToolButton() {
  return (
    <SideMenuButton onClick={() => {}} selected={false} icon={ElementIcon}>
      Elements
    </SideMenuButton>
  );
}

export default ElementsToolButton;
