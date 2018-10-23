const ERRORS = {
    ERR_ADD_FAIL: { code: 'ERR_ALBUM_001', message: "Album add failed" },
    ERR_EDIT_FAIL: { code: 'ERR_ALBUM_002', message: "Album edit failed" },
    ERR_UPDATE_FAIL: { code: 'ERR_ALBUM_008', message: "Album update failed" },
    ERR_RECORD_EXISTED: { code: 'ERR_ALBUM_003', message: "Album have already existed" },
    ERR_NOT_FOUND: { code: 'ERR_ALBUM_004', message: "Album is not found" },
  
    ERR_TITLEALBUM_REQUIRED: { code: 'ERR_ALBUM_005', message: "Title is required" },
    ERR_SPACE_REQUIRED: { code: 'ERR_ALBUM_006', message: "Please not input space" }
};

module.exports = ERRORS;