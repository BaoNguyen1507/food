/**
 * ScheduleController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const ScheduleError = require('../../../config/errors/schedule');
const ScheduleService = require('../../services/ScheduleService');
//Library
const moment = require('moment');

module.exports = {
 
  add: async (req, res) => {
    sails.log.info("================================ ScheduleController.add => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();
    // CHECK FULLNAME & EMAILADDRESS & GENDER PARAMS
    if (!params.time) {
      return res.badRequest(ScheduleError.ERR_TITLE_REQUIRED);
    } else if (!params.title || !params.title.trim().length) {
      return res.badRequest(ScheduleError.ERR_TIME_REQUIRED);
    }

    // PREPARE DATA SCHEDULE
    const newData = {
      time: params.time, // REQUIRED
      title: params.title, // REQUIRED
      date: params.date,
      message: params.message,
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      createdBy: req.session.userId
    };
    
    // ADD NEW DATA SCHEDULE
    const newSchedule = await ScheduleService.add(newData);

    // RETURN DATA SCHEDULE
    return res.ok(newSchedule);
  },

  get: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK ID PARAM
    if (!params.id) {
      return res.badRequest(ScheduleError.ERR_ID_REQUIRED);
    }

    // QUERY & CHECK DATA POST
    const schedule = await ScheduleService.get({
      id: params.id
    });
    if (!schedule) {
      return res.notFound(ScheduleError.ERR_NOT_FOUND);
    }

    // RETURN DATA POST
    return res.json({
      data: schedule
    });
  },

  edit: async (req, res) => {
    sails.log.info("================================ ScheduleController.edit => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();
    if (!params.time) {
      return res.badRequest(ScheduleError.ERR_TITLE_REQUIRED);
    } else if (!params.title || !params.title.trim().length) {
      return res.badRequest(ScheduleError.ERR_TIME_REQUIRED);
    }

    // PREPARE DATA SCHEDULE
    const newData = {
      time: params.time, // REQUIRED
      title: params.title, // REQUIRED
      date: params.date,
      message: params.message,
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      createdBy: req.session.userId
    };

    // CHECK DATA SCHEDULE
    const schedule = ScheduleService.get({
      id: params.id
    });
    if (!schedule) {
      return res.notFound(ScheduleError.ERR_NOT_FOUND);
    }
    // UPDATE DATA SCHEDULE
    const editObj = await ScheduleService.edit({
      id: params.id
    }, newData);
    // RETURN DATA SCHEDULE
    return res.json({
      data: editObj[0]
    });
  },

  trash: async (req, res) => {
    sails.log.info("================================ ScheduleController.trash => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();
    // CHECK IDS PARAM
    if (!params.ids || !params.ids.length) {
      return res.badRequest(ScheduleError.ERR_ID_REQUIRED);
    }
    // CHECK Schedule & UPDATE
    const schedules = await ScheduleService.find({
      id: params.ids
    });
    if (typeof params.ids === 'string') {
      if (!schedules.length) {
        return res.badRequest(ScheduleError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    } else {
      if (schedules.length !== params.ids.length) {
        return res.badRequest(ScheduleError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    }
    await Schedule.update({
      id: params.ids
    }).set({
      status: 3
    });
    // RETURN DATA
    return res.json();
  },

  search: async (req, res) => {
    sails.log.info("================================ ScheduleController.search => START ================================");
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
        time: {
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
    // QUERY DATA SCHEDULE
    const schedules = await ScheduleService.find(where, bodyParams.limit, bodyParams.offset, bodyParams.sort),
      total = await ScheduleService.count({
        status: {
          '>=': sails.config.custom.STATUS.ALL
        }
      }),
      trash = await ScheduleService.count({ status: sails.config.custom.STATUS.TRASH }),
      publish = await ScheduleService.count({ status: sails.config.custom.STATUS.PUBLISH });

    // RETURN DATA SCHEDULE
    return res.json({
      recordsTotal: total,
      recordsTrash: trash,
      recordsPublish: publish,
      data: schedules
    });
  }
};
