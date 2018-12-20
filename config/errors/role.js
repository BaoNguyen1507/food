const ERRORS = {
    ERR_ADD_FAIL: { code: 'ERR_ROLE_001', message: "Role add failed" },
    ERR_EDIT_FAIL: { code: 'ERR_ROLE_002', message: "Role edit failed" },
    ERR_UPDATE_FAIL: { code: 'ERR_ROLE_008', message: "Role update failed" },
    ERR_RECORD_EXISTED: { code: 'ERR_ROLE_003', message: "Role have already existed" },
    ERR_NOT_FOUND: { code: 'ERR_ROLE_004', message: "Role is not found" },
  
    ERR_ID_REQUIRED: { code: 'ERR_ROLE_005', message: "Role Id is required" },
    ERR_TITLE_REQUIRED: { code: 'ERR_ROLE_006', message: "Title is required" },
    ERR_PERMISSION_REQUIRED: { code: 'ERR_ROLE_006', message: "Permission is required" },
  };
  
  module.exports = ERRORS;