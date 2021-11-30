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
  /* const [files, setFiles] = useState<any>([
    {
      // the server file reference
      source: 'http://lorempixel.com/400/200/',

      // set type to limbo to tell FilePond this is a temp file
      /!* options: {
        type: 'local',
      },*!/
    },
  ]);*/
  console.log('files - ', files);

  const [filePaths, setFilePaths] = useState<any>([]);
  const filePondRef = useRef<any>(null);

  /*    const handleOnProcessFile = useCallback((error, file) => {
    if (error) {
      if (filePondRef && filePondRef.current) {
        filePondRef.current.removeFile(file);
      }
    }
  }, []);*/

  const onFileUpload: any = useCallback((path: any) => {
    console.log('filePaths--', path);
    setValue('file_path', path[0]);
  }, []);

  /*  const handleOnProcessRemoveFile: any = useCallback((path: any) => {}, []);*/

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
          /*          onprocessfile={handleOnProcessFile}*/
          /*   onremovefile={handleOnProcessRemoveFile}*/
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
              onload: (response: any) => {
                /*console.log('revert---response--', response);*/
                setValue('file_path', '');
                setFilePaths([]);
                return 1;
              },
            },
            load: 'http://lorempixel.com/400/200/',
            /*   load: (source, load, error, progress, abort, headers) => {
              console.log('attempting to load', source);

              // implement logic to load file from server here
              // https://pqina.nl/filepond/docs/patterns/api/server/#load-1
            },*/
            /*  load: {
              url: 'http://lorempixel.com/400/200/',
            },*/
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
