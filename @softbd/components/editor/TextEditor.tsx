import React, {ForwardedRef} from 'react';
import {Editor as TinymceEditor} from '@tinymce/tinymce-react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
} from '@mui/material';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {debounce} from 'lodash';
import { FILE_SERVER_UPLOAD_ENDPOINT } from '../../common/apiRoutes';

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

// const tineyMceStyle = `
// figure.image {
//   display: inline-block;
//   border: 1px solid gray;
//   margin: 0 2px 0 1px;
//   background: #f5f2f0;
// }
// figure.image img {
//   margin: 5px 5px 0 5px;
// }

// `

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

    const onActivateUI = () => {
      // @ts-ignore
      const tinyMCE = window.tinyMCE;

      if (tinyMCE) {
        tinyMCE.activeEditor.windowManager.open = (
          (open: any) =>
          (...args: any) => {
            let op = open(...args);
            let dialog =
              document.getElementsByClassName('tox-tinymce-aux')?.[0];
            let target = document.getElementsByClassName(
              'MuiDialog-container',
            )?.[0];

            if (target && dialog) {
              target.appendChild(dialog);
            }
            return op;
          }
        )(tinyMCE.activeEditor.windowManager.open);
      }
    };

    const imageUploadHandler = (blobInfo: any, success: any, failure: any, progress: any) => {
      let xhr: XMLHttpRequest, formData: FormData;

      xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', FILE_SERVER_UPLOAD_ENDPOINT);
    
      xhr.upload.onprogress = function (e) {
        progress(e.loaded / e.total * 100);
      };
    
      xhr.onload = function() {
        let json;
    
        if (xhr.status === 403) {
          failure('HTTP Error: ' + xhr.status, { remove: true });
          return;
        }
    
        if (xhr.status < 200 || xhr.status >= 300) {
          failure('HTTP Error: ' + xhr.status);
          return;
        }
    
        json = JSON.parse(xhr.responseText);
    
        if (!json || typeof json.url != 'string') {
          failure('Invalid JSON: ' + xhr.responseText);
          return;
        }
    
        success(json.url);
      };
    
      xhr.onerror = function () {
        failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
      };
    
      formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());
    
      xhr.send(formData);
    }

    let toolbar =
      'undo redo formatselect bold italic underline | alignleft aligncenter alignright alignjustify | image media template link';
    return (
      <>
        <InputLabel required={required}>{label}</InputLabel>
        <FormControl fullWidth>
          <TinymceEditor
            onInit={onActivateUI}
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
              image_title: true,
              height: height ? height : 700,
              menubar: false,
              branding: false,
              convert_urls: false,
              image_caption: true,
              media_strict: false,
              // content_css: tineyMceStyle,
              // images_upload_handler: tinyMceEditorImageUploader,
              images_upload_handler: imageUploadHandler,
              fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
              plugins: [
                'advlist autolink lists link image charmap print preview anchor template linkchecker ',
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
              templates: [
                /* {
                  title: 'about us component',
                  description: 'create about us',
                  content:
                    '<div style="margin: 10px 30px">' +
                    '<div class="row" style="box-sizing: border-box; width: 100%">' +
                    '<div class="column" style="float: left; width: 50%; max-height: 300px;">' +
                    'content</div>' +
                    '<div class="column" style="float: left; width: 50%; max-height: 300px">image</div>' +
                    '</div>' +
                    '<div class="row" style="box-sizing: border-box; width:100%;">' +
                    '<div class="column" style="float: left; width: 50%; max-height: 300px;">' +
                    'content</div>' +
                    '<div class="column" style="float: left; width: 50%; max-height: 300px">image</div>' +
                    '</div>' +
                    '<div class="row" style="box-sizing: border-box; width:100%;">' +
                    '<div class="column" style="float: left; width: 50%; max-height: 300px;">' +
                    'content</div>' +
                    '<div class="column" style="float: left; width: 50%; max-height: 300px">image</div>' +
                    '</div>' +
                    '</div>',
                },*/

                {
                  title: 'Two column table',
                  description: 'Creates a new table',
                  content:
                    '<div class="editor-template-table">' +
                    '<table width="100%"  border="0">' +
                    '<tr><td colspan="6">Content</td><td colspan="6">Content</td></tr>' +
                    '</table>' +
                    '</div>',
                },
                {
                  title: 'Link Button',
                  description: 'Creates a new button',
                  content:
                    '<div >' +
                    '<a class="link-button MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root" style="border-radius: 5px; border: 1px solid #bfbfbf; padding: 5px 10px 8px; text-decoration: none; color: #1c1c1c;" href="#" title="">' +
                    'Button Text' +
                    '<span class="MuiButton-startIcon MuiButton-iconSizeMedium css-1d6wzja-MuiButton-startIcon"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="DashboardIcon"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></svg></span>' +
                    '</a>' +
                    '</div>',
                },
              ],
              template_cdate_format:
                '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
              template_mdate_format:
                '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
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
