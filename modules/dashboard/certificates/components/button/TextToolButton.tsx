import React from 'react';
import TextIcon from '../../icon/TextIcon';
import SideMenuButton from '../ui/SideMenuButton';
import {MenuOption} from '../util/MenuOption';
interface Props {
  selectedItem: MenuOption;
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
}
function TextToolButton({selectedItem, onClickHandler}: Props) {
  return (
    <SideMenuButton
      onClickHandler={onClickHandler}
      selected={MenuOption.TEXT === selectedItem}
      icon={TextIcon}>
      Text
    </SideMenuButton>
  );
}

export default TextToolButton;
