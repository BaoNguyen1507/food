/**
 * PostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const PostError = require('../../../config/errors/post');
const PostService = require('../../services/PostService');

//Library
const moment = require('moment');

module.exports = {
  add: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK TITLE, ALIAS, MOTTO & DESCRIPTION PARAMS
    if (!params.title || !params.title.trim().length) {
      return res.badRequest(PostError.ERR_TITLE_REQUIRED);
    } else if (!params.alias || !params.alias.trim().length) {
      return res.badRequest(PostError.ERR_ALIAS_REQUIRED);
    } else if (!params.motto || !params.motto.trim().length) {
      return res.badRequest(PostError.ERR_MOTTO_REQUIRED);
    } else if (!params.description || !params.description.trim().length) {
      return res.badRequest(PostError.ERR_DESCRIPTION_REQUIRED);
    }

    // PREPARE DATA POST
    const newData = {
      title: params.title, // REQUIRED
      alias: params.alias, // REQUIRED
      motto: params.motto, // REQUIRED
      description: params.description, // REQUIRED
      metaTitle: (params.metaTitle && params.metaTitle.trim().length) ? params.metaTitle : '',
      metaDescription: (params.metaDescription && params.metaDescription.trim().length) ? params.metaDescription : '',
      thumbnail: params.thumbnail,
      comments: params.comments,
      status: (params.status && params.status !== 0) ? params.status : sails.config.custom.STATUS.DRAFT,
      author: params.author
    };

    // ADD NEW DATA POST
    const newPost = await PostService.add(newData);

    // RETURN DATA POST
    return res.json({
      data: newPost
    });
  },

  get: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK ID PARAM
    if (!params.id) {
      return res.badRequest(PostError.ERR_ID_REQUIRED);
    }

    // QUERY & CHECK DATA POST
    const post = await PostService.get({
      id: params.id
    });
    if (!post) {
      return res.notFound(PostError.ERR_NOT_FOUND);
    }

    // RETURN DATA POST
    return res.json({
      data: post
    });
  },

  edit: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK TITLE, ALIAS, MOTTO & DESCRIPTION PARAMS
    if (!params.title || !params.title.trim().length) {
      return res.badRequest(PostError.ERR_TITLE_REQUIRED);
    } else if (!params.alias || !params.alias.trim().length) {
      return res.badRequest(PostError.ERR_ALIAS_REQUIRED);
    } else if (!params.motto || !params.motto.trim().length) {
      return res.badRequest(PostError.ERR_MOTTO_REQUIRED);
    } else if (!params.description || !params.description.trim().length) {
      return res.badRequest(PostError.ERR_DESCRIPTION_REQUIRED);
    }

    // PREPARE DATA POST
    const newData = {
      title: params.title, // REQUIRED
      alias: params.alias, // REQUIRED
      motto: params.motto, // REQUIRED
      description: params.description, // REQUIRED
      metaTitle: (params.metaTitle && params.metaTitle.trim().length) ? params.metaTitle : '',
      metaDescription: (params.metaDescription && params.metaDescription.trim().length) ? params.metaDescription : '',
      thumbnail: params.thumbnail,
      comments: params.comments,
      status: (params.status && params.status !== 0) ? params.status : sails.config.custom.STATUS.DRAFT,
      author: params.author
    };

    // CHECK DATA POST
    const post = PostService.get({
      id: params.id
    });
    if (!post) {
      return res.notFound(PostError.ERR_NOT_FOUND);
    }

    // UPDATE DATA POST
    const editObj = await PostService.edit({
      id: params.id
    }, newData);

    // RETURN DATA POST
    return res.json({
      data: editObj[0]
    });
  },

  trash: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK IDS PARAM
    if (!params.ids || !params.ids.length) {
      return res.badRequest(PostError.ERR_ID_REQUIRED);
    }

    // CHECK POST & UPDATE
    const posts = await PostService.find({
      id: params.ids
    });
    if (typeof params.ids === 'string') {
      if (!posts.length) {
        return res.badRequest(PostError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    } else {
      if (posts.length !== params.ids.length) {
        return res.badRequest(PostError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    }

    await Post.update({
      id: params.ids
    }).set({
      status: sails.config.custom.STATUS.TRASH
    });

    // RETURN DATA
    return res.json();
  },

  search: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // PREAPARE BODY PARAMS
    const bodyParams = {
      filter: (params.filter && params.filter.trim().length) ? JSON.parse(params.filter) : null,
      limit: (params.limit !== 'null') ? params.limit : 10,
      offset: params.offset ? Number(params.offset) : null,
      sort: (params.sort && params.sort.trim().length) ? JSON.parse(params.sort) : null
    };

    let where = {};
    if (bodyParams.filter.status) {
      where = {
        status: bodyParams.filter.status === sails.config.custom.STATUS.ALL ? {
          '>=': sails.config.custom.STATUS.ALL
        } : bodyParams.filter.status
      }
    } else if (bodyParams.filter.rangeDate.active) {
      where = {
        createdAt: {
          '>=': moment(bodyParams.filter.rangeDate.begin).valueOf(),
          '<=': moment(bodyParams.filter.rangeDate.end).valueOf()
        }
      }
    } else if (typeof bodyParams.filter.keyWord === "string" && bodyParams.filter.keyWord.trim().length) {
      where = {
        or: [{
          title: {
            contains: bodyParams.filter.keyWord
          }
        }, {
          motto: {
            contains: bodyParams.filter.keyWord
          }
        }]
      }
    } else {
      // nothing to do
    }

    let condition;
    if (params.condition && !Utils.isJsonString(params.condition)) {
      return res.serverError(ErrorService.SYSTEM_JSON_FORMAT_FAIL);
    } else {
      condition = (params.condition) ? JSON.parse(params.condition) : null;
    }

    if (condition) {
      where = condition;
    }

    // QUERY DATA  POST
    const posts = await PostService.find(where, bodyParams.limit, bodyParams.offset, bodyParams.sort),
      total = await PostService.count({
        status: {
          '>=': sails.config.custom.STATUS.ALL
        }
      }),
      trash = await PostService.count({ status: sails.config.custom.STATUS.TRASH }),
      publish = await PostService.count({ status: sails.config.custom.STATUS.PUBLISH });

    // RETURN DATA POST
    return res.json({
      recordsTotal: total,
      recordsTrash: trash,
      recordsPublish: publish,
      data: posts
    });
  }
};
