/**
 * MobileMessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const StudentError = require('../../../config/errors/student');
const MessageError = require('../../../config/errors/message');
const UserService = require('../../services/UserService');
const ParentService = require('../../services/ParentService');
const MediaService = require('../../services/MediaService');
const MessageService = require('../../services/MessageService');
const MessageDataService = require('../../services/MessageDataService');
const Sharp = require('sharp/lib');
//Library
const moment = require('moment');

module.exports = {
  getGroupMessage: async (req, res) => {
    let params = req.allParams();
    let classID = params.classId;
    let parentID = params.parentId;
    let teacherID = params.teacherId;

    //check params exists
    //class Id
    if (classID == undefined) {
      return res.badRequest({
        status: 400,
        message: MessageError.ERR_CLASS_ID_REQUIRED
      });
    } else if (teacherID == undefined && parentID == undefined) {
      //teacher or parent id
      return res.badRequest({
        status: 400,
        message: MessageError.ERR_TEACHER_PARENT_ID_REQUIRED
      });
    }

    let listGroupMessage = await MessageService.find({
      classes: classID,
      parent: parentID
    });

    for (let i = 0; i < listGroupMessage.length; i++) {
			let rs = await MessageData.find({
        message: listGroupMessage[i].id
			}).where({
				updatedAt: {
					'>': listGroupMessage[i].updatedAt
				}
			}).sort('createdAt DESC');
      listGroupMessage[i].unreadMessages = rs;
    }

    return res.ok({
      status: 200,
      data: listGroupMessage
    });
  },
  storeMessageData: async (req, res) => {
    let params = req.allParams();
		let userId = params.userId ? params.userId : '';
		let txtMessage = params.txtMessage ? params.txtMessage: '';
		let message = params.messageId ? params.messageId : '';
		if (userId == '' || message == '') {
				return res.badRequest('Missing data to add')
		} else {
			let dataLogs = {
				user: userId,
				txtMessage: txtMessage
			}
			let data = {
				message: message,
				dataLogs
			}
			let dataObj = await MessageDataService.add(data);
			return res.ok({
				status: 200,
				data: dataObj
			})
		}
  },
  showDataMessage: async (req, res) => {
    let params = req.allParams();
		let messageId = params.messageId ? params.messageId : '';
		if (messageId == '') {
				return res.badRequest('Missing message group id');
		}

		const bodyParams = {
      limit: params.limit ? Number(params.limit) : null,
      offset: params.offset ? Number(params.offset) : null,
      sort: (params.sort && params.sort.trim().length) ? JSON.parse(params.sort) : null
		};
		
    let listMessage = await MessageDataService.find({ message: messageId }, bodyParams.limit, bodyParams.offset, bodyParams.sort);
		
    return res.ok({
      status: 200,
      data: listMessage
    });
  },
  alreadySeenGroupMessage: async (req, res) => {
    let params = req.allParams();
    let msgId = params.messageId;

    let editObj = await MessageService.edit({ id: msgId },{
        lastSeen: moment().valueOf()
      }
    );

    if (editObj) {
      return res.json({
        status: 200,
        data: editObj
      });
    } else {
      return res.badRequest({
        status: 400,
        message: ERR_EDIT_FAIL
      });
    }
  }
};
