const ERRORS = {
  ERR_TITLEMEDIA_REQUIRED: { code: 'ERR_MEDIA_001', message: "Title is required" },
  ERR_PATH_REQUIRED: { code: 'ERR_MEDIA_002', message: "Path is required" },
  ERR_ID_REQUIRED: { code: 'ERR_MEDIA_003', message: "Id is required" },
  ERR_UPLOAD_FAIL: { code: 'ERR_MEDIA_004', message: "File can not be uploaded" }
};

module.exports = ERRORS;