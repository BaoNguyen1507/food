const ERRORS = {
    ERR_ADD_FAIL: { code: 'ERR_FOOD_001', message: "Food add failed" },
    ERR_EDIT_FAIL: { code: 'ERR_FOOD_002', message: "Food edit failed" },
    ERR_UPDATE_FAIL: { code: 'ERR_FOOD_008', message: "Food update failed" },
    ERR_RECORD_EXISTED: { code: 'ERR_FOOD_003', message: "Food have already existed" },
    ERR_NOT_FOUND: { code: 'ERR_FOOD_004', message: "Food is not found" },
  
    ERR_ID_REQUIRED: { code: 'ERR_FOOD_005', message: "Food Id is required" },
    ERR_TITLEFOOD_REQUIRED: { code: 'ERR_FOOD_006', message: "Food title is required" },
    ERR_NUTRITION_REQUIRED: { code: 'ERR_FOOD_007', message: "Nutrition is required" },
    ERR_DESCRIPTION_REQUIRED: { code: 'ERR_FOOD_008', message: "Description  is required" },
  };
  
  module.exports = ERRORS;