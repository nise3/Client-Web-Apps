import React from 'react';

function TextEditPanel() {
  return (
    <div className='text-edit-panel'>
      <div className='text-edit-panel-inner'>
        <button
          type='button'
          className='bp4-button bp4-minimal text-button-text-header'>
          <span className='bp4-button-text'>Create header</span>
        </button>
        <button
          type='button'
          className='bp4-button bp4-minimal text-button-text-subheader'>
          <span className='bp4-button-text'>Create sub header</span>
        </button>
        <button
          type='button'
          className='bp4-button bp4-minimal text-button-text-body'>
          <span className='bp4-button-text'>Create body text</span>
        </button>
      </div>
    </div>
  );
}

export default TextEditPanel;
