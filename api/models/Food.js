/**
 * @copyright 2017 @ ZiniMediaTeam
 * @author brianvo
 * @create 2017/10/23 01:05
 * @update 2017/10/23 01:05
 * @file api/models/Subject.js
 * @description :: Subject model.
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    foodCode: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
    },
    nutrition: {
      type: 'string',
    },
    status: {                           //Integer {"TRASH":,"DRAFT":,"PUBLISH":, SCHEDULE:}
      type: 'number',
      isIn: [sails.config.custom.STATUS.TRASH,sails.config.custom.STATUS.DRAFT,sails.config.custom.STATUS.PUBLISH],
      defaultsTo: sails.config.custom.STATUS.DRAFT
    },
    thumbnail: {
      type:'json'
    }
  }
};
