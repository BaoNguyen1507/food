/**
 * @copyright 2017 @ ZiniMediaTeam
 * @author brianvo
 * @create 2017/10/23 01:05
 * @update 2017/10/23 01:05
 * @file api/models/Attendent.js
 * @description :: Attendent model.
 */

module.exports = {

  attributes: {
    students: {
      collection: 'student',
      via: 'attendent'
    },
    dateOff: {
      type: 'string',
    },
    classID: { 
      model: 'class'
    },
    status: {                           //Integer {"TRASH":,"DRAFT":,"PUBLISH":, SCHEDULE:}
      type: 'number',
      isIn: [sails.config.custom.STATUS.TRASH, sails.config.custom.STATUS.DRAFT, sails.config.custom.STATUS.PUBLISH],
      defaultsTo: sails.config.custom.STATUS.DRAFT
    }
  }
};