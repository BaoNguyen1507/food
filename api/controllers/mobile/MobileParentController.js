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

    // ================================================================
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

    // CHECK DATA PARENT

    let parent = await ParentService.get({ id: params.id });

    if (!parent) {
      return res.notFound(ParentError.ERR_NOT_FOUND);
    }

    //check email and phone exists
    let foundOtherParent = await ParentService.find({
      id: {
        '!=': [params.id]
      },
      or: [{
        emailAddress: params.emailAddress
      },{
        phone: params.phone
      }]
    });
    if(!foundOtherParent.length){
      const newData = {
        fullName: params.fullName, // REQUIRED
        emailAddress: params.emailAddress, // REQUIRED
        phone: params.phone, // REQUIRED
        currentAddress: params.currentAddress ? params.currentAddress : '',
      };
      const editObj = await ParentService.edit({
        id: params.id
      }, newData);
      return res.json({
        code: 'SUCCESS_200',
        data: editObj[0]
      });
    } else {
      return res.badRequest(ParentError.ERR_PHONE_PARENT_EXISTED);
    }
    // if (parent.emailAddress === params.emailAddress && parent.phone === params.phone) {
    //   const newData = {
    //     fullName: params.fullName, // REQUIRED
    //     emailAddress: params.emailAddress, // REQUIRED
    //     phone: params.phone, // REQUIRED
    //     currentAddress: params.currentAddress ? params.currentAddress : '',
    //   };
    //   const editObj = await ParentService.edit({
    //     id: params.id
    //   }, newData);
    //   return res.json({
    //     code: 'SUCCESS_200',
    //     data: editObj[0]
    //   });
    // } else {
    //   if (parent.emailAddress !== params.emailAddress && parent.phone !== params.phone) {
    //     const foundEmailParent = await ParentService.find({
    //       emailAddress: params.emailAddress
    //     });
    //     const foundPhoneParent = await ParentService.find({
    //       phone: params.phone
    //     });
    //     if (foundPhoneParent.length) {
    //       return res.badRequest(ParentError.ERR_PHONE_PARENT_EXISTED);
    //     }
    //     if (foundEmailParent.length) {
    //       return res.badRequest(ParentError.ERR_EMAIL_PARENT_EXISTED);
    //     }
    //     const newData = {
    //       fullName: params.fullName, // REQUIRED
    //       emailAddress: params.emailAddress, // REQUIRED
    //       phone: params.phone, // REQUIRED
    //       currentAddress: params.currentAddress ? params.currentAddress : '',
    //     };
    //     const editObj = await ParentService.edit({
    //       id: params.id
    //     }, newData);
    //     return res.json({
    //       code: 'SUCCESS_200',
    //       data: editObj[0]
    //     });
    //   }
    //   else if (parent.emailAddress !== params.emailAddress && parent.phone === params.phone) {
    //     const foundEmailParent = await ParentService.find({
    //       emailAddress: params.emailAddress
    //     });
    //     if (foundEmailParent.length) {
    //       return res.badRequest(ParentError.ERR_EMAIL_PARENT_EXISTED);
    //     }
    //     const newData = {
    //       fullName: params.fullName, // REQUIRED
    //       emailAddress: params.emailAddress, // REQUIRED
    //       phone: params.phone, // REQUIRED
    //       currentAddress: params.currentAddress ? params.currentAddress : '',
    //     };
    //     const editObj = await ParentService.edit({
    //       id: params.id
    //     }, newData);
    //     return res.json({
    //       code: 'SUCCESS_200',
    //       data: editObj[0]
    //     });
    //   } else if (parent.emailAddress === params.emailAddress && parent.phone !== params.phone) {
    //     const foundPhoneParent = await ParentService.find({
    //       phone: params.phone
    //     });
    //     if (foundPhoneParent.length) {
    //       return res.badRequest(ParentError.ERR_PHONE_PARENT_EXISTED);
    //     }
    //     const newData = {
    //       fullName: params.fullName, // REQUIRED
    //       emailAddress: params.emailAddress, // REQUIRED
    //       phone: params.phone, // REQUIRED
    //       currentAddress: params.currentAddress ? params.currentAddress : '',
    //     };
    //     const editObj = await ParentService.edit({
    //       id: params.id
    //     }, newData);
    //     return res.json({
    //       code: 'SUCCESS_200',
    //       data: editObj[0]
    //     });
    //   }

    // }
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
