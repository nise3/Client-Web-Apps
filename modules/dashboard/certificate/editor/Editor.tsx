import React, {useEffect} from 'react';
import EditorHeader from './compontents/EditorHeader/EditorHeader';
import EditorMenu from './compontents/EditorMenu/EditorMenu';
import EditorMenuPanel from './compontents/EditorMenuPanel/EditorMenuPanel';
import {EditorAreaContainer} from './state/containers/EditorAreaContainer';
import {StageRefContainer} from './state/containers/StageRefContainer';

import MainArea from './layouts/MainArea';
import dynamic from 'next/dynamic';
const CanvasRenderer = dynamic(
  () => import('./compontents/CanvasRenderer/CanvasRenderer'),
  {ssr: false},
);

function Editor() {
  return (
    <EditorAreaContainer.Provider>
      <StageRefContainer.Provider>
        <div className='editor-container'>
          <EditorMenu />
          <div className='editor-container-header'>
            <EditorHeader />
            <div className='editor-container-panel '>
              <div className='editor-container-panel-inner'>
                <EditorMenuPanel />
              </div>
              <MainArea className='relative overflow-hidden' noScroll>
                <CanvasRenderer />
              </MainArea>
            </div>
          </div>
        </div>
      </StageRefContainer.Provider>
    </EditorAreaContainer.Provider>
  );
}

export default Editor;
