/**
 * SchoolController
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
    sails.log.info("================================ SchoolController.add => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();
    // CHECK FULLNAME & EMAILADDRESS & GENDER PARAMS
    if (!params.schoolName || !params.schoolName.trim().length) {
      return res.badRequest(SchoolError.ERR_NAME_REQUIRED);
    } else if (!params.emailAddress || !params.emailAddress.trim().length) {
      return res.badRequest(SchoolError.ERR_EMAILADDRESS_REQUIRED);
    } else if (!params.phone) {
      return res.badRequest(SchoolError.ERR_PHONE_REQUIRED);
    } else if (!params.password) {
      return res.badRequest(SchoolError.ERR_PASSWORD_REQUIRED);
    }

      // CHECK EMAIL & PHONE EXIST WITH USER  
      const foundEmailUser = await UserService.find({
        emailAddress: params.emailAddress
      });
      const foundPhoneUser = await UserService.find({
        phone: params.phone
      });
      if (foundEmailUser.length) {
        return res.badRequest(SchoolError.ERR_EMAIL_SCHOOL_EXISTED);
      } else if (foundPhoneUser.length) {
        return res.badRequest(SchoolError.ERR_PHONE_SCHOOL_EXISTED);
      }
      // CHECK EMAIL & PHONE EXIST WITH SCHOOL
      const foundEmailSchool = await SchoolService.find({
        emailAddress: params.emailAddress
      });
      const foundPhoneSchool = await SchoolService.find({
        phone: params.phone
      });
      if (foundEmailSchool.length) {
        return res.badRequest(SchoolError.ERR_EMAIL_SCHOOL_EXISTED);
      } else if (foundPhoneSchool.length) {
        return res.badRequest(SchoolError.ERR_PHONE_SCHOOL_EXISTED);
      }
      // CHECK EMAIL & PHONE EXIST WITH PARENT
      const foundEmailParent = await UserService.find({
        emailAddress: params.emailAddress
      });
      const foundPhoneParent = await UserService.find({
        phone: params.phone
      });
      if (foundEmailParent.length) {
       return res.badRequest(SchoolError.ERR_EMAIL_SCHOOL_EXISTED);
      } else if (foundPhoneParent.length) {
       return res.badRequest(SchoolError.ERR_PHONE_SCHOOL_EXISTED);
      }
    // PREPARE DATA SCHOOL
    const newData = {
      schoolName: params.schoolName, // REQUIRED
      emailAddress: params.emailAddress, // REQUIRED
      password: await sails.helpers.passwords.hashPassword(params.password),
      phone: params.phone,// REQUIRED
      address: params.address ? params.address : '',
      description: params.description ? params.description : '',
      sdkSchool: params.sdkSchool ? params.sdkSchool : '',
      numberOfVAT: params.numberOfVAT ? params.numberOfVAT : '',
      website: params.website ? params.website : '',
      published: params.published ? params.published : '',
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      createdBy: req.session.userId
    };
    
    // ADD NEW DATA SCHOOL
    const newSchool = await SchoolService.add(newData);

    // RETURN DATA SCHOOL
    return res.ok(newSchool);
  },

  get: async (req, res) => {
    sails.log.info("================================ SchoolController.get => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();
    // CHECK ID PARAM
    if (!params.id) {
      return res.badRequest(SchoolError.ERR_ID_REQUIRED);
    }
    // QUERY & CHECK DATA SCHOOL
    const school = await SchoolService.get({
      id: params.id
    });
    if (!school) {
      return res.notFound(SchoolError.ERR_NOT_FOUND);
    }
    // RETURN DATA SCHOOL
    return res.json({
      data: school
    });
  },

  edit: async (req, res) => {
    sails.log.info("================================ SchoolController.edit => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();
    // CHECK FULLNAME & EMAILADDRESS & GENDER PARAMS
    if (!params.schoolName || !params.schoolName.trim().length) {
      return res.badRequest(SchoolError.ERR_NAME_REQUIRED);
    } else if (!params.emailAddress || !params.emailAddress.trim().length) {
      return res.badRequest(SchoolError.ERR_EMAILADDRESS_REQUIRED);
    } else if (!params.phone) {
      return res.badRequest(SchoolError.ERR_PHONE_REQUIRED);
    } 
     // CHECK EMAIL & PHONE EXIST WITH USER  
     const foundEmailUser = await UserService.find({
      emailAddress: params.emailAddress
    });
    const foundPhoneUser = await UserService.find({
      phone: params.phone
    });
    if (foundEmailUser.length) {
      return res.badRequest(SchoolError.ERR_EMAIL_SCHOOL_EXISTED);
    } else if (foundPhoneUser.length) {
      return res.badRequest(SchoolError.ERR_PHONE_SCHOOL_EXISTED);
    }
    // CHECK EMAIL & PHONE EXIST WITH SCHOOL
    const foundEmailSchool = await SchoolService.find({
      emailAddress: params.emailAddress,
      id: {
        '!': params.id
      }
    });
    const foundPhoneSchool = await SchoolService.find({
      phone: params.phone
    });
    if (foundEmailSchool.length) {
      return res.badRequest(SchoolError.ERR_EMAIL_SCHOOL_EXISTED);
    } else if (foundPhoneSchool.length) {
      return res.badRequest(SchoolError.ERR_PHONE_SCHOOL_EXISTED);
    }
    // CHECK EMAIL & PHONE EXIST WITH PARENT
    const foundEmailParent = await UserService.find({
      emailAddress: params.emailAddress
    });
    const foundPhoneParent = await UserService.find({
      phone: params.phone
    });
    if (foundEmailParent.length) {
     return res.badRequest(SchoolError.ERR_EMAIL_SCHOOL_EXISTED);
    } else if (foundPhoneParent.length) {
     return res.badRequest(SchoolError.ERR_PHONE_SCHOOL_EXISTED);
    }
    // PREPARE DATA SCHOOL
    const newData = {
      schoolName: params.schoolName, // REQUIRED
      emailAddress: params.emailAddress, // REQUIRED
      phone: params.phone,// REQUIRED
      address: params.address ? params.address : '',
      description: params.description ? params.description : '',
      sdkSchool: params.sdkSchool ? params.sdkSchool : '',
      numberOfVAT: params.numberOfVAT ? params.numberOfVAT : '',
      website: params.website ? params.website : '',
      published: params.published ? params.published : '',
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      createdBy: req.session.userId
    };

    // CHECK DATA SCHOOL
    const school = SchoolService.get({
      id: params.id
    });
    if (!school) {
      return res.notFound(SchoolError.ERR_NOT_FOUND);
    }
    // UPDATE DATA SCHOOL
    const editObj = await SchoolService.edit({
      id: params.id
    }, newData);
    // RETURN DATA SCHOOL
    return res.json({
      data: editObj[0]
    });
  },

  trash: async (req, res) => {
    sails.log.info("================================ SchoolController.trash => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();
    // CHECK IDS PARAM
    if (!params.ids || !params.ids.length) {
      return res.badRequest(SchoolError.ERR_ID_REQUIRED);
    }
    // CHECK SCHOOL & UPDATE
    const schools = await SchoolService.find({
      id: params.ids
    });
    if (typeof params.ids === 'string') {
      if (!schools.length) {
        return res.badRequest(SchoolError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    } else {
      if (schools.length !== params.ids.length) {
        return res.badRequest(SchoolError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    }
    await School.update({
      id: params.ids
    }).set({
      status: 3
    });
    // RETURN DATA
    return res.json();
  },

  search: async (req, res) => {
    sails.log.info("================================ SchoolController.search => START ================================");
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
        schoolName: {
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
    const schools = await SchoolService.find(where, bodyParams.limit, bodyParams.offset, bodyParams.sort),
      total = await SchoolService.count({
        status: {
          '>=': sails.config.custom.STATUS.ALL
        }
      }),
      trash = await SchoolService.count({ status: sails.config.custom.STATUS.TRASH }),
      publish = await SchoolService.count({ status: sails.config.custom.STATUS.PUBLISH });

    // RETURN DATA PARENTS
    return res.json({
      recordsTotal: total,
      recordsTrash: trash,
      recordsPublish: publish,
      data: schools
    });
  }
};
