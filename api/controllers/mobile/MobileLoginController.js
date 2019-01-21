
const ParentError = require('../../../config/errors/parent');
const SchoolError = require('../../../config/errors/school');
const UserError = require('../../../config/errors/user');
const AuthError = require('../../../config/errors/auth');
const UserService = require('../../services/UserService');
const SchoolService = require('../../services/SchoolService');
const ParentService = require('../../services/ParentService');
const AuthService = require('../../services/AuthService');

module.exports = {
  
  login: async (req, res) => {
    
    sails.log('--- o0o ---');
    sails.log('UserController - login running');
    let params = req.allParams();
    let now = Date.now();
    
    //validate username, password
    if (params.username && params.username !== '' && params.password && params.password !== '') {
    } else {
      return res.badRequest(UserError.ERR_USER_INPUT_REQUIRED);
    }

    let found = null, schoolFound = null, parentFound = null;

    let objParam = {};
    if (params.username.indexOf('@') != -1) {
      objParam.emailAddress = params.username;
    } else if (Number(params.username)) {
      objParam.phone = params.username
    } 

    if (objParam) {
      found = await UserService.find(objParam);
      schoolFound = await SchoolService.find(objParam);
      parentFound = await ParentService.find(objParam);
     
      if (!found.length && !schoolFound.length && !parentFound.length) {
        return res.badRequest(UserError.ERR_NOT_FOUND);
      }
    }
    //check password
    if (found.length) {
      try {
        await sails.helpers.passwords.checkPassword(params.password, found[0].password).intercept('incorrect', 'badCombo');
      } catch (err) {
        if (err) {
          return res.badRequest(UserError.ERR_PASSWORD_WRONG);
        } 
      }
      return res.json({ code: 200, data: found[0] })
    } else if (schoolFound.length) {
      try {
        await sails.helpers.passwords.checkPassword(params.password, schoolFound[0].password).intercept('incorrect', 'badCombo');
      } catch (err) {
        if (err) {
          return res.badRequest(UserError.ERR_PASSWORD_WRONG);
        } 
      }
      return res.json({ code: 200, data: schoolFound[0] })
    } else if (parentFound.length) {
      try {
        await sails.helpers.passwords.checkPassword(params.password, parentFound[0].password).intercept('incorrect', 'badCombo');
      } catch (err) {
        if (err) {
          return res.badRequest(UserError.ERR_PASSWORD_WRONG);
        } 
      }
      return res.json({ code: 200, data: parentFound[0] })
    }
  },  

  createSuperAdmin: async () => {
    const _totalUser = UserService.count();

    if (_totalUser === 0) {
      const newData = {
        emailAddress: 'admin@gmail.com',
        phone: '0909190962',
        password: await sails.helpers.passwords.hashPassword('123456'),
        fullName: 'Nguyễn Vũ Hoà',
        birthday: '02-12-1995',
        status: 1
      }

      UserService.add(newData);
    } else {
      // nothing to do
    }
  }

};
