import React from 'react';
import {Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import Router from 'next/router';
// import useTemplateDispatcher from '../../state/dispatchers/template';
// import {downloadURI} from './../../utils/downloadUri';

function ViewHeader() {
  const handleClick = async () => {
    console.log('Downloading Certificate');
  };
  return (
    <div className='editor-header'>
      <div className='editor-header-inner'>
        <div className='editor-header-inner-left'>
          <Button
            variant='outlined'
            startIcon={<ArrowBackIcon />}
            onClick={() => Router.back()}>
            Go Back
          </Button>
        </div>
        <div className='editor-header-inner-right'>
          <Button
            variant='outlined'
            startIcon={<SaveIcon />}
            onClick={handleClick}>
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ViewHeader;
