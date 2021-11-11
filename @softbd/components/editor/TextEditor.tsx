import React, {ForwardedRef} from 'react';
import {Editor as TinymceEditor} from '@tinymce/tinymce-react';
import {FormHelperText, InputLabel, FormControl} from '@mui/material';
import IntlMessages from '../../../@crema/utility/IntlMessages';

interface EditorProps {
  height?: string;
  onEditorChange?: (a: string, editor: any) => void;
  id: string;
  errorInstance: any;
  label: string;
  required?: boolean;
  value: string;

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
      'undo redo formatselect fontselect fontsizeselect bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link image';
    return (
      <>
        <InputLabel required={required}>{label}</InputLabel>
        <FormControl>
          <TinymceEditor
            id={id}
            onEditorChange={onEditorChange}
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
