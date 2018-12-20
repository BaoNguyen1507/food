/**
 * ClassController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const ClassError = require('../../../config/errors/class');
const ClassService = require('../../services/ClassService');
//Library
const moment = require('moment');

module.exports = {

  add: async (req, res) => {
    sails.log.info("================================ ClassController.add => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK TOTALSTUDENT & ADMISSIONNUMBER
    if (params.admissionNumber > 150) {
      return res.badRequest(ClassError.ERR_LIMIT_REQUIRED);
    } else if (params.totalStudent < 30) {
      // return res.badRequest(ClassError.ERR_MINIMUM_REQUIRED);
    } else if (params.admissionNumber < params.totalStudent) {
      return res.badRequest(ClassError.ERR_OVERADMISSION_REQUIRED);
    }

    // CHECK FULLNAME, EMAILADDRESS & GENDER PARAMS
    if (!params.className || !params.className.trim().length) {
      return res.badRequest(ClassError.ERR_NAME_REQUIRED);
    } else if (!params.totalStudent) {
      return res.badRequest(ClassError.ERR_TOTALSTUDENT_REQUIRED);
    } else if (!params.admissionNumber) {
      return res.badRequest(ClassError.ERR_ADMISSIONNUMBER_REQUIRED);
    } else if (!params.sdkClass) {
      return res.badRequest(ClassError.ERR_SDKCLASS_REQUIRED);
    }

    //  CHECK SDKCLASS EXIST
    const foundSdkClass = await ClassService.find({
      sdkClass: params.sdkClass
    });

    if (foundSdkClass.length) {
      return res.badRequest(ClassError.ERR_SDKCLASS_EXISTED);
    }
    let students = params.students;
    // PREPARE DATA CLASS
    const newData = {
      className: params.className, // REQUIRED
      totalStudent: params.totalStudent, // REQUIRED
      admissionNumber: params.admissionNumber, // REQUIRED
      sdkClass: params.sdkClass, // REQUIRED
      students: students,
      //school: params.school,
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      createdBy: req.session.userId
    };

    // ADD NEW DATA CLASS
    const newClass = await ClassService.add(newData);
    if (students) {
      Class.addToCollection(newClass.id, 'students', students).exec(function (err) { });
    }
    //CREATE RELATIONSHIP BETWEEN STUDENT AND SUBJECT
    // if (school) {
    //   await Class.addToCollection(newClass.id, 'school', school).exec(function (err) { });
    // }

    // RETURN DATA CLASS
    return res.ok(newClass);
  },

  get: async (req, res) => {
    sails.log.info("================================ ClassController.get => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK ID PARAM
    if (!params.id) {
      return res.badRequest(ClassError.ERR_ID_REQUIRED);
    }

    // QUERY & CHECK DATA CLASS
    const classes = await ClassService.get({
      id: params.id
    });
    if (!classes) {
      return res.notFound(ClassError.ERR_NOT_FOUND);
    }

    // RETURN DATA CLASS
    return res.json({
      data: classes
    });
  },

  edit: async (req, res) => {
    sails.log.info("================================ ClassController.edit => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK TOTALSTUDENT & ADMISSIONNUMBER
    if (params.admissionNumber > 150) {
      return res.badRequest(ClassError.ERR_LIMIT_REQUIRED);
    } else if (params.totalStudent < 30) {
      // return res.badRequest(ClassError.ERR_MINIMUM_REQUIRED);
    } else if (params.admissionNumber < params.totalStudent) {
      return res.badRequest(ClassError.ERR_OVERADMISSION_REQUIRED);
    } else if (!params.sdkClass) {
      return res.badRequest(ClassError.ERR_SDKCLASS_REQUIRED);
    }

    // CHECK FULLNAME, EMAILADDRESS & GENDER PARAMS
    if (!params.className || !params.className.trim().length) {
      return res.badRequest(ClassError.ERR_NAME_REQUIRED);
    } else if (!params.totalStudent) {
      return res.badRequest(ClassError.ERR_TOTALSTUDENT_REQUIRED);
    } else if (!params.admissionNumber) {
      return res.badRequest(ClassError.ERR_ADMISSIONNUMBER_REQUIRED);
    }

    const newData = {
      className: params.className, // REQUIRED
      totalStudent: params.totalStudent, // REQUIRED
      admissionNumber: params.admissionNumber,// REQUIRED
      sdkClass: params.sdkClass, // REQUIRED
      //school: params.school,
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      createdBy: req.session.userId
    };
    // CHECK DATA CLASS
    const classes = ClassService.get({
      id: params.id
    });
    if (!classes) {
      return res.notFound(ClassError.ERR_NOT_FOUND);
    }

    // UPDATE DATA CLASS
    const editObj = await ClassService.edit({
      id: params.id
    }, newData);

    // RETURN DATA CLASS
    return res.json({
      data: editObj
    });
  },

  trash: async (req, res) => {
    sails.log.info("================================ ClassController.trash => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK IDS PARAM
    if (!params.ids || !params.ids.length) {
      return res.badRequest(ClassError.ERR_ID_REQUIRED);
    }

    // CHECK CLASS & UPDATE
    const classes = await ClassService.find({
      id: params.ids
    });
    if (typeof params.ids === 'string') {
      if (!classes.length) {
        return res.badRequest(ClassError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    } else {
      if (classes.length !== params.ids.length) {
        return res.badRequest(ClassError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    }

    await Class.update({
      id: params.ids
    }).set({
      status: sails.config.custom.STATUS.TRASH
    });

    // RETURN DATA
    return res.json();
  },

  search: async (req, res) => {
    sails.log.info("================================ ClassController.search => START ================================");
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
          className: {
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

    // QUERY DATA PARENT
    const classes = await ClassService.find(where, bodyParams.limit, bodyParams.offset, bodyParams.sort),
      total = await ClassService.count({
        status: {
          '>=': sails.config.custom.STATUS.ALL
        }
      }),
      trash = await ClassService.count({ status: sails.config.custom.STATUS.TRASH }),
      publish = await ClassService.count({ status: sails.config.custom.STATUS.PUBLISH });

    // RETURN DATA PARENTS
    return res.json({
      recordsTotal: total,
      recordsTrash: trash,
      recordsPublish: publish,
      data: classes
    });
  }
};
