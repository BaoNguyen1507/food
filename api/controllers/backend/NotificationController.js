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

  add: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    if (!params.title || !params.title.trim().length) {
      return res.badRequest(NotificationError.ERR_TITLENOTE_REQUIRED);
    }
    console.log('params.noteType', params.noteType);
    let _noteType = '';
    if(params.noteType){
      let count = 0;
      if(params.noteType.teacher){
        count++;
        _noteType += sails.config.custom.TYPE.TEACHER + '|'; 
      } 
      if(params.noteType.bgh){
        count++;
        _noteType += sails.config.custom.TYPE.BGH + '|'; 
      }
      if(params.noteType.parent){
        count++;
        _noteType += sails.config.custom.TYPE.PARENT + '|'; 
      }
      _noteType = (count == 3?sails.config.custom.TYPE.ALL:_noteType);
    }

    // PREPARE DATA NOTIFICATION
    const newData = {
      title: params.title, // REQUIRED
      message: params.message ? params.message : '',
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      noteType: _noteType
    };

    // ADD NEW DATA NOTIFICATION
    const newNotification = await NotificationService.add(newData);

    // RETURN DATA NOTIFICATION
    return res.json({
      data: newNotification
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


  edit: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    if (!params.title || !params.title.trim().length) {
      return res.badRequest(NotificationError.ERR_TITLENOTE_REQUIRED);
    }

    // PREPARE DATA NOTIFICATION
    const newData = {
      title: params.title, // REQUIRED
      message: params.message ? params.message : '',
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      noteType: params.noteType.length ? params.noteType : [sails.config.custom.TYPE.ALL]
    };

    // CHECK DATA NOTIFICATION
    const notification = NotificationService.get({
      id: params.id
    });
    if (!notification) {
      return res.notFound(NotificationError.ERR_NOT_FOUND);
    }

    // UPDATE DATA NOTIFICATION
    const editObj = await NotificationService.edit({
      id: params.id
    }, newData);

    // RETURN DATA NOTIFICATION
    return res.json({
      data: editObj[0]
    });
  },


  trash: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK IDS PARAM
    if (!params.ids || !params.ids.length) {
      return res.badRequest(NotificationError.ERR_ID_REQUIRED);
    }

    // CHECK NOTIFICATION & UPDATE
    const notes = await NotificationService.find({
      id: params.ids
    });
    if (typeof params.ids === 'string') {
      if (!notes.length) {
        return res.badRequest(NotificationError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    } else {
      if (notes.length !== params.ids.length) {
        return res.badRequest(NotificationError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    }

    await Notifications.update({
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