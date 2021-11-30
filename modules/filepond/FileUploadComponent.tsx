import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {FilePond, registerPlugin} from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import IntlMessages from '../../@crema/utility/IntlMessages';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
} from '@mui/material';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface FilepondComponentProps {
  id: string;
  allowMultiple?: boolean;
  maxFiles?: number;
  errorInstance: any;
  setValue: any;
  register: any;
  required: boolean;
  label: any;
  itemData: any;
}

const FileUploadComponent: FC<FilepondComponentProps> = ({
  id,
  allowMultiple,
  maxFiles,
  errorInstance,
  setValue,
  register,
  required,
  label,
  itemData,
  ...props
}) => {
  let errorObj = errorInstance?.[id];
  const reg = new RegExp('(.*)\\[(.*?)]', '');
  const matches = id.match(reg);
  if (matches) {
    errorObj = errorInstance?.[matches[1]]?.[matches[2]];
  }
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    if (itemData) {
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
  }, [itemData]);

  console.log('files - ', files);

  const [filePaths, setFilePaths] = useState<any>([]);
  const filePondRef = useRef<any>(null);

  const onFileUpload: any = useCallback((path: any) => {
    console.log('filePaths--', path);
    setValue('file_path', path[0]);
  }, []);

  useEffect(() => {
    onFileUpload(filePaths);
  }, [filePaths]);
  return (
    <>
      <InputLabel required={required}>{label}</InputLabel>
      <FormControl fullWidth>
        <FilePond
          files={files}
          onupdatefiles={setFiles}
          ref={filePondRef}
          allowMultiple={allowMultiple}
          maxFiles={maxFiles}
          server={{
            process: {
              url: 'http://localhost:8080/upload',
              onload: (response: any) => {
                /* console.log('response---', response);*/
                let res = JSON.parse(response);
                setFilePaths((prev: any) => {
                  return [...prev, res.filePath];
                });
                return 1;
              },
            },
            revert: {
              url: '',
              onload: (response: any) => {
                /*console.log('revert---response--', response);*/
                setValue('file_path', '');
                setFilePaths([]);

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
    </>
  );
};

export default FileUploadComponent;
