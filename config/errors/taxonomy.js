const ERRORS = {
  ERR_ADD_FAIL: { code: 'ERR_TAXONOMY_001', message: "Taxonomy add failed" },
  ERR_EDIT_FAIL: { code: 'ERR_TAXONOMY_002', message: "Taxonomy edit failed" },
  ERR_UPDATE_FAIL: { code: 'ERR_TAXONOMY_008', message: "Taxonomy update failed" },
  ERR_RECORD_EXISTED: { code: 'ERR_TAXONOMY_003', message: "" },
  ERR_NOT_FOUND: { code: 'ERR_TAXONOMY_004', message: "Taxonomy is not found" },

  ERR_ID_REQUIRED: { code: 'ERR_TAXONOMY_005', message: "Taxonomy Id is required" },
  ERR_TITLE_REQUIRED: { code: 'ERR_TAXONOMY_006', message: "Title is required" },
  ERR_ALIAS_REQUIRED: { code: 'ERR_TAXONOMY_007', message: "Alias is required" },
};

module.exports = ERRORS;