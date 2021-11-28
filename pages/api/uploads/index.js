import path from 'path';
import multer from 'multer';
import util from 'util';
const upload = multer({dest: path.join(`${__dirname}`, `../../public`)});

export default async function handler(req, res) {
  console.log('request-----------', req.files);
  const uploader = upload.single('files');
  await new Promise((resolve, reject) =>
    uploader(req, res, () => {
      console.log('request---------2-', req.files);
      res.status(200).json({
        message: 'File uploads successfully',
      });
      resolve();
    }),
  );
}
