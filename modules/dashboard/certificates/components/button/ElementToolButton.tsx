import React from 'react';
import ElementIcon from '../../icon/ElementIcon';
import SideMenuButton from '../ui/SideMenuButton';
import {MenuOption} from '../util/MenuOption';

interface Props {
  selectedItem: MenuOption;
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
}
function ElementsToolButton({selectedItem, onClickHandler}: Props) {
  return (
    <SideMenuButton
      onClickHandler={onClickHandler}
      selected={MenuOption.ELEMENT === selectedItem}
      icon={ElementIcon}>
      Elements
    </SideMenuButton>
  );
}

export default ElementsToolButton;
