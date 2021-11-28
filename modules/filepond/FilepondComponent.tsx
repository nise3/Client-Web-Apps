import React, {FC, useState} from 'react';
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
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface FilepondComponentProps {
  allowMultiple?: boolean;
  maxFiles?: number;
}

const FilepondComponent: FC<FilepondComponentProps> = ({
  allowMultiple,
  maxFiles,

  ...props
}) => {
  const [files, setFiles] = useState<any>([]);
  return (
    <div>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={allowMultiple}
        maxFiles={maxFiles}
        server={{
          process: {
            url: 'http://localhost:8080/upload',
            onload: (response: any) => {
              console.log('response', response);
              return 1;
            },
          },
        }}
        styleProgressIndicatorPosition={'center'}
        name='files'
        /*     credits={'null'}*/
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Upload</span>'
      />
    </div>
  );
};

export default FilepondComponent;
