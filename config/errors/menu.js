const ERRORS = {
    ERR_ADD_FAIL: { code: 'ERR_MENU_001', message: "Menu add failed" },
    ERR_EDIT_FAIL: { code: 'ERR_MENU_002', message: "Menu edit failed" },
    ERR_UPDATE_FAIL: { code: 'ERR_MENU_003', message: "Menu update failed" },
    ERR_RECORD_EXISTED: { code: 'ERR_MENU_004', message: "Menu have already existed" },
    ERR_NOT_FOUND: { code: 'ERR_MENU_005', message: "Menu is not found" },
  
    ERR_ID_REQUIRED: { code: 'ERR_MENU_006', message: "Menu Id is required" },
    ERR_TITLE_REQUIRED: { code: 'ERR_MENU_007', message: "Title is required" },
    ERR_TIME_REQUIRED: { code: 'ERR_MENU_008', message: "Time is required" },
  };
  
  module.exports = ERRORS;