/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
var routes_mobile = require('./routes/mobile');

module.exports.routes = Object.assign(routes_mobile.mobile, {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': {
  //   view: 'pages/homepage'
  // },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  //LOGIN
  'POST /api/v1/entrance/login/': { controller: 'entrance/LoginController', action: 'login' },

  // USER
  'GET /api/v1/user/': { controller: 'user/UserController', action: 'search' },
  'GET /api/v1/user/:id/': { controller: 'user/UserController', action: 'get' },
  'POST /api/v1/user/': { controller: 'user/UserController', action: 'add' },
  'PATCH /api/v1/user/:id/': { controller: 'user/UserController', action: 'edit' },
  'PATCH /api/v1/user/': { controller: 'user/UserController', action: 'trash' },

  // TAXONOMY
  'GET /api/v1/taxonomy/': { controller: 'taxonomy/TaxonomyController', action: 'search' },
  'GET /api/v1/taxonomy/:id/': { controller: 'taxonomy/TaxonomyController', action: 'get' },
  'POST /api/v1/taxonomy/': { controller: 'taxonomy/TaxonomyController', action: 'add' },
  'PATCH /api/v1/taxonomy/:id/': { controller: 'taxonomy/TaxonomyController', action: 'edit' },
  'PATCH /api/v1/taxonomy/': { controller: 'taxonomy/TaxonomyController', action: 'trash' },

  // PARENT
  'GET /api/v1/parent/': { controller: 'parent/ParentController', action: 'search' },
  'GET /api/v1/parent/:id/': { controller: 'parent/ParentController', action: 'get' },
  'POST /api/v1/parent/': { controller: 'parent/ParentController', action: 'add' },
  'PATCH /api/v1/parent/:id/': { controller: 'parent/ParentController', action: 'edit' },
  'PATCH /api/v1/parent/': { controller: 'parent/ParentController', action: 'trash' },

  // STUDENT
  'GET /api/v1/student/': { controller: 'student/StudentController', action: 'search' },
  'GET /api/v1/student/:id/': { controller: 'student/StudentController', action: 'get' },
  'POST /api/v1/student/': { controller: 'student/StudentController', action: 'add' },
  'PATCH /api/v1/student/:id/': { controller: 'student/StudentController', action: 'edit' },
  'PATCH /api/v1/student/': { controller: 'student/StudentController', action: 'trash' },
 
  // POST
  'GET /api/v1/post/': { controller: 'post/PostController', action: 'search' },
  'GET /api/v1/post/:id/': { controller: 'post/PostController', action: 'get' },
  'POST /api/v1/post/': { controller: 'post/PostController', action: 'add' },
  'PATCH /api/v1/post/:id/': { controller: 'post/PostController', action: 'edit' },
  'PATCH /api/v1/post/': { controller: 'post/PostController', action: 'trash' },

  // ALBUM
  'GET /api/v1/album/': { controller: 'album/AlbumController', action: 'search' },
  'GET /api/v1/album/:id/': { controller: 'album/AlbumController', action: 'get' },
  'POST /api/v1/album/': { controller: 'album/AlbumController', action: 'add' },
  'PATCH /api/v1/album/:id/': { controller: 'album/AlbumController', action: 'edit' },
  'PATCH /api/v1/album/': { controller: 'album/AlbumController', action: 'trash' },

  // SCHOOL
  'POST /api/v1/school/login/': { controller: 'school/SchoolUserController', action: 'login' },
  'GET /api/v1/school/': { controller: 'school/SchoolController', action: 'search' },
  'GET /api/v1/school/:id/': { controller: 'school/SchoolController', action: 'get' },
  'POST /api/v1/school/': { controller: 'school/SchoolController', action: 'add' },
  'PATCH /api/v1/school/:id/': { controller: 'school/SchoolController', action: 'edit' },
  'PATCH /api/v1/school/': { controller: 'school/SchoolController', action: 'trash' },

  // CLASS
  'GET /api/v1/class/': { controller: 'class/ClassController', action: 'search' },
  'GET /api/v1/class/:id/': { controller: 'class/ClassController', action: 'get' },
  'POST /api/v1/class/': { controller: 'class/ClassController', action: 'add' },
  'PATCH /api/v1/class/:id/': { controller: 'class/ClassController', action: 'edit' },
  'PATCH /api/v1/class/': { controller: 'class/ClassController', action: 'trash' },

  // SUBJECT
  'GET /api/v1/subject/': { controller: 'subject/SubjectController', action: 'search' },
  'GET /api/v1/subject/:id/': { controller: 'subject/SubjectController', action: 'get' },
  'POST /api/v1/subject/': { controller: 'subject/SubjectController', action: 'add' },
  'PATCH /api/v1/subject/:id/': { controller: 'subject/SubjectController', action: 'edit' },
  'PATCH /api/v1/subject/': { controller: 'subject/SubjectController', action: 'trash' },
  
  // COMMENT
  'GET /api/v1/comment/': { controller: 'comment/CommentController', action: 'search' },
  'GET /api/v1/comment/:id/': { controller: 'comment/CommentController', action: 'get' },
  'POST /api/v1/comment/': { controller: 'comment/CommentController', action: 'add' },
  'PATCH /api/v1/comment/:id/': { controller: 'comment/CommentController', action: 'edit' },
  'PATCH /api/v1/comment/': { controller: 'comment/CommentController', action: 'trash' },

  // MEDIA
  'GET /api/v1/media/': { controller: 'media/MediaController', action: 'search' },
  'GET /api/v1/media/:id/': { controller: 'media/MediaController', action: 'get' },
  'POST /api/v1/media/': { controller: 'media/MediaController', action: 'add' },
  'PATCH /api/v1/media/:id/': { controller: 'media/MediaController', action: 'edit' },
  'PATCH /api/v1/media/': { controller: 'media/MediaController', action: 'trash' },
  'POST /api/v1/media/upload/': { controller: 'media/MediaController', action: 'upload' },
  
  //FOOD
  'GET /api/v1/food/': { controller: 'food/FoodController', action: 'search' },
  'GET /api/v1/food/:id/': { controller: 'food/FoodController', action: 'get' },
  'POST /api/v1/food/': { controller: 'food/FoodController', action: 'add' },
  'PATCH /api/v1/food/:id/': { controller: 'food/FoodController', action: 'edit' },
  'PATCH /api/v1/food/': { controller: 'food/FoodController', action: 'trash' },

  //NOTIFICATION
  'GET /api/v1/notification/': { controller: 'notification/NotificationController', action: 'search' },
  'GET /api/v1/notification/:id/': { controller: 'notification/NotificationController', action: 'get' },
  'POST /api/v1/notification/': { controller: 'notification/NotificationController', action: 'add' },
  'PATCH /api/v1/notification/:id/': { controller: 'notification/NotificationController', action: 'edit' },
  'PATCH /api/v1/notification/': { controller: 'notification/NotificationController', action: 'trash' },

  //SCHEDULE
  'GET /api/v1/schedule/': { controller: 'schedule/ScheduleController', action: 'search' },
  'GET /api/v1/schedule/:id/': { controller: 'schedule/ScheduleController', action: 'get' },
  'POST /api/v1/schedule/': { controller: 'schedule/ScheduleController', action: 'add' },
  'PATCH /api/v1/schedule/:id/': { controller: 'schedule/ScheduleController', action: 'edit' },
  'PATCH /api/v1/schedule/': { controller: 'schedule/ScheduleController', action: 'trash' },

  //MENU
  'GET /api/v1/menu/': { controller: 'menu/MenuController', action: 'search' },
  'GET /api/v1/menu/:id/': { controller: 'menu/MenuController', action: 'get' },
  'POST /api/v1/menu/': { controller: 'menu/MenuController', action: 'add' },
  'PATCH /api/v1/menu/:id/': { controller: 'menu/MenuController', action: 'edit' },
  'PATCH /api/v1/menu/': { controller: 'menu/MenuController', action: 'trash' },

  // FILE
  'GET /assets/images/zadmin/uploads/*': { controller: 'file/FileController', action: 'get' },

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


});
