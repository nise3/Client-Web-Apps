import React from 'react';
import TemplatesIcon from '../../icon/TemplateIcon';
import SideMenuButton from '../ui/SideMenuButton';
import {MenuOption} from '../util/MenuOption';
interface Props {
  selectedItem: MenuOption;
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
}

function TemplateToolButton({selectedItem, onClickHandler}: Props) {
  return (
    <SideMenuButton
      onClickHandler={onClickHandler}
      selected={MenuOption.TEMEPLATE === selectedItem}
      icon={TemplatesIcon}>
      Templates
    </SideMenuButton>
  );
}

export default TemplateToolButton;
