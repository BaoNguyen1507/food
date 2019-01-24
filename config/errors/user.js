const ERRORS = {
  ERR_ADD_FAIL: { code: 'ERR_USER_001', message: "User add failed" },
  ERR_EDIT_FAIL: { code: 'ERR_USER_002', message: "User edit failed" },
  ERR_EMAIL_EXISTED: { code: 'ERR_USER_003', message: "Your email address is existed." },
  ERR_PHONE_EXISTED: { code: 'ERR_USER_004', message: "Your phone number is existed." },
  ERR_EMAIL_PHONE_EXISTED: { code: 'ERR_USER_004', message: "Your email address or phone number is existed." },
  
  ERR_ID_REQUIRED: { code: 'ERR_USER_006', message: "User Id is required" },
  ERR_USER_EMAIL_REQUIRED: { code: 'ERR_USER_007', message: "Email is required" },
  ERR_USER_PHONE_REQUIRED: { code: 'ERR_USER_008', message: "Phone is required" },
  ERR_USER_PASSWORD_REQUIRED: { code: 'ERR_USER_009', message: "Password is required" },
  ERR_USER_FULLNAME_REQUIRED: { code: 'ERR_USER_011', message: "User FullName is required" },
  
  ERR_USER_INPUT_REQUIRED: { code: 'ERR_USER_INPUT_REQUIRED' },
  ERR_NOT_FOUND: { code: 'ERR_NOT_FOUND' },
  ERR_PASSWORD_WRONG: { code: 'ERR_PASSWORD_WRONG' },
};

module.exports = ERRORS;