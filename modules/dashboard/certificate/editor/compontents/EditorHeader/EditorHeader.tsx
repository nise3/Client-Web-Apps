import React, {useState} from 'react';
import {Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import useTemplateDispatcher from '../../state/dispatchers/template';
import {toTemplateJSON} from './../../utils/template';
import {createCertificate} from './../../../../../../services/CertificateAuthorityManagement/CertificateService';

function EditorHeader() {
  const {setCurrentTemplateToSave} = useTemplateDispatcher();

  const handleClick = async () => {
    console.log('save click');
    const template = await setCurrentTemplateToSave();
    const templateJson = toTemplateJSON(template);
    const data = {
      template: templateJson,
      title_en: 'Cerificate 1',
      title: 'Certificate',
      result_type: 'Number',
      // accessor_type: 'Trainer',
      // accessor_id: 123,
      purpose_name: 'Batch',
      purpose_id: 5,
    };
    try {
      await createCertificate(data);
    } catch {
      console.log('try again');
    }
  };
  return (
    <div className='editor-header'>
      <div className='editor-header-inner'>
        <div className='editor-header-inner-left'>
          <Button variant='outlined' startIcon={<ArrowBackIcon />}>
            Go Back
          </Button>
        </div>
        <div className='editor-header-inner-right'>
          <Button
            variant='outlined'
            startIcon={<SaveIcon />}
            onClick={handleClick}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditorHeader;
