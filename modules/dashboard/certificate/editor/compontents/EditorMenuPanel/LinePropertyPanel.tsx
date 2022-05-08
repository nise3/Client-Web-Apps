import React from 'react';
import {EditorPanel} from '../../interfaces/Editor';
import ShapeActions from '../ui/ShapeActions';
import SideMenuPanel from '../ui/SideMenuPanel';
import LineSizeSetting from './LineProperties/LineSizeSetting';
import LineStrokeSetting from './LineProperties/LineStrokeSetting';
import LineStyleSetting from './LineProperties/LineStyleSetting';

interface Props {
  elementId: string;
}

function LinePropertiesPanel({elementId}: Props) {
  return (
    <SideMenuPanel
      title='Line'
      previous={EditorPanel.Text}
      actions={<ShapeActions elementId={elementId} />}>
      <LineStrokeSetting elementId={elementId} />
      <LineSizeSetting elementId={elementId} />
      <LineStyleSetting elementId={elementId} />
    </SideMenuPanel>
  );
}

export default LinePropertiesPanel;
