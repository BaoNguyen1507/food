const ERRORS = {
  ERR_AUTH_NOT_LOGIN: { code: 'ERR_LOGIN_001', message: "Lỗi chưa đăng nhập." },
  ERR_AUTH_ALREADY_LOGIN: { code: 'ERR_LOGIN_002', message: "Lỗi đã đăng nhập rồi." },
  ERR_SECRET_NOT_VALID: { code: 'ERR_LOGIN_003', message: "Secret not valid" },
  ERR_CODE_VERIFY_NOT_VALID: { code: 'ERR_LOGIN_004', message: "Code verify not valid" },
  ERR_SYSTEM_TOKEN_REQUIRE: { code: 'ERR_LOGIN_005', message: "System Token is required" },
  ERR_NOT_FOUND: { code: 'ERR_LOGIN_006', message: "Token not found" }
};

module.exports = ERRORS;