import React, {ForwardedRef} from 'react';
import {Editor as TinymceEditor} from '@tinymce/tinymce-react';

interface EditorProps {
  height?: string;
  onEditorChange?: (a: string, editor: any) => void;
  defaultValue?: string;

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
    {defaultValue = '', height, onEditorChange, errorInstance}: EditorProps,
    ref: ForwardedRef<any>,
  ) => {
    let toolbar =
      'undo redo formatselect fontselect fontsizeselect bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link image';
    return (
      <>
        <TinymceEditor
          onEditorChange={onEditorChange}
          ref={ref}
          initialValue={defaultValue}
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
              editor.on('focus', function () {
                console.log('focus', toolbar);
              });
              editor.on('blur', function () {
                console.log('blur', toolbar);
              });
            },
          }}
        />
        {/*errorInstance*/}
      </>
    );
  },
);

export default TextEditor;
