const ERRORS = {
  ERR_ADD_FAIL: { code: 'ERR_CLASS_001', message: "Class add failed" },
  ERR_EDIT_FAIL: { code: 'ERR_CLASS_002', message: "Class edit failed" },
  ERR_UPDATE_FAIL: { code: 'ERR_CLASS_008', message: "Class update failed" },
  ERR_RECORD_EXISTED: { code: 'ERR_CLASS_003', message: "Class have already existed" },
  ERR_NOT_FOUND: { code: 'ERR_CLASS_004', message: "Class is not found" },

  ERR_ID_REQUIRED: { code: 'ERR_CLASS_005', message: "Class Id is required" },
  ERR_NAME_REQUIRED: { code: 'ERR_CLASS_006', message: "Class Name is required" },
  ERR_TOTALSTUDENT_REQUIRED: { code: 'ERR_CLASS_007', message: "Total student is required" },
  ERR_ADMISSIONNUMBER_REQUIRED: { code: 'ERR_CLASS_008', message: "Admission number is required" },
  ERR_OVERADMISSION_REQUIRED: { code: 'ERR_CLASS_009', message: "Student number exceeds the threshold" },
  ERR_LIMIT_REQUIRED: { code: 'ERR_CLASS_010', message: "Admission of a class should be 150" },
  ERR_MINIMUM_REQUIRED: { code: 'ERR_CLASS_011', message: "Class should have at least 30" },
    
  ERR_SDKCLASS_EXISTED: { code: 'ERR_CLASS_012', message: "SDK Class have already existed" },
  ERR_SDKCLASS_REQUIRED: { code: 'ERR_CLASS_013', message: "SDK Class is required" }
  };
  
  module.exports = ERRORS;