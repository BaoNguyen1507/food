/**
 * @copyright 2017 @ ZiniMediaTeam
 * @author brianvo
 * @create 2017/10/23 01:05
 * @update 2017/10/23 01:05
 * @file api/models/Schedule.js
 * @description :: Schedule  model.
 */

module.exports = {

    attributes: {
      time: {
        type: 'string',
        required: true
      },
      title: {
        type: 'string',
        required: true
      },
      date: {
        type: 'string'
      },
      message: {
        type: 'string'
      },
      status: {                           //Integer {"TRASH":,"DRAFT":,"PUBLISH":, SCHEDULE:}
        type: 'number',
        isIn: [sails.config.custom.STATUS.TRASH,sails.config.custom.STATUS.DRAFT,sails.config.custom.STATUS.PUBLISH],
        defaultsTo: sails.config.custom.STATUS.DRAFT
      }
    }
  };