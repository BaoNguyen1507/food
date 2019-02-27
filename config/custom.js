/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /**************************************************************************
  *                                                                         *
  * The base URL to use during development.                                 *
  *                                                                         *
  * • No trailing slash at the end                                          *
  * • `http://` or `https://` at the beginning.                             *
  *                                                                         *
  * > This is for use in custom logic that builds URLs.                     *
  * > It is particularly handy for building dynamic links in emails,        *
  * > but it can also be used for user-uploaded images, webhooks, etc.      *
  *                                                                         *
  **************************************************************************/
  // baseUrl: 'http://ekidpro.api.test.zinimedia.com:1338',
  baseUrl: 'http://localhost:1338',

  BACKEND: {

    LOGIN: {
      ID: 'login',
      URL: '/backend/login'
    },
    CATEGORY: {
      ID: 'category',
      URL: '/backend/category' //Alwas SETTING URL = window.location.pathname to MATCH on frontend (main.js)
    },
    TAG: {
      ID: 'tag',
      URL: '/backend/tag' //Alwas SETTING URL = window.location.pathname to MATCH on frontend (main.js)
    },
    PARENT: {
      ID: 'parent',
      URL: '/backend/parent'
    },
    SCHOOL: {
      ID: 'school',
      URL: '/backend/school'
    },
    ALL: {
      ID: 'all',
      URL: '?status=-1'
    },
    PUBLISH: {
      ID: 'publish',
      URL: '?status=1'
    },
    DRAFT: {
      ID: 'draft',
      URL: '?status=0'
    },
    TRASH: {
      ID: 'trash',
      URL: '?status=3'
    },
    CLASS: {
      ID: 'class',
      URL: '/backend/class'
    },
    STUDENT: {
      ID: 'student',
      URL: '/backend/student'
    },
    SETTING: {
      ID: 'setting',
      URL: '/backend/setting'
    },
    FOOD: {
      ID: 'food',
      URL: '/backend/food'
    },
    COMMENT: {
      ID: 'comment',
      URL: '/backend/comment'
    }
  },
  STATUS: {
    ALL: -1,
    DRAFT: 0,
    PUBLISH: 1,
    SCHEDULE: 2,
    TRASH: 3,
    TRIAL: 4
  },
  TYPE: {
    //USER
    STAFF: 0,
    TEACHER: 1,
    //TUITION
    NOTPAID: 0,
    PAID: 1,
    //NOTE
    ALL: 2,
    BGH: 3,
    PARENT: 4,
    //For TAXONOMY
    CATEGORY: 0,
    TAG: 1,
    //For School
    SCHOOL: 2,
    //For PARENT
    MOTHER: 3,
    FATHER: 4,
    CUSTODIAN: 5, 
    //For Class
    CLASS: 0,
    //For Student
    STUDENT: 0,
    //For Setting
    SETTING: 0,
    //For Food
    FOOD: 0,
    //For Comment
    COMMENT: 0,
    //For Media 
    IMAGE: 0,
    VIDEO: 1,
    FILE: 2,
    //For Message
    PRIVATE: 0,
    PUBLIC: 1,
    //For Thumb
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal',
    SQUARE: 'square',
    //For Parent
    MOTHER: 0,
    FATHER: 1,
    OTHERS: 2,

    //For Subject
    SYLLABUS: 0,
    FOOD: 1
  },
  UPLOAD: {
    EXTENSION: ['.png', '.jpg', '.jpeg', '.gif'],
    THUMB: {            //video
      VERTICAL: {
        width: 200,
        height: 300,
        name: 'vertical'
      },
      HORIZONTAL: {
        width: 400,
        height: 300,
        name: 'horizontal'
      },
      SQUARE: {
        width: 65,
        height: 65,
        name: 'square'
      }
    }
  }
};
