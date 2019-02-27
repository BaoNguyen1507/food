/**
 * @copyright 2017 @ ZiniMediaTeam
 * @author brianvo
 * @create 2017/10/23 01:05
 * @update 2017/10/23 01:05
 * @file api/models/Class.js
 * @description :: Class model.
 */

module.exports = {

  attributes: {
    className: {
      type: 'string',
      required: true,
      maxLength: 120,
      description: 'Name of facalty or class which are enrolled',
      example: 'Software Engineering'
    },
    totalStudent: {
      type: 'string',
      required: true,
      description: 'The number of students in each class',
      example: '60'
    },
    // Class infor
    admissionNumber: {
      type: 'number',
      required: true,
      description: 'Admission Number of the student',
      example: '1234567',
      //unique: true,
    },
    status: {                           //Integer {"TRASH":,"DRAFT":,"PUBLISH":, SCHEDULE:}
      type: 'number',
      isIn: [sails.config.custom.STATUS.TRASH, sails.config.custom.STATUS.DRAFT, sails.config.custom.STATUS.PUBLISH],
      defaultsTo: sails.config.custom.STATUS.DRAFT
    },
    students: {
      collection: 'student',
      via: 'class',
    },
    teachers: {
      collection: 'user',
      via: 'classes',
      description: 'The user who enroles this class.'
    },
    sdkClass: {
      type: 'string',
      required: true,
      description: 'The code of class'
    },
    attendent: {
      model: 'attendent'
    },
    school: {
      model: 'school',
      required: true
    },
    message: {
      collection: 'message',
      via: 'classes',
    },
    tuition: {
      model: 'tuition'
    }
  }
};

