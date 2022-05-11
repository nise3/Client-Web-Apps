import React from 'react';
import {Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import Router from 'next/router';
import {StageRefContainer} from '../../state/containers/StageRefContainer';
import {jsPDF} from 'jspdf';
// import useTemplateDispatcher from '../../state/dispatchers/template';
// import {downloadURI} from './../../utils/downloadUri';
function ViewHeader() {
  const {getStageAreaRef} = StageRefContainer.useContainer();

  const handleClick = async () => {
    const template = getStageAreaRef();
    console.log(template);
    if (template) {
      console.log(template);
      const uri = template.toDataURL({pixelRatio: 8});
      const orientation =
        template.attrs.width > template.attrs.height ? 'l' : 'p';
      console.log(orientation);
      // downloadURI(uri, "certificate.png");
      const doc = new jsPDF({
        orientation: orientation,
        unit: 'px',
        format: [template.attrs.width, template.attrs.height],
      });
      doc.addImage(
        uri,
        0,
        0,
        Number(template.attrs.width),
        Number(template.attrs.height),
      );
      doc.save('certificate.pdf');
    }
  };
  return (
    <div className='editor-header'>
      <div className='editor-header-inner'>
        <div
          className='editor-header-inner-left'
          style={{justifyContent: 'flex-start'}}>
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
