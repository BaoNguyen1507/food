/**
 * UserController
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
const AuthError = require('../../../config/errors/auth');

module.exports = {

  get: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();
    let tempToken = true;
    let now = Date.now();
    let token = await AuthService.find(params.token);
    let checkToken = false;
    
    if (token.token === params.tokens) {
      checkToken = true;
    }

    if (tempToken === false) return res.badRequest(AuthError.ERR_SYSTEM_TOKEN_REQUIRE);
    // CHECK ID PARAM
    if (!params.id) {
      return res.badRequest(UserError.ERR_ID_REQUIRED);
    }
    // QUERY & CHECK DATA USER
    const user = await UserService.get({
      id: params.id
    });
    if (!user) {
      return res.notFound(UserError.ERR_NOT_FOUND);
    }
    // RETURN DATA USER
    return res.json({
      data: user
    });
  },

  edit: async (req, res) => {
    sails.log.info("================================ MobileUserController.edit => START ================================");
    let params = req.allParams();
    // CHECK TOKEN
    let tempToken = true;
    let token = await AuthService.find(params.token);
    let checkToken = false;
    
      if (token.token === params.tokens) {
        checkToken = true;
      }

    if (tempToken === false) {
      return res.badRequest(AuthError.ERR_SYSTEM_TOKEN_REQUIRE);
    }
    // END CHECK TOKEN
    if (!params.fullName && !params.fullName.trim().length) {
      return res.badRequest(UserError.ERR_USER_FULLNAME_REQUIRED);
    } else if (!params.emailAddress || !params.emailAddress.trim().length) {
      return res.badRequest(UserError.ERR_USER_EMAIL_REQUIRED);
    } else if (!params.phone) {
      return res.badRequest(UserError.ERR_USER_PHONE_REQUIRED);
    } 
     // CHECK EMAIL & PHONE EXIST WITH USER  
     const foundEmailUser = await UserService.find({
      emailAddress: params.emailAddress
    });
    const foundPhoneUser = await UserService.find({
      phone: params.phone
    });
    if (foundEmailUser.length) {
      return res.badRequest(UserError.ERR_EMAIL_EXISTED);
    } else if (foundPhoneUser.length) {
      return res.badRequest(UserError.ERR_PHONE_EXISTED);
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
      return res.badRequest(UserError.ERR_EMAIL_PARENT_EXISTED);
    } else if (foundPhoneParent.length) {
      return res.badRequest(UserError.ERR_PHONE_PARENT_EXISTED);
    }
    // Call constructor with custom options:
    let message = (params.message) ? params.message : '';
    let status = (params.status) ? parseInt(params.status) : 1;

    if (params.metaFields && !Utils.isJsonString(params.metaFields)) {
      return res.serverError(ErrorService.SYSTEM_JSON_FORMAT_FAIL);
    }
     
    let newData = {
      //required
      emailAddress: params.emailAddress,
      //required
      phone: params.phone,
      //required
      fullName: params.fullName,
      birthday: params.birthday,
      professional: params.professional,
      address : params.address
    }
      // CHECK DATA NOTIFICATION
      const user = UserService.get({
        id: params.id
      });
      if (!user) {
        return res.notFound(UserError.ERR_NOT_FOUND);
      }

      // UPDATE DATA USER
      const editObj = await UserService.edit({
        id: params.id
      }, newData);

    // RETURN DATA USER
    return res.json({
      data: editObj[0]
    });
  },
  
  search: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();
    let tempToken = true;
    let token = await AuthService.find(params.token);
    let checkToken = false;
    
      if (token.token === params.tokens) {
        checkToken = true;
      }

    if (tempToken === false) return res.badRequest(AuthError.ERR_SYSTEM_TOKEN_REQUIRE);
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

    // QUERY DATA USER
    const users = await UserService.find(where, bodyParams.limit, bodyParams.offset, bodyParams.sort),
      total = await UserService.count({
        status: {
          '>=': sails.config.custom.STATUS.ALL
        }
      }),
      trash = await UserService.count({ status: sails.config.custom.STATUS.TRASH }),
      publish = await UserService.count({ status: sails.config.custom.STATUS.PUBLISH });

    // RETURN DATA USERS
    return res.json({
      recordsTotal: total,
      recordsTrash: trash,
      recordsPublish: publish,
      data: users
    });
  }
};
