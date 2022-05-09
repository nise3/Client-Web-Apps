import React from 'react';
import {EditorAreaContainer} from './state/containers/EditorAreaContainer';
import MainArea from './layouts/MainArea';
import ViewHeader from './compontents/ViewHeader/ViewHeader';
import ViewRenderer from './compontents/CanvasRenderer/ViewRenderer';

function Certificate() {
  return (
    <EditorAreaContainer.Provider>
      <div className='editor-container-header'>
        <ViewHeader />
        <div className='editor-container'>
          <MainArea className='relative overflow-hidden' noScroll>
            <ViewRenderer />
          </MainArea>
        </div>
      </div>
    </EditorAreaContainer.Provider>
  );
}

export default Certificate;
