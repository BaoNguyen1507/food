/**
 * @copyright 2017 @ ZiniMediaTeam
 * @author brianvo
 * @create 2017/10/23 01:05
 * @update 2017/10/23 01:05
 * @file api/models/Post.js
 * @description :: Post model.
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    alias: {
      type: 'string',
      required: true,
      
    },
    motto: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    metaTitle: {
      type: 'string'
    },
    metaDescription: {
      type: 'string'
    },
    thumbnail: {
      type: 'json'
    }, 
    comments: { //LOAD ARRAY COMMENT with 4 atts: NAME, comment, time, avatar
      type: 'json'
    },
    status: {                           //Integer {"TRASH":-1,"DRAFT":0,"PUBLISH":1, SCHEDULE:2}
      type: 'number',
      isIn: [sails.config.custom.STATUS.TRASH,sails.config.custom.STATUS.DRAFT,sails.config.custom.STATUS.PUBLISH,sails.config.custom.STATUS.SCHEDULE],
      defaultsTo: sails.config.custom.STATUS.DRAFT
    },
    author: {
      model: 'user' //For AUTHOR INFO
    },
    categories: {
      collection: 'taxonomy',
      via: 'postsOfCategory',
      dominant: true
    },
    tags: {
      collection: 'taxonomy',
      via: 'postsOfTag',
      dominant: true
    },
  }
};
