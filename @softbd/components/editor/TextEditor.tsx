import React, {ForwardedRef, useState} from 'react';
import {Editor as TinymceEditor} from '@tinymce/tinymce-react';
import CircularProgress from '@mui/material/CircularProgress';
import {Editor as TinyMCEEditor} from 'tinymce';

interface EditorProps {
  initialValue?: string;
  height?: string;
  onEditorChange?: (a: string, editor: TinyMCEEditor) => void;

  [x: string]: any;
}

/**
 //Basic uses of TextEditor
 const textEditorRef = useRef<any>(null);

 <TextEditor
 ref={textEditorRef}
 initialValue={'Hello world'}
 height={'500px'}
 key={1}
 />
 */
const TextEditor = React.forwardRef(
  (
    {initialValue = '', height, onEditorChange}: EditorProps,
    ref: ForwardedRef<any>,
  ) => {
    const [loading, setLoading] = useState<boolean>(true);

    let toolbar =
      'undo redo formatselect fontselect fontsizeselect bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link image';
    return (
      <>
        {loading && <CircularProgress className='loader' />}
        <TinymceEditor
          onEditorChange={onEditorChange}
          ref={ref}
          initialValue={initialValue}
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
            setup: function (editor: TinyMCEEditor) {
              editor.on('init', function (e) {
                setLoading(false);
              });
              editor.on('focus', function () {
                console.log('focus', toolbar);
              });
              editor.on('blur', function () {
                console.log('blur', toolbar);
              });
            },
          }}
        />
      </>
    );
  },
);

export default TextEditor;
