import React, {useEffect, useState} from 'react';
import {Button, Autocomplete, TextField} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import useTemplateDispatcher from '../../state/dispatchers/template';
import {toTemplateJSON} from './../../utils/template';
import {createCertificate} from './../../../../../../services/CertificateAuthorityManagement/CertificateService';
import {StageRefContainer} from '../../state/containers/StageRefContainer';
import TextInputSkeleton from '../../../../../../@softbd/elements/display/skeleton/TextInputSkeleton/TextInputSkeleton';
import {useFetchResultTypes} from '../../../../../../services/CertificateAuthorityManagement/hooks';

import useNotiStack from './../../../../../../@softbd/hooks/useNotifyStack';
import {processServerSideErrors} from '../../../../../../@softbd/utilities/validationErrorHandler';
function EditorHeader() {
  const {setCurrentTemplateToSave} = useTemplateDispatcher();
  const {stageAreaRef} = StageRefContainer.useContainer();
  const [selectedResultType, setSelectedResultType] = useState<string | null>(
    null,
  );
  console.log(selectedResultType);
  const {data: resultTypes, isLoading: isLoading} = useFetchResultTypes();
  const {errorStack} = useNotiStack();

  const onChangeAutocomplete = (event: any, newValue: string | null) => {
    event.preventDefault();
    setSelectedResultType(newValue);
  };

  const handleClick = async () => {
    console.log('save click');
    if (selectedResultType) {
      const template = await setCurrentTemplateToSave();
      const templateJson = toTemplateJSON(template);
      let stageJson;
      if (stageAreaRef.current) {
        stageJson = stageAreaRef.current.toJSON();
      }
      const dataJson = {
        template: templateJson,
        stage: stageJson,
      };
      const data = {
        template: JSON.stringify(dataJson),
        title_en: 'Cerificate 1',
        title: 'Certificate',
        result_type: 5,
        purpose_name: 'Batch',
        purpose_id: 5,
      };
      try {
        await createCertificate(data);
      } catch {}
    } else {
      errorStack('Please choose a result type');
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
          {isLoading ? (
            <TextInputSkeleton />
          ) : (
            <Autocomplete
              value={selectedResultType}
              onChange={onChangeAutocomplete}
              id='result-type-select'
              options={resultTypes.map((type: any) => {
                return type.title;
              })}
              sx={{width: 300}}
              renderInput={(params) => (
                <TextField {...params} label='Result Type' />
              )}
            />
          )}
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
