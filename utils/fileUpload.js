const multer = require('multer');

/**
 * Defines the file storage settings using `multer.diskStorage`.
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g,'-') + '-' + file.originalname) // 23/08/2022
    }
  })

 /**
 * Specifies the file formats that can be saved.
 * @param {Object} req - The request object.
 * @param {Object} file - The file object.
 * @param {Function} cb - The callback function.
 */
  function fileFilter(req, file, cb) {
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ){
        cb(null, true);
    }else{
        cb(null, false);
    }
  }

/**
 * Represents the configuration settings for multer.
 */
  const upload = multer({ storage, fileFilter});

/**
 * Formats the file size to a human-readable format.
 * @param {Number} bytes - The size of the file in bytes.
 * @param {Number} decimal - The number of decimal places to round the result to.
 * @returns {String} - The formatted file size.
 */
  const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return(
        parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index]
    );
  };

  module.exports = { upload, fileSizeFormatter };