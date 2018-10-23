const ERRORS = {
    ERR_ADD_FAIL: { code: 'ERR_SUBJECT_001', message: "Subject add failed" },
    ERR_EDIT_FAIL: { code: 'ERR_SUBJECT_002', message: "Subject edit failed" },
    ERR_UPDATE_FAIL: { code: 'ERR_SUBJECT_008', message: "Subject update failed" },
    ERR_RECORD_EXISTED: { code: 'ERR_SUBJECT_003', message: "Subject have already existed" },
    ERR_NOT_FOUND: { code: 'ERR_SUBJECT_004', message: "Subject is not found" },
  
    ERR_ID_REQUIRED: { code: 'ERR_SUBJECT_005', message: "Subject Id is required" },
    ERR_TITLE_REQUIRED: { code: 'ERR_SUBJECT_006', message: "Title is required" },
    ERR_CODE_REQUIRED: { code: 'ERR_SUBJECT_007', message: "Code student is required" },
    ERR_ALIAS_REQUIRED: { code: 'ERR_SUBJECT_008', message: "Alias is required" },
    ERR_DESCRIPTION_REQUIRED: { code: 'ERR_SUBJECT_009', message: "Description  is required" },
  };
  
  module.exports = ERRORS;