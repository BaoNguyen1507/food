/**
 * @copyright 2017 @ ZiniMediaTeam
 * @author brianvo
 * @create 2017/10/23 01:05
 * @update 2017/10/23 01:05
 * @file api/models/Subject.js
 * @description :: Subject model -Môn học
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    code: {
      type: 'string',
      required: true,
    },
    alias: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true
    },
    status: {                           //Integer {"TRASH":-1,"DRAFT":0,"PUBLISH":1, SCHEDULE:2}
      type: 'number',
      isIn: [sails.config.custom.STATUS.TRASH,sails.config.custom.STATUS.DRAFT,sails.config.custom.STATUS.PUBLISH],
      defaultsTo: sails.config.custom.STATUS.DRAFT
    },
    students: {
      collection: 'student',
      via: 'subjects'
    }
  }
};
