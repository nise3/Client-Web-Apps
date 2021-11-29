import React, {FC, useCallback, useEffect, useState} from 'react';
// Import React FilePond
import {FilePond, registerPlugin} from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
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
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface FilepondComponentProps {
  id: string;
  allowMultiple?: boolean;
  maxFiles?: number;
  errorInstance: any;
  setValue: any;
  register: any;
  required: boolean;
  label: string;
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
  ...props
}) => {
  let errorObj = errorInstance?.[id];
  const reg = new RegExp('(.*)\\[(.*?)]', '');
  const matches = id.match(reg);
  if (matches) {
    errorObj = errorInstance?.[matches[1]]?.[matches[2]];
  }
  const [files, setFiles] = useState<any>([]);

  const [filePaths, setFilePaths] = useState<any>([]);

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
            load: (source, load, error, progress, abort, headers) => {
              console.log('attempting to load', source);

              // implement logic to load file from server here
              // https://pqina.nl/filepond/docs/patterns/api/server/#load-1
            },
          }}
          styleProgressIndicatorPosition={'center'}
          name='files'
          /*     credits={'null'}*/
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
