import React from 'react';
import Button from '../ui/Button';
import {DefaultFonts} from '../../constants';
import {ShapeType, TextConfig} from '../../interfaces/Shape';
import useElementsDispatcher from '../../state/dispatchers/elements';
import SideMenuPanel from '../ui/SideMenuPanel';

const INPUT_PROPERTY = {
  text: 'Candidate Name',
  fontSize: 24,
  fontFamily: DefaultFonts.Regular,
  align: 'center',
  fillEnabled: true,
  fill: 'rgba(0, 0, 0, 1)',
  lineHeight: 1,
  shadowEnabled: false,
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  shadowBlur: 5,
  strokeEnabled: false,
  stroke: 'rgba(0, 0, 0, 1)',
  strokeWidth: 1,
  id: 'candidate-name',
};

function InputToolPanel() {
  const {createElement} = useElementsDispatcher();

  const handleClickAddText = (font: DefaultFonts) => () => {
    createElement<TextConfig>(ShapeType.Input, INPUT_PROPERTY);
  };

  return (
    <SideMenuPanel title='Input'>
      <div className='text-picker-button-container'>
        <Button
          type='gray'
          className='text-picker-button'
          style={{fontFamily: DefaultFonts.Regular, fontWeight: 'normal'}}
          onClick={handleClickAddText(DefaultFonts.Regular)}>
          Candidate Name
        </Button>
      </div>
    </SideMenuPanel>
  );
}

export default InputToolPanel;
