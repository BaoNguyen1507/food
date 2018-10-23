const ERRORS = {
    ERR_ADD_FAIL: { code: 'ERR_PARENT_001', message: "Parent add failed" },
    ERR_EDIT_FAIL: { code: 'ERR_PARENT_002', message: "Parent edit failed" },
    ERR_UPDATE_FAIL: { code: 'ERR_PARENT_008', message: "Parent update failed" },
    ERR_RECORD_EXISTED: { code: 'ERR_PARENT_003', message: "Parent have already existed" },
    ERR_NOT_FOUND: { code: 'ERR_PARENT_004', message: "Không có người dùng trong hệ thống" },
  
    ERR_ID_REQUIRED: { code: 'ERR_PARENT_005', message: "Parent Id is required" },
    ERR_FULLNAME_REQUIRED: { code: 'ERR_PARENT_006', message: "Họ và tên không được trống" },
    ERR_EMAILADDRESS_REQUIRED: { code: 'ERR_PARENT_007', message: "E-mail không được trống" },
    ERR_PHONE_REQUIRED: { code: 'ERR_PARENT_008', message: "Số điện thoại không được trống" },
    ERR_PASSWORD_REQUIRED: { code: 'ERR_PARENT_009', message: "Password is required" },
    ERR_EMAIL_PARENT_EXISTED: { code: 'ERR_PARENT_010', message: "E-mail đã tồn tại" },
    ERR_PHONE_PARENT_EXISTED: { code: 'ERR_PARENT_011', message: "Số điện thoại đã tồn tại" },
    
    ERR_PASSWORD_WRONG: { code: 'ERR_PARENT_012', message: "Password is wrong" },
  };
  
  module.exports = ERRORS;