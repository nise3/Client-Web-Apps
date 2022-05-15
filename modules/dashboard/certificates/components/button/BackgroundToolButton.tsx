import React from 'react';
import BackgroundIcon from '../../icon/BackgroundIcon';
import SideMenuButton from '../ui/SideMenuButton';
import {MenuOption} from '../util/MenuOption';

interface Props {
  selectedItem: MenuOption;
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
}

function BackgroundToolButton({selectedItem, onClickHandler}: Props) {
  return (
    <SideMenuButton
      onClickHandler={onClickHandler}
      selected={MenuOption.BACKGROUND === selectedItem}
      icon={BackgroundIcon}>
      Background
    </SideMenuButton>
  );
}

export default BackgroundToolButton;
