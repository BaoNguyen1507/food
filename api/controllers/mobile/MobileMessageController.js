/**
 * MobileMessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const StudentError = require('../../../config/errors/student');
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
        let listGroupMessage = await MessageService.find({});
        return res.ok({
            status: 200,
            data: listGroupMessage
        })
    },
    storeMessageData: async (req, res) => { 
        let params = req.allParams();
        let userId = params.userId;
        let txtMessage = params.txtMessage;
        let message = params.messageId;
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
    },
    showDataMessage: async (req, res) => { 
        let params = req.allParams();
        let message = params.messageId;
        
        let listMessage = await MessageDataService.find({ message: message });
        sails.log(listMessage[0].dataLogs.user)
        sails.log(listMessage[0].message.teacher)
        sails.log(listMessage[0].message.teacher == listMessage[0].dataLogs.user)
        let data = [];
        if (listMessage.length > 0) {
            for (let i = 0; i < listMessage.length; i++){
                if (listMessage[i].dataLogs.user == listMessage[i].message.teacher) {
                    let tmp = {};
                    let userMessage = await UserService.get(listMessage[i].dataLogs.user);
                    tmp.id = userMessage.id;
                    tmp.fullName = userMessage.fullName;
                    data.push(tmp);
                } else {
                    let parentMessage = await ParentService.get(listMessage[i].dataLogs.user);
                    let tmp = {};
                    tmp.id = parentMessage.id;
                    tmp.fullName = parentMessage.fullName;
                    data.push(tmp);
                }
            }
            
        }
       
        listMessage.push(data);
        return res.ok({
            status: 200,
            data: listMessage
        })
    }
};
