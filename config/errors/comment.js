const ERRORS = {
    ERR_ADD_FAIL: { code: 'ERR_COMMENT_001', message: "Comment add failed" },
    ERR_EDIT_FAIL: { code: 'ERR_COMMENT_002', message: "Comment edit failed" },
    ERR_UPDATE_FAIL: { code: 'ERR_COMMENT_008', message: "Comment update failed" },
    ERR_RECORD_EXISTED: { code: 'ERR_COMMENT_003', message: "Comment have already existed" },
    ERR_NOT_FOUND: { code: 'ERR_COMMENT_004', message: "Comment is not found" },
  
    ERR_ID_REQUIRED: { code: 'ERR_COMMENT_005', message: "Comment Id is required" },
    ERR_CONTENT_REQUIRED: { code: 'ERR_COMMENT_006', message: "Content is required" },
  };
  
  module.exports = ERRORS;