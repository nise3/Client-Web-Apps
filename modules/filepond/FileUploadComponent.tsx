import React, {FC, useEffect, useRef, useState} from 'react';
import {FilePond, registerPlugin} from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import IntlMessages from '../../@crema/utility/IntlMessages';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
} from '@mui/material';
import {styled} from "@mui/material/styles";
import FilepondCSS from "./FilepondCSS";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface FilepondComponentProps {
  id: string;
  errorInstance: any;
  setValue: any;
  register: any;
  required: boolean;
  label: string | React.ReactNode;
  defaultFileUrl?: string | null;
}

const StyledWrapper = styled('div')(() => ({...FilepondCSS}))

const FileUploadComponent: FC<FilepondComponentProps> = ({
  id,
  errorInstance,
  setValue,
  register,
  required,
  label,
  defaultFileUrl,
}) => {
  let errorObj = errorInstance?.[id];
  const reg = new RegExp('(.*)\\[(.*?)]', '');
  const matches = id.match(reg);
  if (matches) {
    errorObj = errorInstance?.[matches[1]]?.[matches[2]];
  }
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    if (defaultFileUrl) {
      let initFile = [
        {
          source: '80',

          //  set type to local to indicate an already uploaded file
          options: {
            type: 'local',
          },
        },
      ];
      setFiles(initFile);
    }
  }, [defaultFileUrl]);

  const filePondRef = useRef<any>(null);

  return (
    <StyledWrapper>
      <InputLabel required={required}>{label}</InputLabel>
      <FormControl fullWidth>
        <FilePond
          files={files}
          onupdatefiles={setFiles}
          ref={filePondRef}
          allowMultiple={false}
          maxFiles={1}
          server={{
            process: {
              url: 'http://localhost:8080/upload',
              onload: (response: any) => {
                let res = JSON.parse(response);
                console.log('res?.filePath---', res?.filePath);
                setValue('file_path', res?.filePath || '');
                return 1;
              },
            },
            revert: {
              url: '',
              onload: (response: any) => {
                setValue('file_path', '');
                return '';
              },
            },
            load: {
              url: 'https://images.unsplash.com/photo-1633113214186-9f1e186498fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=',
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
