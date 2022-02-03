import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {FilePond, registerPlugin} from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import IntlMessages from '../../@crema/utility/IntlMessages';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import FilepondCSS from './FilepondCSS';

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
  defaultFileUrl?: string | Array<any> | null;
  acceptedFileTypes?: Array<string> | null;
  uploadedUrls?: any;
  allowMultiple?: boolean;
  height?: string;
  width?: string;
}

const StyledWrapper = styled('div')(() => ({...FilepondCSS}));

const FileUploadComponent: FC<FilepondComponentProps> = ({
  id,
  errorInstance,
  setValue,
  register,
  required,
  label,
  allowMultiple,
  acceptedFileTypes,
  defaultFileUrl,
  height,
  width,
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
      if (!Array.isArray(defaultFileUrl)) {
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
      } else {
      }
    }
  }, [defaultFileUrl]);
  const handleRemoveFile = useCallback((errorResponse, file) => {
    setValue(id, '');
  }, []);
  const filePondRef = useRef<any>(null);
  return (
    <StyledWrapper>
      <InputLabel required={required}>{label}</InputLabel>
      <FormControl fullWidth>
        <FilePond
          files={files}
          acceptedFileTypes={acceptedFileTypes ? acceptedFileTypes : []}
          onupdatefiles={setFiles}
          ref={filePondRef}
          allowMultiple={allowMultiple}
          onremovefile={handleRemoveFile}
          maxFiles={1}
          server={{
            process: {
              url: 'https://file.nise3.xyz/test',
              onload: (response: any) => {
                let res = JSON.parse(response);
                setValue(id, res?.url || '');
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
      {height && width && (
        <Box sx={{fontStyle: 'italic', fontWeight: 'bold', marginTop: '6px'}}>
          {`Please  upload Image with size ${width} px * ${height} px`}
        </Box>
      )}
    </StyledWrapper>
  );
};

export default FileUploadComponent;
