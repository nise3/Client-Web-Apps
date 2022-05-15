import React from 'react';
import Canvas from '../canvas/Canvas';
import Toolbar from './../canvas/Toolbar';

function StageContainer() {
  return (
    <div className='stage-container'>
      <Toolbar />
      <Canvas />
    </div>
  );
}

export default StageContainer;
