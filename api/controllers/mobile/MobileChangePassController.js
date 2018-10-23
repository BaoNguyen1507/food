
const UserService = require('../../services/UserService');
const ParentService = require('../../services/ParentService');
const SchoolService = require('../../services/SchoolService');

module.exports = {

    changePassword: async (req, res) => {
        // sails.log('--- resetPassword ---');
        const params = req.allParams();
        //check email exist
        let _userFound = await UserService.find({
            emailAddress: params.emailAddress
        });
        let _parentFound = await ParentService.find({
            emailAddress: params.emailAddress
        });
        let _schoolFound = await SchoolService.find({
            emailAddress: params.emailAddress
        });
        if (_userFound.length) {
            try {
                await sails.helpers.passwords.checkPassword(params.passwordNow, _userFound[0].password).intercept('incorrect', 'badCombo');
            } catch (err) {
                if (err) {
                    return res.badRequest({
                        code: 'ERR_CHANGEINFO_002',
                        message: 'Mật khẩu hiện tại không đúng'
                    });
                } 
            }
            
            // Hash the new password.
            var hashed = await sails.helpers.passwords.hashPassword(params.passwordNew);
            
            // Update the record for the logged-in user.
            _userFound = await User.update({ id: _userFound.id }).set({ password: hashed }).fetch();
            
            return res.json({
                code: 'SUCCESS_200',
                data: hashed
            });
        } else if (_parentFound.length) {
            try {
                await sails.helpers.passwords.checkPassword(params.passwordNow, _parentFound[0].password).intercept('incorrect', 'badCombo');
            } catch (err) {
                if (err) {
                    return res.badRequest({
                        code: 'ERR_CHANGEINFO_002',
                        message: 'Mật khẩu hiện tại không đúng'
                    });
                } 
            }
            
            // Hash the new password.
            var hashed = await sails.helpers.passwords.hashPassword(params.passwordNew);
            
            // Update the record for the logged-in user.
            _parentFound = await Parent.update({ id: _parentFound.id }).set({ password: hashed }).fetch();
           
            return res.json({
                code: 'SUCCESS_200',
                data: hashed
            });
        } else if (_schoolFound.length) {
            try {
                await sails.helpers.passwords.checkPassword(params.passwordNow, _schoolFound[0].password).intercept('incorrect', 'badCombo');
            } catch (err) {
                if (err) {
                    return res.badRequest({
                        code: 'ERR_CHANGEINFO_002',
                        message: 'Mật khẩu hiện tại không đúng'
                    });
                } 
            }
            
            // Hash the new password.
            var hashed = await sails.helpers.passwords.hashPassword(params.passwordNew);
            
            // Update the record for the logged-in user.
            _schoolFound = await School.update({ id: _schoolFound.id }).set({ password: hashed }).fetch();
            
            return res.json({
                code: 'SUCCESS_200',
                data: hashed
            });
        } else {
            return res.json({
                code: 'ERR_CHANGEINFO_001',
                message: 'Không tim thấy người dùng trong hệ thống'
            });
        }
    }
}