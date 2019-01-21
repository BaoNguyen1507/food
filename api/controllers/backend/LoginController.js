
const ParentError = require('../../../config/errors/parent');
const SchoolError = require('../../../config/errors/school');
const UserError = require('../../../config/errors/user');
const UserService = require('../../services/UserService');
const SchoolService = require('../../services/SchoolService');
const ParentService = require('../../services/ParentService');
module.exports = {

  createSuperAdmin: async (req, res) => {
    const _totalUser = await UserService.count();

    if (_totalUser === 0) {
      const newData = {
        emailAddress: 'admin@gmail.com',
        phone: '0909190962',
        password: await sails.helpers.passwords.hashPassword('123456'),
        fullName: 'Nguyễn Vũ Hoà',
        birthday: '02-12-1995',
        status: 1
      }
      let account = await UserService.add(newData);
      return res.ok(account);
    } else {
      // nothing to do
    }
  }

};
