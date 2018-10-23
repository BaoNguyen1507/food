/**
 * @copyright 2017 @ ZiniMediaTeam
 * @author brianvo
 * @create 2017/10/23 01:05
 * @update 2017/10/23 01:05
 * @file api/models/Setting.js
 * @description :: Setting model.
 */

module.exports = {

  attributes: {
    version: {
      required: true,
      type: 'string',
      description: 'show the version of the Application',
      example: '1.0.1'
    },
    description: {
      required: true,
      type: 'string'
    },
    type: {                             //category, tag
      type: 'number',
      isIn: [sails.config.custom.TYPE.SETTING,sails.config.custom.TYPE.TAG],
      defaultsTo: sails.config.custom.TYPE.SETTING
    },
    status: {                           //Integer {"TRASH":-1,"DRAFT":0,"PUBLISH":1}
      type: 'number',
      isIn: [sails.config.custom.STATUS.TRASH,sails.config.custom.STATUS.DRAFT,sails.config.custom.STATUS.PUBLISH],
      defaultsTo: sails.config.custom.STATUS.DRAFT
    },
    // web: {
    //   type: 'json'
    // },
    // app: {
    //   type: 'json'
    // },
    uploadBy: {
      model: 'user'
    }
  }
};
