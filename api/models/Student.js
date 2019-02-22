/**
 * @copyright 2017 @ ZiniMediaTeam
 * @author brianvo
 * @create 2017/10/23 01:05
 * @update 2017/10/23 01:05
 * @file api/models/Student.js
 * @description :: Student model.
 */

module.exports = {
  attributes: {
    //Student Information

    fullName: {
      type: 'string',
      required: true,
      description: 'The full name of the student',
      example: 'Nguyen Thanh Duy',
      maxLength: 120
    },
    dateOfBirth: {
      type: 'string',
      required: true,
      description: 'BirthDay of the student',
      example: '1995-09-11'
    },
    gender: {
      type: 'string',
      required: true,
      description: 'Gender of the student',
      example: 'Male',
    },
    //Address Detail
    currentAddress: {
      type: 'string',
      maxLength: 255,
      description: 'student current address',
      example: 'abc street, disctrict 5, HCM city'
    },
    height: {
      type: 'number',
      description: 'student height',
      example: '85.5'
    },
    weight: {
      type: 'number',
      description: 'student weight',
      example: '10'
    },
    bloodGroup: {
      type: 'string',
      description: 'Student blood group',
      example: 'AB, O, A'
    },
    allergy: {
      type: 'string',
      description: 'which food student can not eat',
      example: 'seafood, chicken'
    },
    heartRate: {
      type: 'string',
      description: 'Heart rate of student',
      example: 'normal, slow, fast'
    },
    eyes: {
      type: 'string',
      description: 'eyes of student',
      example: 'good, not good'
    },
    ears: {
      type: 'string',
      description: 'ears of student',
      example: 'good,not good'
    },
    notes: {
      type: 'string'
    },
    healthHistory: {
      type: 'json',
      defaultsTo: [{ date: "0", symptom:"0", note:"0" }]
    },
    w_h_History: {
      type: 'json',
      defaultsTo: [{ date: "0", height:0, weight:0 }]
    },
    avatar: {
      type: 'json',
      // required: true,
      description: 'Choose your picture for Avarta'
    },

    // Date of admission and interacting
    admissionDate: {
      type: 'string',
      // required: true,
      description: 'Date that student joined in',
      example: '2018-09-11'
    },
    status: {                           //Integer {"TRASH":-1,"DRAFT":0,"PUBLISH":1}
      type: 'number',
      isIn: [sails.config.custom.STATUS.TRASH, sails.config.custom.STATUS.DRAFT, sails.config.custom.STATUS.PUBLISH],
      defaultsTo: sails.config.custom.STATUS.DRAFT
    },
    owner: {
      model: 'user',
      description: 'The user who created the information.'
    },
    class: {
      collection: 'class',
      via: 'students',
      // dominant: true
    },
    subjects: {
      collection: 'subject',
      via: 'students'
    },
    parents: {
      collection: 'parent',
      via: 'students'
    },
    attendent: {
      collection: 'attendent',
      via: 'students'
    }
  }
};
