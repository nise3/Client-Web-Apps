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
          listening: true,
          strokeScaleEnabled: false,
        });
      },
    [createElement],
  );

  const handleClickAddLine = useRecoilCallback(
    ({snapshot}) =>
      async () => {
        createElement<LineConfig>(ShapeType.Line, {
          points: [5, 70, 300, 70],
          stroke: 'rgba(2,2,55,.5)',
          strokeWidth: 2,
          dash: [],
          strokeScaleEnabled: false,
          scaleY: 3,
        });
      },
    [createElement],
  );

  return (
    <SideMenuPanel title='Elements'>
      <div className='text-picker-button-container'>
        <Button
          type='gray'
          onClick={handleClickAddRectangle}
          className='text-picker-button'>
          Rectangle
        </Button>
        <Button
          type='gray'
          className='text-picker-button'
          onClick={handleClickAddLine}
          title='Align right'>
          Line
        </Button>
      </div>
    </SideMenuPanel>
  );
}

export default ElementToolPanel;
