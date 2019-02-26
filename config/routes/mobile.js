module.exports.mobile = {
  /************* Auth **************/
  'PUT /api/v1/mobile/auth/token': { controller: 'mobile/MobileAuthController', action: 'getToken' },
  'GET /api/v1/mobile/auth/sampleToken': { controller: 'mobile/MobileAuthController', action: 'sampleToken' },
  'PUT /api/v1/mobile/auth/update-token': { controller: 'mobile/MobileAuthController', action: 'updateToken' },
  
  //LOGIN
  'PUT /api/v1/mobile/entrance/login/': { controller: 'mobile/MobileLoginController', action: 'login' },
  
  //RESET-PASSWOD
  'PUT /api/v1/mobile/resetpasword/': { controller: 'mobile/MobileResetPasswordController', action: 'resetPassword' },
  
  //CHANGE-PASSWOD
  'PUT /api/v1/mobile/changepasword/': { controller: 'mobile/MobileChangePassController', action: 'changePassword' },

  // USER
  'PUT /api/v1/mobile/user/': { controller: 'mobile/MobileUserController', action: 'search' },
  'GET /api/v1/mobile/user/get/:id': { controller: 'mobile/MobileUserController', action: 'get' },
  'PUT /api/v1/mobile/user/edit': { controller: 'mobile/MobileUserController', action: 'edit' },
  'PUT /api/v1/mobile/user/upload': { controller: 'mobile/MobileUserController', action: 'upload' },
  
  // TAXONOMY
  'PUT /api/v1/mobile/taxonomy/': { controller: 'mobile/MobileTaxonomyController', action: 'search' },
  'GET /api/v1/mobile/taxonomy/:id/': { controller: 'mobile/MobileTaxonomyController', action: 'get' },
  'POST /api/v1/mobile/taxonomy/': { controller: 'mobile/MobileTaxonomyController', action: 'add' },
  'PUT /api/v1/mobile/taxonomy/:id/': { controller: 'mobile/MobileTaxonomyController', action: 'edit' },
  'PUT /api/v1/mobile/taxonomy/': { controller: 'mobile/MobileTaxonomyController', action: 'trash' },

  // PARENT
  'PUT /api/v1/mobile/parent/': { controller: 'mobile/MobileParentController', action: 'search' },
  'GET /api/v1/mobile/parent/get/:id': { controller: 'mobile/MobileParentController', action: 'get' },
  'PUT /api/v1/mobile/parent/edit': { controller: 'mobile/MobileParentController', action: 'edit' },
  'PUT /api/v1/mobile/parent/upload': { controller: 'mobile/MobileParentController', action: 'upload' },
  // MESSAGE
  'GET /api/v1/mobile/message/getGroupMessage': { controller: 'mobile/MobileMessageController', action: 'getGroupMessage' },
  'POST /api/v1/mobile/message/storeMessageData': { controller: 'mobile/MobileMessageController', action: 'storeMessageData' },
  'POST /api/v1/mobile/message/showDataMessage': { controller: 'mobile/MobileMessageController', action: 'showDataMessage' },
  
  // STUDENT
  'PUT /api/v1/mobile/student/getStudent': { controller: 'mobile/MobileStudentController', action: 'getStudent' },
  'PUT /api/v1/mobile/student/getStudentThumb': { controller: 'mobile/MobileStudentController', action: 'getStudentThumb' },
  'PUT /api/v1/mobile/student/updateWHHistory': { controller: 'mobile/MobileStudentController', action: 'updateWHHistory' },
  'PUT /api/v1/mobile/student/updateHealthHistory': { controller: 'mobile/MobileStudentController', action: 'updateHealthHistory' },

  // POST
  'PUT /api/v1/mobile/post/': { controller: 'mobile/MobilePostController', action: 'search' },
  'GET /api/v1/mobile/post': { controller: 'mobile/MobilePostController', action: 'list' },
  'GET /api/v1/mobile/post/:id': { controller: 'mobile/MobilePostController', action: 'get' },
  'PUT /api/v1/mobile/post/addComment/': { controller: 'mobile/MobilePostController', action: 'addComment' },
  
  // ALBUM
  'GET /api/v1/mobile/album': { controller: 'mobile/MobileAlbumController', action: 'list' },
  'POST /api/v1/mobile/album': { controller: 'mobile/MobileAlbumController', action: 'add' },
  'PUT /api/v1/mobile/album/:id': { controller: 'mobile/MobileAlbumController', action: 'edit' },

  // SCHOOL
  'PUT /api/v1/mobile/school/': { controller: 'mobile/MobileSchoolController', action: 'search' },
  'GET /api/v1/mobile/school/get/:id': { controller: 'mobile/MobileSchoolController', action: 'get' },
  'PUT /api/v1/mobile/school/edit/': { controller: 'mobile/MobileSchoolController', action: 'edit' },


  // CLASS
  'PUT /api/v1/mobile/class/': { controller: 'mobile/MobileClassController', action: 'search' },
  'GET /api/v1/mobile/class/:id/': { controller: 'mobile/MobileClassController', action: 'get' },
  'POST /api/v1/mobile/class/': { controller: 'mobile/MobileClassController', action: 'add' },
  'PUT /api/v1/mobile/class/:id/': { controller: 'mobile/MobileClassController', action: 'edit' },
  'PUT /api/v1/mobile/class/': { controller: 'mobile/MobileClassController', action: 'trash' },

  // SUBJECT
  'PUT /api/v1/mobile/subject/': { controller: 'mobile/MobileSubjectController', action: 'search' },
  'GET /api/v1/mobile/subject/:id/': { controller: 'mobile/MobileSubjectController', action: 'get' },
  'POST /api/v1/mobile/subject/': { controller: 'mobile/MobileSubjectController', action: 'add' },
  'PUT /api/v1/mobile/subject/:id/': { controller: 'mobile/MobileSubjectController', action: 'edit' },
  'PUT /api/v1/mobile/subject/': { controller: 'mobile/MobileSubjectController', action: 'trash' },
  
  // COMMENT
  'PUT /api/v1/mobile/comment/': { controller: 'mobile/MobileCommentController', action: 'search' },
  'GET /api/v1/mobile/comment/:id/': { controller: 'mobile/MobileCommentController', action: 'get' },
  'POST /api/v1/mobile/comment/': { controller: 'mobile/MobileCommentController', action: 'add' },
  'PUT /api/v1/mobile/comment/:id/': { controller: 'mobile/MobileCommentController', action: 'edit' },
  'PUT /api/v1/mobile/comment/': { controller: 'mobile/MobileCommentController', action: 'trash' },

  // MEDIA
  // 'PUT /api/v1/mobile/media/newMedia': { controller: 'mobile/MobileMediaController', action: 'newMedia' },
  'POST /api/v1/mobile/media/add/': { controller: 'mobile/MobileMediaController', action: 'add' },
  
  //FOOD
  'PUT /api/v1/mobile/food/': { controller: 'mobile/MobileFoodController', action: 'search' },
  'GET /api/v1/mobile/food/:id/': { controller: 'mobile/MobileFoodController', action: 'get' },
  'POST /api/v1/mobile/food/': { controller: 'mobile/MobileFoodController', action: 'add' },
  'PUT /api/v1/mobile/food/:id/': { controller: 'mobile/MobileFoodController', action: 'edit' },
  'PUT /api/v1/mobile/food/': { controller: 'mobile/MobileFoodController', action: 'trash' },

  //MENU
  'GET /api/v1/mobile/menu/:id/': { controller: 'mobile/MobileMenuController', action: 'get' },
  'GET /api/v1/mobile/menu': { controller: 'mobile/MobileMenuController', action: 'search' },

  // SCHEDULE
  'GET /api/v1/mobile/schedule': { controller: 'mobile/MobileScheduleController', action: 'search' },

  //NOTIFICATION
  'GET /api/v1/mobile/notification': { controller: 'mobile/MobileNotificationController', action: 'list' },
  'GET /api/v1/mobile/notification/:id': { controller: 'mobile/MobileNotificationController', action: 'get' },

  
  // ATTEDENT
  'PUT /api/v1/mobile/attendent/checkAttendent': { controller: 'mobile/MobileAttendentController', action: 'checkAttendent' },
  'PUT /api/v1/mobile/attendent/checkStudentByClass': { controller: 'mobile/MobileAttendentController', action: 'checkStudentByClass' },
}
