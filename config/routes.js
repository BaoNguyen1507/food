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

  //INITIALIZE
  // 'GET /api/v1/entrance/create/': { controller: 'backend/LoginController', action: 'createSuperAdmin' },
  
  // USER
  'POST /api/v1/user/login/': { controller: 'backend/UserController', action: 'login' },
  'GET /api/v1/user/': { controller: 'backend/UserController', action: 'search' },
  'GET /api/v1/teacher/': { controller: 'backend/UserController', action: 'getTeacher' },
  'GET /api/v1/user/:id/': { controller: 'backend/UserController', action: 'get' },
  'POST /api/v1/user/': { controller: 'backend/UserController', action: 'add' },
  'PATCH /api/v1/user/:id/': { controller: 'backend/UserController', action: 'edit' },
  'PATCH /api/v1/user/': { controller: 'backend/UserController', action: 'trash' },
  // TAXONOMY
  'GET /api/v1/taxonomy/': { controller: 'backend/TaxonomyController', action: 'search' },
  'GET /api/v1/taxonomy/:id/': { controller: 'backend/TaxonomyController', action: 'get' },
  'POST /api/v1/taxonomy/': { controller: 'backend/TaxonomyController', action: 'add' },
  'PATCH /api/v1/taxonomy/:id/': { controller: 'backend/TaxonomyController', action: 'edit' },
  'PATCH /api/v1/taxonomy/': { controller: 'backend/TaxonomyController', action: 'trash' },

  // PARENT
  'GET /api/v1/parent/': { controller: 'backend/ParentController', action: 'search' },
  'GET /api/v1/parent/:id/': { controller: 'backend/ParentController', action: 'get' },
  'POST /api/v1/parent/': { controller: 'backend/ParentController', action: 'add' },
  'PATCH /api/v1/parent/:id/': { controller: 'backend/ParentController', action: 'edit' },
  'PATCH /api/v1/parent/': { controller: 'backend/ParentController', action: 'trash' },

  // STUDENT
  'GET /api/v1/student/': { controller: 'backend/StudentController', action: 'search' },
  'GET /api/v1/student/:id/': { controller: 'backend/StudentController', action: 'get' },
  'POST /api/v1/student/': { controller: 'backend/StudentController', action: 'add' },
  'POST /api/v1/student/import': { controller: 'backend/StudentController', action: 'importExcel' },
  'PATCH /api/v1/student/:id/': { controller: 'backend/StudentController', action: 'edit' },
  'PATCH /api/v1/student/': { controller: 'backend/StudentController', action: 'trash' },
 
  // POST
  'GET /api/v1/post/': { controller: 'backend/PostController', action: 'search' },
  'GET /api/v1/post/:id/': { controller: 'backend/PostController', action: 'get' },
  'POST /api/v1/post/': { controller: 'backend/PostController', action: 'add' },
  'PATCH /api/v1/post/:id/': { controller: 'backend/PostController', action: 'edit' },
  'PATCH /api/v1/post/': { controller: 'backend/PostController', action: 'trash' },

  // ALBUM
  'GET /api/v1/album/': { controller: 'backend/AlbumController', action: 'search' },
  'GET /api/v1/album/:id/': { controller: 'backend/AlbumController', action: 'get' },
  'POST /api/v1/album/': { controller: 'backend/AlbumController', action: 'add' },
  'PATCH /api/v1/album/:id/': { controller: 'backend/AlbumController', action: 'edit' },
  'PATCH /api/v1/album/': { controller: 'backend/AlbumController', action: 'trash' },

  // SCHOOL
  'GET /api/v1/school/': { controller: 'backend/SchoolController', action: 'search' },
  'GET /api/v1/school/:id/': { controller: 'backend/SchoolController', action: 'get' },
  'POST /api/v1/school/': { controller: 'backend/SchoolController', action: 'add' },
  'PATCH /api/v1/school/:id/': { controller: 'backend/SchoolController', action: 'edit' },
  'PATCH /api/v1/school/': { controller: 'backend/SchoolController', action: 'trash' },

  // CLASS
  'GET /api/v1/class/': { controller: 'backend/ClassController', action: 'search' },
  'GET /api/v1/class/:id/': { controller: 'backend/ClassController', action: 'get' },
  'POST /api/v1/class/': { controller: 'backend/ClassController', action: 'add' },
  'PATCH /api/v1/class/:id/': { controller: 'backend/ClassController', action: 'edit' },
  'PATCH /api/v1/class/': { controller: 'backend/ClassController', action: 'trash' },

  // SUBJECT
  'GET /api/v1/subject/': { controller: 'backend/SubjectController', action: 'search' },
  'GET /api/v1/subject/:id/': { controller: 'backend/SubjectController', action: 'get' },
  'POST /api/v1/subject/': { controller: 'backend/SubjectController', action: 'add' },
  'PATCH /api/v1/subject/:id/': { controller: 'backend/SubjectController', action: 'edit' },
  'PATCH /api/v1/subject/': { controller: 'backend/SubjectController', action: 'trash' },
  
  // COMMENT
  'GET /api/v1/comment/': { controller: 'backend/CommentController', action: 'search' },
  'GET /api/v1/comment/:id/': { controller: 'backend/CommentController', action: 'get' },
  'POST /api/v1/comment/': { controller: 'backend/CommentController', action: 'add' },
  'PATCH /api/v1/comment/:id/': { controller: 'backend/CommentController', action: 'edit' },
  'PATCH /api/v1/comment/': { controller: 'backend/CommentController', action: 'trash' },

  // MEDIA
  'GET /api/v1/media/': { controller: 'backend/MediaController', action: 'search' },
  'GET /api/v1/media/:id/': { controller: 'backend/MediaController', action: 'get' },
  'POST /api/v1/media/': { controller: 'backend/MediaController', action: 'add' },
  'PATCH /api/v1/media/:id/': { controller: 'backend/MediaController', action: 'edit' },
  'PATCH /api/v1/media/': { controller: 'backend/MediaController', action: 'trash' },
  'POST /api/v1/media/upload/': { controller: 'backend/MediaController', action: 'upload' },
  
  //FOOD
  'GET /api/v1/food/': { controller: 'backend/FoodController', action: 'search' },
  'GET /api/v1/food/:id/': { controller: 'backend/FoodController', action: 'get' },
  'POST /api/v1/food/': { controller: 'backend/FoodController', action: 'add' },
  'PATCH /api/v1/food/:id/': { controller: 'backend/FoodController', action: 'edit' },
  'PATCH /api/v1/food/': { controller: 'backend/FoodController', action: 'trash' },

  //NOTIFICATION
  'GET /api/v1/notification/': { controller: 'backend/NotificationController', action: 'search' },
  'GET /api/v1/notification/:id/': { controller: 'backend/NotificationController', action: 'get' },
  'POST /api/v1/notification/': { controller: 'backend/NotificationController', action: 'add' },
  'PATCH /api/v1/notification/:id/': { controller: 'backend/NotificationController', action: 'edit' },
  'PATCH /api/v1/notification/': { controller: 'backend/NotificationController', action: 'trash' },

  //SCHEDULE
  'GET /api/v1/schedule/': { controller: 'backend/ScheduleController', action: 'search' },
  'GET /api/v1/schedule/:id/': { controller: 'backend/ScheduleController', action: 'get' },
  'POST /api/v1/schedule/': { controller: 'backend/ScheduleController', action: 'add' },
  'PATCH /api/v1/schedule/:id/': { controller: 'backend/ScheduleController', action: 'edit' },
  'PATCH /api/v1/schedule/': { controller: 'backend/ScheduleController', action: 'trash' },

  //MENU
  'GET /api/v1/menu/': { controller: 'backend/MenuController', action: 'search' },
  'GET /api/v1/menu/:id/': { controller: 'backend/MenuController', action: 'get' },
  'POST /api/v1/menu/': { controller: 'backend/MenuController', action: 'add' },
  'POST /api/v1/menu/import/': { controller: 'backend/MenuController', action: 'importExcel' },
  'PATCH /api/v1/menu/:id/': { controller: 'backend/MenuController', action: 'edit' },
  'PATCH /api/v1/menu/': { controller: 'backend/MenuController', action: 'trash' },

    //ROLE
  'GET /api/v1/role/': { controller: 'backend/RoleController', action: 'search' },
  'GET /api/v1/role/:id/': { controller: 'backend/RoleController', action: 'get' },
  'POST /api/v1/role/': { controller: 'backend/RoleController', action: 'add' },
  'PATCH /api/v1/role/:id/': { controller: 'backend/RoleController', action: 'edit' },
  'PATCH /api/v1/role/': { controller: 'backend/RoleController', action: 'trash' },   
  // FILE
  'GET /assets/images/zadmin/uploads/*': { controller: 'backend/FileController', action: 'get' },
  
  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


});
