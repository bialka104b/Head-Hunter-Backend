import multer from 'multer';
import os from 'os'

export const upload = multer({ dest: os.tmpdir()});
