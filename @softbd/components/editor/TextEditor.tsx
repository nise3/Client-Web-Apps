import React, {ForwardedRef} from 'react';
import {Editor as TinymceEditor} from '@tinymce/tinymce-react';
import {
  FormHelperText,
  InputLabel,
  FormControl,
  TextField,
} from '@mui/material';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {debounce} from 'lodash';

interface EditorProps {
  height?: string;
  onEditorChange?: (a: string, editor: any) => void;
  id: string;
  errorInstance: any;
  label: string;
  required?: boolean;
  value: string;
  setValue: any;
  register: any;
  clearErrors: any;
  setError: any;

  [x: string]: any;
}

/**
 //Basic uses of TextEditor
 const textEditorRef = useRef<any>(null);

 <TextEditor
 ref={textEditorRef}
 errorInstance={errors}
 label={messages['common.description']}
 />
 />
 */
const TextEditor = React.forwardRef(
  (
    {
      value,
      height,
      onEditorChange,
      id,
      errorInstance,
      required = false,
      label,
      register,
      setValue,
      clearErrors,
      setError,
    }: EditorProps,
    ref: ForwardedRef<any>,
  ) => {
    let errorObj = errorInstance?.[id];
    const reg = new RegExp('(.*)\\[(.*?)]', '');
    const matches = id.match(reg);
    if (matches) {
      errorObj = errorInstance?.[matches[1]]?.[matches[2]];
    }

    let toolbar =
      'undo redo formatselect bold italic underline | alignleft aligncenter alignright alignjustify';
    return (
      <>
        <InputLabel required={required}>{label}</InputLabel>
        <FormControl fullWidth>
          <TinymceEditor
            id={id}
            onEditorChange={debounce((content: string, editor: any) => {
              const key = matches ? matches[1] + '.' + matches[2] : id;
              setValue(key, content);

              if (content) clearErrors(key);
              else if (required) {
                setError(key, {
                  message: {
                    key: 'yup_validation_required_field',
                    values: {path: label},
                  },
                });
              }
            }, 500)}
            ref={ref}
            initialValue={value}
            init={{
              height: height ? height : 700,
              menubar: false,
              branding: false,
              convert_urls: false,
              // images_upload_handler: tinyMceEditorImageUploader,
              fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code image fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar,
              toolbar_mode: 'wrap',
              setup: function (editor: any) {
                editor.on('init', function (e: any) {});
                editor.on('focus', function () {});
                editor.on('blur', function () {});
              },
            }}
          />
          <TextField
            id={id}
            type={'hidden'}
            {...register(id)}
            sx={{display: 'none'}}
          />

          <FormHelperText sx={{color: 'error.main'}}>
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
  },
);

export default TextEditor;
