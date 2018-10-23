/**
 * @copyright 2017 @ ZiniMedia Team
 * @author thanhvo
 * @create 2017/10/25 10:52
 * @update 2017/10/25 10:52
 * @file api/controllers/NotificationController.js
 */

const NotificationError = require('../../../config/errors/notification');
const NotificationService = require('../../services/NotificationService');
const moment = require('moment');

const BackendNotificationController = {

  newNote: async (req, res) => {
    let params = req.allParams();
    let sizeNote = 10;
    let fromPosition = (params.page - 1) * sizeNote;
    let newNote = await NotificationService.find({ status: sails.config.custom.STATUS.PUBLISH }, sizeNote, fromPosition, null);
    
    return res.json({
      code: 'SUCCESS_200',
      data: newNote
    });
  },

  get: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK ID PARAM
    if (!params.id) {
      return res.badRequest(NotificationError.ERR_ID_REQUIRED);
    }

    // QUERY & CHECK DATA NOTIFICATION
    const note = await NotificationService.get({
      id: params.id
    });
    if (!note) {
      return res.notFound(NotificationError.ERR_NOT_FOUND);
    }

    // RETURN DATA NOTIFICATION
    return res.json({
      data: note
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
        title: {
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
    const notes = await NotificationService.find(where, bodyParams.limit, bodyParams.offset, bodyParams.sort),
      total = await NotificationService.count({
        status: {
          '>=': sails.config.custom.STATUS.ALL
        }
      }),
      trash = await NotificationService.count({ status: sails.config.custom.STATUS.TRASH }),
      publish = await NotificationService.count({ status: sails.config.custom.STATUS.PUBLISH });

    // RETURN DATA NOTIFICATION
    return res.json({
      recordsTotal: total,
      recordsTrash: trash,
      recordsPublish: publish,
      data: notes
    });
  }
};

module.exports = BackendNotificationController;