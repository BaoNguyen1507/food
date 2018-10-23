/**
 * @copyright 2017 @ ZiniMediaTeam
 * @author brianvo
 * @create 2017/10/23 01:05
 * @update 2017/10/23 01:05
 * @file api/models/Taxonomy.js
 * @description :: Taxonomy model.
 */

module.exports = {
  attributes: {
    title: {                            //category, tag
      type: 'string',
      required: true,
      description: 'The title is how it appears on your site',
      example: 'Hello ZiniMedia Team'
    },
    alias: {                            //category, tag
      type: 'string',
      required: true,
      description: 'The “alias” is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.',
      example: 'hello-zinimedia-team'
    },
    parent: {                           //category
      type: 'string',
      description: 'Categories, unlike tags, can have a hierarchy. You might have a Jazz category, and under that have children categories for Bebop and Big Band. Totally optional.'
    },
    description: {                      //category, tag
      type: 'string',
      description: 'The description is how it talks on your site.',
      example: 'We try creating awesome CMS project base on SailsJS and MongoDB'
    },
    type: {                             //category, tag
      type: 'number',
      isIn: [sails.config.custom.TYPE.CATEGORY,sails.config.custom.TYPE.TAG],
      defaultsTo: sails.config.custom.TYPE.CATEGORY
    },
    order: {                            //Integer
      type: 'number',
      defaultsTo: 1
    },
    status: {                           //Integer {"TRASH":-1,"DRAFT":0,"PUBLISH":1}
      type: 'number',
      isIn: [sails.config.custom.STATUS.TRASH, sails.config.custom.STATUS.DRAFT, sails.config.custom.STATUS.PUBLISH],
      defaultsTo: sails.config.custom.STATUS.DRAFT
    },
    postsOfCategory: {                  //For Categories
      collection: 'post',
      via: 'categories',
      dominant: true,
      description: 'List posts that editor add to a category'
    },
    postsOfTag: {                       //For Tags
      collection: 'post',
      via: 'tags',
      dominant: true,
      description: 'List posts that editor add to a tag'
    },
    createdBy: {
      model: 'user',
      description: 'The user who created this item.'
    }
  }
};