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
      listGroupMessage[i].latestMessages = await MessageDataService.find({
        message: listGroupMessage[i].id
      }).sort('createdAt DESC');
    }

    return res.ok({
      status: 200,
      data: listGroupMessage
    });
  },
  storeMessageData: async (req, res) => {
    let params = req.allParams();
    let userId = params.userId;
    let txtMessage = params.txtMessage;
    let message = params.messageId;

    let dataLogs = {
      user: userId,
      txtMessage: txtMessage
    };
    let data = {
      message: message,
      dataLogs
    };
    let dataObj = await MessageDataService.add(data);
    return res.ok({
      status: 200,
      data: dataObj
    });
  },
  showDataMessage: async (req, res) => {
    let params = req.allParams();
    let message = params.messageId;

    let listMessage = await MessageDataService.find({ message: message });
    let data = [];
    if (listMessage.length > 0) {
      for (let i = 0; i < listMessage.length; i++) {
        if (listMessage[i].dataLogs.user == listMessage[i].message.teacher) {
          let tmp = {};
          let userMessage = await UserService.get(listMessage[i].dataLogs.user);
          if (!_.isEmpty(userMessage)) {
            tmp.id = userMessage.id;
            tmp.fullName = userMessage.fullName;
            data.push(tmp);
          }
        } else {
          let parentMessage = await ParentService.get(
            listMessage[i].dataLogs.user
          );
          if (!_.isEmpty(parentMessage)) {
            let tmp = {};
            tmp.id = parentMessage.id;
            tmp.fullName = parentMessage.fullName;
            data.push(tmp);
          }
        }
      }
    }
    listMessage.push(data);
    return res.ok({
      status: 200,
      data: listMessage
    });
  },
  alreadySeenGroupMessage: async (req, res) => {
    let params = req.allParams();
    let msgId = params.messageId;

    let editObj = await MessageService.edit(
      {
        id: msgId
      },
      {
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
