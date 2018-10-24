/**
 * RoleController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const RoleError = require('../../../config/errors/role');
const RoleService = require('../../services/RoleService');
//Library
const moment = require('moment');

module.exports = {
 
  add: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK CONTENT PARAMS
    if (!params.title || !params.title.trim().length) {
      return res.badRequest(RoleError.ERR_CONTENT_REQUIRED);
    } else if (!params.permissions || !params.permissions.trim().length) {
      return res.badRequest(RoleError.ERR_CONTENT_REQUIRED);
    }

    // PREPARE DATA ROLE
    const newData = {
      title: params.title, // REQUIRED
      permissions: params.permissions, // REQUIRED
      description: params.description,
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      createdBy: req.session.userId
    };
    
    // ADD NEW DATA ROLE
    const newRole = await RoleService.add(newData);

    // RETURN DATA ROLE
    return res.ok(newRole);
  },

  get: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK ID PARAM
    if (!params.id) {
      return res.badRequest(roleError.ERR_ID_REQUIRED);
    }

    // QUERY & CHECK DATA ROLE
    const role = await RoleService.get({
      id: params.id
    });
    if (!role) {
      return res.notFound(RoleError.ERR_NOT_FOUND);
    }

    // RETURN DATA ROLE
    return res.json({
      data: role
    });
  },

  edit: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

     // CHECK CONTENT PARAMS
     if (!params.title || !params.title.trim().length) {
      return res.badRequest(RoleError.ERR_CONTENT_REQUIRED);
    } else if (!params.permissions || !params.permissions.trim().length) {
      return res.badRequest(RoleError.ERR_CONTENT_REQUIRED);
    }

    // PREPARE DATA ROLE
    const newData = {
      title: params.title, // REQUIRED
      permissions: params.permissions, // REQUIRED
      description: params.description,
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      createdBy: req.session.userId
    };

    // CHECK DATA ROLE
    const role = RoleService.get({ id: params.id });
    if (!role) {
      return res.notFound(RoleError.ERR_NOT_FOUND);
    }

    // UPDATE DATA ROLE
    const editObj = await RoleService.edit({ id: params.id }, newData);

    // RETURN DATA ROLE
    return res.json({
      data: editObj[0]
    });
  },

  trash: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK IDS PARAM
    if (!params.ids || !params.ids.length) {
      return res.badRequest(RoleError.ERR_ID_REQUIRED);
    }

    // CHECK ROLE & UPDATE
    const roles = await RoleService.find({
      id: params.ids
    });
    if (typeof params.ids === 'string') {
      if (!roles.length) {
        return res.badRequest(RoleError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    } else {
      if (roles.length !== params.ids.length) {
        return res.badRequest(RoleError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    }

    await Role.update({
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
    const notes = await RoleService.find(where, bodyParams.limit, bodyParams.offset, bodyParams.sort),
      total = await RoleService.count({
        status: {
          '>=': sails.config.custom.STATUS.ALL
        }
      }),
      trash = await RoleService.count({ status: sails.config.custom.STATUS.TRASH }),
      publish = await RoleService.count({ status: sails.config.custom.STATUS.PUBLISH });

    // RETURN DATA NOTIFICATION
    return res.json({
      recordsTotal: total,
      recordsTrash: trash,
      recordsPublish: publish,
      data: notes
    });
  }
};
