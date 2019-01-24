/**
 * ParentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const ParentError = require('../../../config/errors/parent');
const UserError = require('../../../config/errors/user');
const SchoolError = require('../../../config/errors/school');
const ParentService = require('../../services/ParentService');
const UserService = require('../../services/UserService');
const SchoolService = require('../../services/SchoolService');
//Library
const moment = require('moment');

module.exports = {
  add: async (req, res) => {
    sails.log.info("================================ ParentController.add => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();

    
    // CHECK FULLNAME & EMAILADDRESS & PHONE PARAMS
    if (!params.fullName && !params.fullName.trim().length) {
      return res.badRequest(ParentError.ERR_FULLNAME_REQUIRED);
    } else if (!params.emailAddress || !params.emailAddress.trim().length) {
      return res.badRequest(ParentError.ERR_EMAILADDRESS_REQUIRED);
    } else if (!params.phone) {
      return res.badRequest(ParentError.ERR_PHONE_REQUIRED);
    } else if (!params.password) {
      return res.badRequest(ParentError.ERR_PASSWORD_REQUIRED);
    }
    // CHECK EMAIL & PHONE EXIST WITH USER  
    const foundEmailUser = await UserService.find({
      emailAddress: params.emailAddress
    });
    const foundPhoneUser = await UserService.find({
      phone: params.phone
    });
    if (foundEmailUser.length) {
      return res.badRequest(ParentError.ERR_EMAIL_PARENT_EXISTED);
    } else if (foundPhoneUser.length) {
      return res.badRequest(ParentError.ERR_PHONE_PARENT_EXISTED);
    }
      // CHECK EMAIL & PHONE EXIST WITH SCHOOL
      const foundEmailSchool = await SchoolService.find({
        emailAddress: params.emailAddress
      });
      const foundPhoneSchool = await SchoolService.find({
        phone: params.phone
      });
      if (foundEmailSchool.length) {
        return res.badRequest(ParentError.ERR_EMAIL_PARENT_EXISTED);
      } else if (foundPhoneSchool.length) {
        return res.badRequest(ParentError.ERR_PHONE_PARENT_EXISTED);
      }
      // CHECK EMAIL & PHONE EXIST WITH PARENT
    const foundEmailParent = await ParentService.find({
      emailAddress: params.emailAddress
    });
    const foundPhoneParent = await ParentService.find({
      phone: params.phone
    });
    if (foundEmailParent.length) {
      return res.badRequest(ParentError.ERR_EMAIL_PARENT_EXISTED);
    } else if (foundPhoneParent.length) {
      return res.badRequest(ParentError.ERR_PHONE_PARENT_EXISTED);
    }
    
    let students = params.students;
    // PREPARE DATA PARENT
    const newData = {
      fullName: params.fullName, // REQUIRED
      emailAddress: params.emailAddress, // REQUIRED
      phone: params.phone, // REQUIRED
      password: await sails.helpers.passwords.hashPassword(params.password), // REQUIRED
      birthday: moment(params.birthday).valueOf(),
      profession: params.profession ? params.profession : '',
      currentAddress: params.currentAddress ? params.currentAddress : '',
      permanentAddress: params.permanentAddress ? params.permanentAddress : '',
      religion: params.religion ? params.religion : '',
      note: params.note ? params.note : '',
      type: params.type ? params.type : 0,
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      students: students,
      createdBy: req.session.userId
    };
    
    // ADD NEW DATA PARENT
    const newParent = await ParentService.add(newData);
    if (students) {
      await Parent.addToCollection(newParent.id, 'students', students).exec(function (err) { });
    }
    // RETURN DATA PARENT
    return res.ok(newParent);
  },

  get: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK ID PARAM
    if (!params.id) {
      return res.badRequest(ParentError.ERR_ID_REQUIRED);
    }

    // QUERY & CHECK DATA PARENT
    const parent = await ParentService.get({
      id: params.id
    });
    if (!parent) {
      return res.notFound(ParentError.ERR_NOT_FOUND);
    }

    // RETURN DATA PARENT
    return res.json({
      data: parent
    });
  },

  edit: async (req, res) => {
    sails.log.info("================================ ParentController.edit => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK FULLNAME & EMAILADDRESS & PHONE PARAMS
    if (!params.fullName && !params.fullName.trim().length) {
      return res.badRequest(ParentError.ERR_FULLNAME_REQUIRED);
    } else if (!params.emailAddress || !params.emailAddress.trim().length) {
      return res.badRequest(ParentError.ERR_EMAILADDRESS_REQUIRED);
    } else if (!params.phone) {
      return res.badRequest(ParentError.ERR_PHONE_REQUIRED);
    } 
     // CHECK EMAIL & PHONE EXIST WITH USER  
     const foundEmailUser = await UserService.find({
      emailAddress: params.emailAddress
    });
    const foundPhoneUser = await UserService.find({
      phone: params.phone
    });
    if (foundEmailUser.length) {
      return res.badRequest(ParentError.ERR_EMAIL_PARENT_EXISTED);
    } else if (foundPhoneUser.length) {
      return res.badRequest(ParentError.ERR_PHONE_PARENT_EXISTED);
    }
      // CHECK EMAIL & PHONE EXIST WITH SCHOOL
      const foundEmailSchool = await SchoolService.find({
        emailAddress: params.emailAddress
      });
      const foundPhoneSchool = await SchoolService.find({
        phone: params.phone
      });
      if (foundEmailSchool.length) {
        return res.badRequest(ParentError.ERR_EMAIL_PARENT_EXISTED);
      } else if (foundPhoneSchool.length) {
        return res.badRequest(ParentError.ERR_PHONE_PARENT_EXISTED);
      }
    // PREPARE DATA PARENT
    let students = params.students;
    const newData = {
      fullName: params.fullName, // REQUIRED
      emailAddress: params.emailAddress, // REQUIRED
      phone: params.phone, // REQUIRED
      birthday: moment(params.birthday).valueOf(),
      profession: params.profession ? params.profession : '',
      currentAddress: params.currentAddress ? params.currentAddress : '',
      permanentAddress: params.permanentAddress ? params.permanentAddress : '',
      religion: params.religion ? params.religion : '',
      note: params.note ? params.note : '',
      type: params.type ? params.type : 0,
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      students: students,
      createdBy: req.session.userId
    };

    // CHECK DATA PARENT
    const parent = ParentService.get({
      id: params.id
    });
    if (!parent) {
      return res.notFound(ParentError.ERR_NOT_FOUND);
    }

    // UPDATE DATA PARENT
    const editObj = await ParentService.edit({
      id: params.id
    }, newData);
    if (students) {
      await Parent.replaceCollection(editObj[0].id, 'students', students).exec(function (err) { });
    }
    // RETURN DATA PARENT
    return res.json({
      data: editObj[0]
    });
  },

  trash: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK IDS PARAM
    if (!params.ids || !params.ids.length) {
      return res.badRequest(ParentError.ERR_ID_REQUIRED);
    }

    // CHECK PARENT & UPDATE
    const parents = await ParentService.find({
      id: params.ids
    });
    if (typeof params.ids === 'string') {
      if (!parents.length) {
        return res.badRequest(ParentError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    } else {
      if (parents.length !== params.ids.length) {
        return res.badRequest(ParentError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    }

    await Parent.update({
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
          fullName: {
            contains: bodyParams.filter.keyWord
          }
        }, {
          emailAddress: {
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
    const parents = await ParentService.find(where, bodyParams.limit, bodyParams.offset, bodyParams.sort),
      total = await ParentService.count({
        status: {
          '>=': sails.config.custom.STATUS.ALL
        }
      }),
      trash = await ParentService.count({ status: sails.config.custom.STATUS.TRASH }),
      publish = await ParentService.count({ status: sails.config.custom.STATUS.PUBLISH });

    // RETURN DATA PARENTS
    return res.json({
      recordsTotal: total,
      recordsTrash: trash,
      recordsPublish: publish,
      data: parents
    });
  }
};
