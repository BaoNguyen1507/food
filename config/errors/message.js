const ERRORS = {
  ERR_ADD_FAIL: { code: 'ERR_STUDENT_001', message: "Message add failed" },
  ERR_EDIT_FAIL: { code: 'ERR_STUDENT_002', message: "Message edit failed" },
  ERR_UPDATE_FAIL: { code: 'ERR_STUDENT_003', message: "Message update failed" },
  ERR_NOT_FOUND: { code: 'ERR_STUDENT_004', message: "Message is not found" },

  ERR_ID_REQUIRED: { code: 'ERR_STUDENT_005', message: "Message Id is required" },
  ERR_CLASS_ID_REQUIRED: { code: 'ERR_STUDENT_006', message: "Fullname is required" },
  ERR_TEACHER_PARENT_ID_REQUIRED: { code: 'ERR_STUDENT_008', message: "Id of teacher or parent is required" },
};
  
  module.exports = ERRORS;