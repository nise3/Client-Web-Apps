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
import {
  FILE_SERVER_FILE_VIEW_ENDPOINT,
  FILE_SERVER_UPLOAD_ENDPOINT,
} from '../../@softbd/common/apiRoutes';
import {useIntl} from 'react-intl';

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
  sizeLimitText?: string;
  height?: any;
  width?: any;
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
  acceptedFileTypes = [
    'image/*',
    'application/pdf',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
  sizeLimitText = '1MB',
  uploadedUrls,
  height,
  width,
}) => {
  const {messages} = useIntl();
  let errorObj = errorInstance?.[id];
  const reg = new RegExp('(.*)\\[(.*?)]', '');
  const matches = id.match(reg);
  if (matches) {
    errorObj = errorInstance?.[matches[1]]?.[matches[2]];
  }
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    if (defaultFileUrl && defaultFileUrl.length) {
      if (Array.isArray(defaultFileUrl)) {
        let initFile = defaultFileUrl.map((url) => ({
          source: url.replace(FILE_SERVER_FILE_VIEW_ENDPOINT, ''),
          options: {
            type: 'local',
          },
        }));
        setFiles(initFile);
      } else {
        let source = defaultFileUrl.replace(FILE_SERVER_FILE_VIEW_ENDPOINT, '');
        let initFile = [
          {
            source: source,
            options: {
              type: 'local',
            },
          },
        ];
        setFiles(initFile);
      }
    }
  }, [defaultFileUrl]);

  const handleRemoveFile = useCallback((errorResponse, file) => {
    if (!allowMultiple) {
      setValue(id, '');
    }
  }, []);
  const filePondRef = useRef<any>(null);

  return (
    <StyledWrapper>
      <InputLabel
        error={errorObj && typeof errorObj != undefined}
        required={required}>
        {label}
      </InputLabel>
      <FormControl fullWidth>
        <FilePond
          className={allowMultiple ? 'multi-upload' : ''}
          files={files}
          onupdatefiles={(newFiles) => {
            // if (files.length > newFiles.length) { // removed
            //   setValue(id, [...(nf => )(newFiles)]);
            // }
            setFiles(newFiles);
          }}
          ref={filePondRef}
          allowMultiple={allowMultiple}
          onremovefile={handleRemoveFile}
          acceptedFileTypes={acceptedFileTypes}
          maxParallelUploads={1}
          maxFiles={50}
          // allowRemove={false} // prop does not exist
          server={{
            process: {
              url: FILE_SERVER_UPLOAD_ENDPOINT,
              onload: (response: any) => {
                let res = JSON.parse(response);
                if (!allowMultiple) {
                  setValue(
                    id,
                    res?.url?.replace(FILE_SERVER_FILE_VIEW_ENDPOINT, ''),
                  );
                } else {
                  setValue(id, [
                    ...uploadedUrls,
                    res?.url?.replace(FILE_SERVER_FILE_VIEW_ENDPOINT, ''),
                  ]);
                }
                return 1;
              },
            },
            load: {
              url: FILE_SERVER_FILE_VIEW_ENDPOINT,
            },
          }}
          styleProgressIndicatorPosition={'center'}
          name='files'
          // labelIdle='Drag & Drop your files or <span class="filepond--label-action">Upload</span>'
          labelIdle={messages['file.drag_and_drop_or_upload'] as string}
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
      {
        <Box sx={{fontStyle: 'italic', fontWeight: 'bold', marginTop: '6px'}}>
          {(messages['file_size.maximum_size_warning_text'] as string).replace(
            '1MB',
            sizeLimitText,
          )}
          {height &&
            width &&
            ` and required image size ${width} px * ${height} px`}
        </Box>
      }
    </StyledWrapper>
  );
};

export default FileUploadComponent;
