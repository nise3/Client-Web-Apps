import React from 'react';
import {RGBColor} from 'react-color';
import {useRecoilValue} from 'recoil';
import {Slider} from '@mui/material';
import {fromRgba, toRgba} from '../../../utils/color';
import {TextConfig} from '../../../interfaces/Shape';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import {elementPropsSelector} from '../../../state/selectors/elements';
import PanelColorPicker from '../../ui/PanelColorPicker';
import SideMenuSetting from '../../ui/SideMenuSetting';
import {isString} from 'util';
import {LineConfig} from 'konva/lib/shapes/Line';

interface Props {
  elementId: string;
}

function LineStrokeSetting({elementId}: Props) {
  const elementProps = useRecoilValue(
    elementPropsSelector<LineConfig>(elementId),
  );

  const {updateElementProps} = useElementsDispatcher();

  const handleChangescaleX = (scaleX: number | number[]) => {
    if (!(scaleX instanceof Array)) {
      updateElementProps<LineConfig>(elementId, {scaleX});
    }
  };

  const scaleX = elementProps.scaleX ?? 1;

  return (
    <SideMenuSetting label='Size' htmlFor='input-stro-color'>
      <div className='single-property-slider-input'>
        <Slider
          min={0.5}
          max={5}
          value={scaleX}
          step={0.5}
          onChange={(event, value: number | number[]) => {
            event.preventDefault();
            handleChangescaleX(value);
          }}
        />
        <span className='slider-container-value'>{scaleX}</span>
      </div>
    </SideMenuSetting>
  );
}

export default LineStrokeSetting;
