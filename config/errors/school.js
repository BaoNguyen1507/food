const ERRORS = {
    ERR_ADD_FAIL: { code: 'ERR_SCHOOL_001', message: "School add failed" },
    ERR_EDIT_FAIL: { code: 'ERR_SCHOOL_002', message: "School edit failed" },
    ERR_UPDATE_FAIL: { code: 'ERR_SCHOOL_008', message: "School update failed" },
    ERR_RECORD_EXISTED: { code: 'ERR_SCHOOL_003', message: "School have already existed" },
    ERR_NOT_FOUND: { code: 'ERR_SCHOOL_004', message: "School is not found" },
  
    ERR_ID_REQUIRED: { code: 'ERR_SCHOOL_005', message: "School Id is required" },
    ERR_NAME_REQUIRED: { code: 'ERR_SCHOOL_006', message: "Name is required" },
    ERR_EMAILADDRESS_REQUIRED: { code: 'ERR_SCHOOL_007', message: "Email address is required" },
    ERR_PHONE_REQUIRED: { code: 'ERR_SCHOOL_008', message: "Email address is required" },
    ERR_PASSWORD_REQUIRED: { code: 'ERR_SCHOOL_009', message: "Password is required" },
    ERR_EMAIL_SCHOOL_EXISTED: { code: 'ERR_SCHOOL_010', message: "Email address already existed" },
    ERR_PHONE_SCHOOL_EXISTED: { code: 'ERR_SCHOOL_011', message: "Phone already existed" },
    ERR_PASSWORD_SCHOOL_WRONG: { code: 'ERR_SCHOOL_012', message: "Password/UserName Incorrect" },
  };
  
  module.exports = ERRORS;