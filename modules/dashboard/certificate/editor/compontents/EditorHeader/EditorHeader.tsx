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

function EditorHeader() {
  const {setCurrentTemplateToSave} = useTemplateDispatcher();
  const {stageAreaRef} = StageRefContainer.useContainer();
  const [selectedResultType, setSelectedResultType] = useState<string | null>(
    null,
  );
  let options: [] = [];
  const {data: resultTypes, isLoading: isLoading} = useFetchResultTypes();
  const {errorStack} = useNotiStack();

  useEffect(() => {
    if (resultTypes) {
      options = resultTypes.map((type: any) => {
        return type.title;
      });
    }
  }, [resultTypes]);
  const onChangeAutocomplete = (event: any, newValue: string | null) => {
    event.preventDefault();
    setSelectedResultType(newValue);
  };
  const handleClick = async () => {
    console.log('save click');
    if (selectedResultType && stageAreaRef.current) {
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
        result_type: String(
          resultTypes.filter((type: any) => type.title == selectedResultType)[0]
            .id,
        ),
        purpose_name: 'Batch',
        purpose_id: 5,
      };
      console.log(data);
      try {
        await createCertificate(data);
      } catch {
        errorStack('Something went wrong');
      }
    } else {
      errorStack('Please choose a result type');
    }
  };
  return (
    <div className='editor-header'>
      <div className='editor-header-inner'>
        <Button variant='outlined' startIcon={<ArrowBackIcon />}>
          Go Back
        </Button>

        {/* {isLoading ? (
            <div style={{width: '200px'}}>
              <TextInputSkeleton />
            </div>
          ) : (
            <Autocomplete
              value={selectedResultType}
              onChange={onChangeAutocomplete}
              id='result-type-select'
              options={options}
              sx={{width: 200, marginRight: '4px'}}
              renderInput={(params) => (
                <TextField {...params} label='Result Type' />
              )}
            />
          )} */}

        <Button
          variant='outlined'
          startIcon={<SaveIcon />}
          onClick={handleClick}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default EditorHeader;
