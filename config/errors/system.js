const ERRORS = {
  SYSTEM_ERROR:               {code: 'SYS_001', message: 'System error'},
  SYSTEM_TOKEN_REQUIRE:       {code: 'SYS_002', message: "Authentication token is required"},
  SYSTEM_TOKEN_WRONG:         {code: 'SYS_003', message: "Authentication token are not matching"},
  SYSTEM_TOKEN_EXPIRED:       {code: 'SYS_004', message: "Authentication token is expired"},
  SYSTEM_REQUEST_TIMEOUT:     {code: 'SYS_005', message: "Authentication error request timeout"},
  SYSTEM_UPDATE_TOKEN_FAIL:   {code: 'SYS_006', message: "Update token fail"},
  SYSTEM_SOCKET_ERROR:        {code: 'SYS_007', message: "Socket error"},

  SYSTEM_JSON_FORMAT_FAIL:    {code: 'SYS_008', message: "JSON format is invalid"},
  SYSTEM_ENUME_VALUE_FAIL:    {code: 'SYS_009', message: "Enum value is invalid"},
  SYSTEM_NOT_INTEGER_FAIL:    {code: 'SYS_010', message: "Format data is not integer"},
};

module.exports = ERRORS;