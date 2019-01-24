/**
 * @copyright 2017 @ ZiniMediaTeam
 * @author brianvo
 * @create 2017/10/23 01:05
 * @update 2017/10/23 01:05
 * @file api/models/Album.js
 * @description :: Album model.
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true,
      maxLength: 100,
      example: 'Example'
    },
    description: {
      type: 'string',
      maxLength: 200,
      example: 'Example is Description'
    },
    totalLike: { 
      type: 'number',
      defaultsTo: 0
    },
    totalComment: {
      type: 'number',
      defaultsTo: 0
    },
    status: {                           //Integer {"TRASH":,"DRAFT":,"PUBLISH":, SCHEDULE:}
      type: 'number',
      isIn: [sails.config.custom.STATUS.TRASH, sails.config.custom.STATUS.DRAFT, sails.config.custom.STATUS.PUBLISH],
      defaultsTo: sails.config.custom.STATUS.DRAFT
    },
    owner: {
      model: 'user'
    },
    comments: { //LOAD ARRAY COMMENT with 4 atts: NAME, comment, time, avatar
      type: 'json'
    },
    photos: {
      type: 'json',
      defaultsTo: [], //Load arrray MEDIA IDs: ObjectId:["20232332", "3545353543"]
      description:'photos belong to the album'
    }
  }
};