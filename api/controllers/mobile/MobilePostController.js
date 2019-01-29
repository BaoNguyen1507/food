/**
 * PostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const PostError = require('../../../config/errors/post');
const PostService = require('../../services/PostService');
const MediaService = require('../../services/MediaService');
const CommentError = require('../../../config/errors/comment');
const CommentService = require('../../services/CommentService');

//Library
const moment = require('moment');

module.exports = {

  list: async (req, res) => {
    let params = req.allParams();
    
    let newPost = await await NotificationService.find({
      status: sails.config.custom.STATUS.PUBLISH
    }, params.limit, (params.page-1) * params.limit, params.sort);
    
    let listMedia = await MediaService.find();

    for (let i = 0; i < newPost.length; i++){
      for (let y = 0; y < listMedia.length; y++){
        if (newPost[i].thumbnail == listMedia[y].id) {  
          newPost[i].thumbnail = listMedia[y];
        }
      }
    }
    
    return res.json({
      code: 'SUCCESS_200',
      data: newPost
    });
  },

  addComment: async (req, res) => {
    let params = req.allParams();
     // CHECK CONTENT PARAMS
     if (!params.contentCmt || !params.contentCmt.trim().length) {
      return res.badRequest(CommentError.ERR_CONTENT_REQUIRED);
    }
    const newData = {
      contentCmt: params.contentCmt, // REQUIRED
    };
    // ADD NEW DATA COMMENT
    const newComment = await CommentService.add(newData);

    // RETURN DATA COMMENT
    return res.ok(newComment);
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

  search: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // PREAPARE BODY PARAMS
    const bodyParams = {
      filter: (params.filter && params.filter.trim().length) ? JSON.parse(params.filter) : null,
      limit: params.limit ? Number(params.limit) : null,
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
