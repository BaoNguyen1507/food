const ERRORS = {
    ERR_ADD_FAIL: { code: 'ERR_SCHEDULE_001', message: "Schedule add failed" },
    ERR_EDIT_FAIL: { code: 'ERR_SCHEDULE_002', message: "Schedule edit failed" },
    ERR_UPDATE_FAIL: { code: 'ERR_SCHEDULE_003', message: "Schedule update failed" },
    ERR_RECORD_EXISTED: { code: 'ERR_SCHEDULE_004', message: "Schedule have already existed" },
    ERR_NOT_FOUND: { code: 'ERR_SCHEDULE_005', message: "Schedule is not found" },
  
    ERR_ID_REQUIRED: { code: 'ERR_SCHEDULE_006', message: "Schedule Id is required" },
    ERR_TITLE_REQUIRED: { code: 'ERR_SCHEDULE_007', message: "Title is required" },
    ERR_TIME_REQUIRED: { code: 'ERR_SCHEDULE_008', message: "Time is required" },

    ERR_DATE_REQUIRED: { code: 'ERR_SCHEDULE_009', message: "Date is required" },
  };
  
  module.exports = ERRORS;