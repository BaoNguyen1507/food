/**
 * @copyright 2017 @ ZiniMediaTeam
 * @author brianvo
 * @create 2017/10/23 01:05
 * @update 2017/10/23 01:05
 * @file api/models/Media.js
 * @description :: Media model.
 */

module.exports = {
  attributes: {
    title: {                            // 
      type: 'string',
      required: true,
      description: 'The title is how it appears on your site',
      example: 'Hello ZiniMedia Team'
    },
    path: {                            // 
      type: 'string',
      required: true,
      description: 'The “path” is the path of the filename. It is usually all lowercase and contains only letters, numbers, and hyphens.',
      example: 'hello-zinimedia-team.jpg'
    },
    caption: {                      // 
      type: 'string',
      description: 'The caption is how it talks on your filename.',
      example: 'The awesome picture'
    },
    status: {                           //Integer {"TRASH":,"DRAFT":,"PUBLISH":, SCHEDULE:}
      type: 'number',
      isIn: [sails.config.custom.STATUS.TRASH,sails.config.custom.STATUS.DRAFT,sails.config.custom.STATUS.PUBLISH],
      defaultsTo: sails.config.custom.STATUS.DRAFT
    },
    // uploadBy: {
    //   model: 'user',
    //   description: 'The user who created this item.'
    // },
    school: {
      model:'school'
    }
  }
};