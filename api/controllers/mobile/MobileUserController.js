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
const Sharp = require('sharp/lib');
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
    
    if (!params.fullName && !params.fullName.trim().length) {
      return res.badRequest(UserError.ERR_USER_FULLNAME_REQUIRED);
    } else if (!params.emailAddress || !params.emailAddress.trim().length) {
      return res.badRequest(UserError.ERR_USER_EMAIL_REQUIRED);
    } else if (!params.phone) {
      return res.badRequest(UserError.ERR_USER_PHONE_REQUIRED);
    } 
     // CHECK EMAIL & PHONE EXIST WITH USER  
     const foundEmailUser = await UserService.find({
      id: {
        '!=': [params.id]
      },
      emailAddress: params.emailAddress
    });
    const foundPhoneUser = await UserService.find({
      id: {
        '!=': [params.id]
      },
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

    //check email and phone exists
    let foundOtherUser = await UserService.find({
      id: {
        '!=': [params.id]
      },
      or: [{ 
        emailAddress: params.emailAddress
      },{
        phone: params.phone
      }]
    });
    if(!foundOtherUser.length){
      let newData = {
        emailAddress: params.emailAddress,
        phone: params.phone,
        fullName: params.fullName,
        birthday: params.birthday,
        address : params.address
      }
      const editObj = await UserService.edit({
        id: params.id
      }, newData);
      return res.json({
        code: 'SUCCESS_200',
        data: editObj[0]
      });
    } else {
      return res.badRequest(UserError.ERR_EMAIL_PHONE_EXISTED);
    }
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
  },
  upload: async (req, res) => {
    //let params = req.allParams();
    //let id = params.id;
    const paramsString = req.url.split('?')[1];
    const eachParamArray = paramsString.split('&');
    let params = {};
    eachParamArray.forEach((param) => {
        const key = param.split('=')[0];
        const value = param.split('=')[1];
        Object.assign(params, {[key]: value});
    });
    sails.log(params)
    let id = params.id;
    if (id == undefined) {
      return res.badRequest('ID MISSING');
    }
   let userObj = await UserService.get({ id });
    let _cust = sails.config.custom; 
    if (req.method === 'GET') {
      return res.json({ 'status': 'GET not allowed' });
    }
    const originFolder = require('path').resolve(sails.config.appPath, 'assets/images/zadmin/uploads/avatar/origin/');
    sails.log('link image', originFolder);
    let timeStamp = _.now();
    let thumbSquare = timeStamp + '_'+ _cust.UPLOAD.THUMB.SQUARE.name;
    console.log('check time and user', thumbSquare);
 
    req.file('file').upload({
      dirname: originFolder,
      // maxBytes: 100000
    }, (err, file) => {
      if (err) {
        return res.badRequest(err);
      } else {
        let name = '';
        sails.log(file);
        _.each(file, function (img) {
          
          name = img.filename;

          Sharp(img.fd).resize({ width: 400, height: 300 }).crop(Sharp.gravity.northwest).toFile(require('path')
            .resolve(sails.config.appPath, 'assets/images/zadmin/uploads/avatar/square/' + name.replace(/\s/g, '')))
             .then((info) => {}).catch( (err) => { sails.log(err); }); 
        })
        const _dataFile = process.platform === 'win32' ? file[0].fd.split('\\').pop() : file[0].fd.split('/').pop();
        return res.json({
          status: 200,
          fd: '/assets/images/zadmin/uploads/avatar/square/' + name.replace(/\s/g, ''),
          user: userObj
        });
      }
    });
  }
};
