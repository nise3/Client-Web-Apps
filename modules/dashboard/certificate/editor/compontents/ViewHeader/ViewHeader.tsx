import React, {useCallback, useState} from 'react';
import {Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import Router from 'next/router';
import {StageRefContainer} from '../../state/containers/StageRefContainer';
import {jsPDF} from 'jspdf';
// import useTemplateDispatcher from '../../state/dispatchers/template';
// import {downloadURI} from './../../utils/downloadUri';
function ViewHeader() {
  const [loading, setLoading] = useState<boolean>(false);
  const {getStageAreaRef} = StageRefContainer.useContainer();

  const handleClick = useCallback(() => {
    setLoading(true);
    const template = getStageAreaRef();
    // console.log(template);
    if (template) {
      const uri = template.toDataURL({pixelRatio: 4});
      const orientation =
        template.attrs.width > template.attrs.height ? 'l' : 'p';
      const doc = new jsPDF({
        orientation: orientation,
        unit: 'px',
        format: [template.attrs.width, template.attrs.height],
        compress: true,
      });
      //@ts-ignore
      doc.addImage(
        uri,
        'PNG',
        0,
        0,
        Number(template.attrs.width),
        Number(template.attrs.height),
        '',
        'FAST',
      );
      doc.save('certificate.pdf');
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, []);

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
            onClick={() => {
              handleClick();
            }}
            disabled={loading}>
            {!loading ? 'Download' : 'Downloading'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ViewHeader;
