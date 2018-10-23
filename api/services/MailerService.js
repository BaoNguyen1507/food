/**
 * @copyright 2017 @ ZiniMedia Team
 * @author thanhvo
 * @create 2017/07/05 11:51
 * @update 2017/07/05 16:54
 * @file api/services/ErrorService.js
 */
'use strict';

// api/services/MailerService.js
const MailerService = {
	sendForgotPasswordMail: async (obj) => {
		sails.hooks.email.send(
			"forgotPasswordEmail", 
			{
				FullName: obj.fullName,
				NewPassword: obj.password,
				linkLogin: obj.linkLogin
			},
			{
				to: obj.emailAddress,
				subject: "Ekid :: Quên mật khẩu"
			},
			function(err) {console.log(err || "Mail Sent!");}
		)
	}
}

module.exports = MailerService;