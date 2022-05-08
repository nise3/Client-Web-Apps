import React from 'react';
import {EditorPanel} from '../../interfaces/Editor';
import SideMenuPanel from './../ui/SideMenuPanel';
import ShapeActions from './../ui/ShapeActions';
import ImageBlurSetting from './../EditorMenuPanel/ImageProperties/ImageBlurSetting';
import ImageFileSetting from './../EditorMenuPanel/ImageProperties/ImageFileSetting';
import ImageOpacitySetting from './../EditorMenuPanel/ImageProperties/ImageOpacitySetting';

interface Props {
  elementId: string;
}

function ImagePropertiesPanel({elementId}: Props) {
  return (
    <SideMenuPanel
      title='Image'
      previous={EditorPanel.Image}
      actions={<ShapeActions elementId={elementId} />}>
      <ImageFileSetting elementId={elementId} />
      <ImageOpacitySetting elementId={elementId} />
      <ImageBlurSetting elementId={elementId} />
    </SideMenuPanel>
  );
}

export default ImagePropertiesPanel;
