const ERRORS = {
    ERR_ADD_FAIL: { code: 'ERR_ATTENDENT_001', message: "Attendent add failed" },
    ERR_EDIT_FAIL: { code: 'ERR_ATTENDENT_002', message: "Attendent edit failed" },
    ERR_UPDATE_FAIL: { code: 'ERR_ATTENDENT_008', message: "Attendent update failed" },
    ERR_RECORD_EXISTED: { code: 'ERR_ATTENDENT_003', message: "Attendent have already existed" },
    ERR_NOT_FOUND: { code: 'ERR_ATTENDENT_004', message: "Attendent is not found" },
  
    ERR_CLASS_REQUIRED: { code: 'ERR_ATTENDENT_005', message: "Class ID is required" },
    ERR_DATEOFF_REQUIRED: { code: 'ERR_ATTENDENT_006', message: "DateOff is required" }
};

module.exports = ERRORS;