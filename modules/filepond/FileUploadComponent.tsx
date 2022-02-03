import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {FilePond, registerPlugin} from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import IntlMessages from '../../@crema/utility/IntlMessages';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import FilepondCSS from './FilepondCSS';
import {FILE_SERVER_FILE_VIEW_ENDPOINT, FILE_SERVER_UPLOAD_ENDPOINT} from '../../@softbd/common/apiRoutes';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
);

interface FilepondComponentProps {
  id: string;
  errorInstance: any;
  setValue: any;
  register: any;
  required?: boolean;
  label: string | React.ReactNode;
  defaultFileUrl?: string | null;
  acceptedFileTypes?: any;
  allowMultiple?: boolean;
  uploadedUrls?: any;
}

const StyledWrapper = styled('div')(() => ({...FilepondCSS}));

const FileUploadComponent: FC<FilepondComponentProps> = ({
  id,
  errorInstance,
  setValue,
  register,
  required,
  label,
  defaultFileUrl,
  allowMultiple,
  acceptedFileTypes = [],
  uploadedUrls,
}) => {
  let errorObj = errorInstance?.[id];
  const reg = new RegExp('(.*)\\[(.*?)]', '');
  const matches = id.match(reg);
  if (matches) {
    errorObj = errorInstance?.[matches[1]]?.[matches[2]];
  }
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    if (defaultFileUrl && defaultFileUrl.length) {
      let source = defaultFileUrl.replace(
        'https://file.nise3.xyz/uploads/',
        '',
      );

      let initFile = [
        {
          source: source,

          //  set type to local to indicate an already uploaded file
          options: {
            type: 'local',
          },
        },
      ];
      setFiles(initFile);
    }
  }, [defaultFileUrl]);

  const handleRemoveFile = useCallback((errorResponse, file) => {
    if (allowMultiple) {
      setValue(id, []);
    } else {
      setValue(id, '');
    }
  }, []);
  const filePondRef = useRef<any>(null);

  return (
    <StyledWrapper>
      <InputLabel required={required}>{label}</InputLabel>
      <FormControl fullWidth>
        <FilePond
          files={files}
          onupdatefiles={setFiles}
          ref={filePondRef}
          allowMultiple={allowMultiple}
          onremovefile={handleRemoveFile}
          acceptedFileTypes={acceptedFileTypes}
          maxParallelUploads={1}
          maxFiles={50}
          server={{
            process: {
              url: 'https://file.nise3.xyz/test',
              onload: (response: any) => {
                let res = JSON.parse(response);
                console.log('res?.filePath', res?.url);
                if (!allowMultiple) {
                  setValue(id, res?.url || '');
                } else {
                  setValue(id, [...uploadedUrls, res?.url]);
                }
                console.log('uploadedurl: ', uploadedUrls);
                return 1;
              },
            },
            load: {
              url: 'https://file.nise3.xyz/uploads/',
            },
          }}
          styleProgressIndicatorPosition={'center'}
          name='files'
          /* credits={false}*/
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Upload</span>'
        />
        <TextField
          id={id}
          type={'hidden'}
          {...register(id)}
          sx={{display: 'none'}}
        />
        <FormHelperText
          sx={{color: 'error.main', marginLeft: '15px', marginTop: '-10px'}}>
          {' '}
          {errorObj && errorObj.message ? (
            errorObj.message.hasOwnProperty('key') ? (
              <IntlMessages
                id={errorObj.message.key}
                values={errorObj.message?.values || {}}
              />
            ) : (
              errorObj.message
            )
          ) : (
            ''
          )}
        </FormHelperText>
      </FormControl>
    </StyledWrapper>
  );
};

export default FileUploadComponent;
