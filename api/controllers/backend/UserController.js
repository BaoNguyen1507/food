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


module.exports = {

  add: async (req, res) => {
    let params = req.allParams();

    // CHECK FULLNAME & EMAILADDRESS & PHONE PARAMS
    if (!params.fullName && !params.fullName.trim().length) {
      return res.badRequest(UserError.ERR_USER_FULLNAME_REQUIRED);
    } else if (!params.emailAddress || !params.emailAddress.trim().length) {
      return res.badRequest(UserError.ERR_USER_EMAIL_REQUIRED);
    } else if (!params.phone) {
      return res.badRequest(UserError.ERR_USER_PHONE_REQUIRED);
    } else if (!params.password) {
      return res.badRequest(UserError.ERR_PASSWORD_REQUIRED);
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
        return res.badRequest(UserError.ERR_EMAIL_EXISTED);
      } else if (foundPhoneSchool.length) {
        return res.badRequest(UserError.ERR_PHONE_EXISTED);
      }
      // CHECK EMAIL & PHONE EXIST WITH PARENT
      const foundEmailParent = await UserService.find({
        emailAddress: params.emailAddress
      });
      const foundPhoneParent = await UserService.find({
        phone: params.phone
      });
      if (foundEmailParent.length) {
        return res.badRequest(UserError.ERR_EMAIL_EXISTED);
      } else if (foundPhoneParent.length) {
        return res.badRequest(UserError.ERR_PHONE_EXISTED);
      }
    
    //PREPARE DATA
    let newData = {
      //required
      emailAddress: params.emailAddress,
      //required
      phone: params.phone,
      //required
      password: await sails.helpers.passwords.hashPassword(params.password),
      //required
      fullName: params.fullName,
      birthday: params.birthday ? params.birthday : '',
      status: (params.status != undefined ? params.status : sails.config.custom.STATUS.DRAFT),
      userType: (params.userType != undefined ? params.userType : sails.config.custom.TYPE.STAFF),
      avatar: params.avatar
    }
    //check email and phone 
    let foundEmail = await UserService.find({
      emailAddress: params.emailAddress
    });
    let foundPhone = await UserService.find({
      phone: params.phone
    });
    if (foundEmail.length) {
      return res.badRequest(UserError.ERR_EMAIL_EXISTED);
    } else if (foundPhone.length) {
      return res.badRequest(UserError.ERR_PHONE_EXISTED);
    }
    //save user
    let newUser = await UserService.add(newData);
    return res.json({
      data: newUser
    })
  },
  get: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

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
    sails.log.info("================================ UserController.edit => START ================================");
  
    let params = req.allParams();
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

    if (params.metaFields && !Utils.isJsonString(params.metaFields)) return res.serverError(ErrorService.SYSTEM_JSON_FORMAT_FAIL);

    let newData = {
      //required
      emailAddress: params.emailAddress,
      //required
      phone: params.phone,
      //required
      fullName: params.fullName,
      birthday: params.birthday ? params.birthday : '',
      status: (params.status != undefined ? params.status : sails.config.custom.STATUS.DRAFT),
      userType: (params.userType != undefined ? params.userType : sails.config.custom.TYPE.STAFF),
      avatar: params.avatar
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
  trash: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK IDS PARAM
    if (!params.ids || !params.ids.length) {
      return res.badRequest(UserError.ERR_ID_REQUIRED);
    }

    // CHECK USER & UPDATE
    const users = await UserService.find({
      id: params.ids
    });
    if (typeof params.ids === 'string') {
      if (!users.length) {
        return res.badRequest(UserError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    } else {
      if (users.length !== params.ids.length) {
        return res.badRequest(UserError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    }

    await User.update({
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
  },
  login: async (req, res) => {
    sails.log('--- o0o ---');
    sails.log('UserController - login running');
    let params = req.allParams();

    if (params.username == undefined || params.username === '') {
      return res.badRequest(UserError.ERR_EMAIL_REQUIRED);
    } else if (params.password == undefined || params.password === '') {
      return res.badRequest(UserError.ERR_PASSWORD_REQUIRED);
    }

    let found = null,
      schoolFound = null,
      parentFound = null,
      objParam = null;
    let matched = '';
    if (params.username.indexOf('@') != -1) {
      //check email
      objParam = {
        emailAddress: params.username
      }
    } else if (Number(params.username)) {
      //check phone
      objParam = {
        phone: params.username
      }
    } else {
      //bad request
      return res.badRequest(UserError.ERR_NOT_FOUND);
    }
    if (objParam) {
      found = await UserService.find(objParam);
      schoolFound = await SchoolService.find(objParam);
      parentFound = await ParentService.find(objParam);
      if (!found.length && !schoolFound.length && !parentFound.length) {
        return res.badRequest(UserError.ERR_NOT_FOUND);
      }
    }
    // CHECK PASSWORD ON USER, PARENT, SCHOOL ACCOUNT.
    if (found && found.length) {
      try {
        await sails.helpers.passwords.checkPassword(params.password, found[0].password).intercept('incorrect', 'badCombo');
      } catch (err) {

        return res.badRequest(UserError.ERR_PASSWORD_WRONG);

      }
      return res.json({
        data: found[0]
      })
    } else if (schoolFound && schoolFound.length) {
      try {
        await sails.helpers.passwords.checkPassword(params.password, schoolFound[0].password).intercept('incorrect', 'badCombo');
      } catch (err) {

        return res.badRequest(SchoolError.ERR_PASSWORD_SCHOOL_WRONG);

      }
      return res.json({
        data: schoolFound[0]
      })
    } else if (parentFound && parentFound.length) {
      try {
        await sails.helpers.passwords.checkPassword(params.password, parentFound[0].password).intercept('incorrect', 'badCombo');
      } catch (err) {

        return res.badRequest(ParentError.ERR_PASSWORD_WRONG);

      }
      return res.json({
        data: parentFound[0]
      })
    } else {
      return res.badRequest(UserError.ERR_NOT_FOUND);
    }
  },
  getTeacher: async (req, res) => { 
    var teacher = await User.find({userType: 1});
    return res.json({
      data: teacher
    });
  }
};
