import React from 'react';
import {EditorPanel} from '../../interfaces/Editor';
import SideMenuPanel from '../ui/SideMenuPanel';

import FontStyleSetting from './TextProperties/FontStyleSetting';
import TextAlignmentSetting from './TextProperties/TextAlignmentSetting';
import TextContentsSetting from './TextProperties/TextContentSetting';
import TextFillSetting from './TextProperties/TextFillSetting';
import TextStrokeSetting from './TextProperties/TextStrokeSetting';
import TextShadowSetting from './TextProperties/TextShadowSetting';
import LineHeightSetting from './TextProperties/LineHeightSetting';
import TextSizeSetting from './TextProperties/TextSizeSetting';
import ShapeActions from '../ui/ShapeActions';

interface Props {
  elementId: string;
}

function TextPropertiesPanel({elementId}: Props) {
  return (
    <SideMenuPanel
      title='Text'
      previous={EditorPanel.Text}
      actions={<ShapeActions elementId={elementId} />}>
      <TextContentsSetting elementId={elementId} />
      <div className='text-property-panel-inner'>
        <FontStyleSetting elementId={elementId} />
        <TextSizeSetting elementId={elementId} />
      </div>
      <div className='text-property-panel-inner'>
        <TextAlignmentSetting elementId={elementId} />
        <LineHeightSetting elementId={elementId} />
      </div>
      <TextFillSetting elementId={elementId} />
      <TextStrokeSetting elementId={elementId} />
      <TextShadowSetting elementId={elementId} />
    </SideMenuPanel>
  );
}

export default TextPropertiesPanel;
