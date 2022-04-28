import React from 'react';
import {useRecoilCallback} from 'recoil';
import Button from '../ui/Button';
import {ShapeType} from '../../interfaces/Shape';
import {dimensionsState} from '../../state/atoms/template';
import useElementsDispatcher from '../../state/dispatchers/elements';
import SideMenuPanel from '../ui/SideMenuPanel';
import {ShapeConfig} from 'konva/lib/Shape';
import {LineConfig} from 'konva/lib/shapes/Line';

function ElementToolPanel() {
  const {createElement} = useElementsDispatcher();

  const handleClickAddRectangle = useRecoilCallback(
    ({snapshot}) =>
      async () => {
        const dimensions = await snapshot.getPromise(dimensionsState);
        createElement<ShapeConfig>(ShapeType.Rectangle, {
          width: dimensions.width / 4,
          height: dimensions.height / 4,
          stroke: 'black',
          strokeWidth: 1,
          fill: 'transparent',
          strokeEnabled: true,
          listening: true,
        });
      },
    [createElement],
  );
  const addLineButtonClick = (value: string) => {
    return () => {
      let lineProperty: Partial<LineConfig> = {
        stroke: 'black',
        strokeWidth: 5,
      };
      if (value == 'dotted') {
        lineProperty.dash = [2, 3];
      } else if (value == 'dashed') {
        lineProperty.dash = [5, 3];
      }
      handleClickAddLine(lineProperty);
    };
  };
  const handleClickAddLine = useRecoilCallback(
    ({snapshot}) =>
      async (lineProperty: Partial<LineConfig>) => {
        const dimensions = await snapshot.getPromise(dimensionsState);
        createElement<LineConfig>(ShapeType.Line, {
          points: [
            dimensions.width / 4,
            dimensions.height / 2,
            dimensions.width / 2,
            dimensions.height / 2,
          ],
          ...lineProperty,
        });
      },
    [createElement],
  );

  return (
    <SideMenuPanel title='Elements'>
      <Button type='gray' onClick={handleClickAddRectangle} className='mb-2'>
        Rectangle
      </Button>
      <Button
        type='gray'
        className='text-property-right-button'
        onClick={addLineButtonClick('solid')}
        title='Align right'>
        Solid Line
      </Button>
      <Button
        type='gray'
        onClick={addLineButtonClick('dotted')}
        className='mb-2'>
        Dotted Line
      </Button>
      <Button
        type='gray'
        onClick={addLineButtonClick('dashed')}
        className='mb-2'>
        Dashed Line
      </Button>
    </SideMenuPanel>
  );
}

export default ElementToolPanel;
