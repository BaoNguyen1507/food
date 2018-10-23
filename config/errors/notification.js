const ERRORS = {
    ERR_ADD_FAIL: { code: 'ERR_NOTIFICATION_001', message: "Notification add failed" },
    ERR_EDIT_FAIL: { code: 'ERR_NOTIFICATION_002', message: "Notification edit failed" },
    ERR_UPDATE_FAIL: { code: 'ERR_NOTIFICATION_008', message: "Notification update failed" },
    ERR_RECORD_EXISTED: { code: 'ERR_NOTIFICATION_003', message: "Notification have already existed" },
    ERR_NOT_FOUND: { code: 'ERR_NOTIFICATION_004', message: "Notification is not found" },
  
    ERR_ID_REQUIRED: { code: 'ERR_NOTIFICATION_005', message: "Notification Id is required" },
    ERR_TITLENOTE_REQUIRED: { code: 'ERR_NOTIFICATION_006', message: "Notification title is required" },
  };
  
  module.exports = ERRORS;