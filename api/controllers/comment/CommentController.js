/**
 * CommentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const CommentError = require('../../../config/errors/comment');
const CommentService = require('../../services/CommentService');
//Library
const moment = require('moment');

module.exports = {
 
  add: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK CONTENT PARAMS
    if (!params.contentCmt || !params.contentCmt.trim().length) {
      return res.badRequest(CommentError.ERR_CONTENT_REQUIRED);
    }

    // PREPARE DATA COMMENT
    const newData = {
      contentCmt: params.contentCmt, // REQUIRED
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      createdBy: req.session.userId
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
      return res.badRequest(CommentError.ERR_ID_REQUIRED);
    }

    // QUERY & CHECK DATA COMMENT
    const comment = await CommentService.get({
      id: params.id
    });
    if (!comment) {
      return res.notFound(CommentError.ERR_NOT_FOUND);
    }

    // RETURN DATA COMMENT
    return res.json({
      data: comment
    });
  },

  edit: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK CONTENT PARAMS
    if (!params.contentCmt || !params.contentCmt.trim().length) {
      return res.badRequest(CommentError.ERR_CONTENT_REQUIRED);
    }

    // PREPARE DATA COMMENT
    const newData = {
      contentCmt: params.contentCmt, // REQUIRED
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      createdBy: req.session.userId
    };

    // CHECK DATA COMMENT
    const comment = CommentService.get({
      id: params.id
    });
    if (!comment) {
      return res.notFound(CommentError.ERR_NOT_FOUND);
    }

    // UPDATE DATA COMMENT
    const editObj = await CommentService.edit({
      id: params.id
    }, newData);

    // RETURN DATA COMMENT
    return res.json({
      data: editObj[0]
    });
  },

  trash: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK IDS PARAM
    if (!params.ids || !params.ids.length) {
      return res.badRequest(CommentError.ERR_ID_REQUIRED);
    }

    // CHECK COMMENT & UPDATE
    const comments = await CommentService.find({
      id: params.ids
    });
    if (typeof params.ids === 'string') {
      if (!comments.length) {
        return res.badRequest(CommentError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    } else {
      if (comments.length !== params.ids.length) {
        return res.badRequest(CommentError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    }

    await Comment.update({
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
        contentCmt: {
          contains: bodyParams.filter.keyWord
        }
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

    // QUERY DATA NOTIFICATION
    const notes = await CommentService.find(where, bodyParams.limit, bodyParams.offset, bodyParams.sort),
      total = await CommentService.count({
        status: {
          '>=': sails.config.custom.STATUS.ALL
        }
      }),
      trash = await CommentService.count({ status: sails.config.custom.STATUS.TRASH }),
      publish = await CommentService.count({ status: sails.config.custom.STATUS.PUBLISH });

    // RETURN DATA NOTIFICATION
    return res.json({
      recordsTotal: total,
      recordsTrash: trash,
      recordsPublish: publish,
      data: notes
    });
  }
};
