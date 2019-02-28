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
        let params = req.allParams();
        let classID = params.classId ? params.classId: '';
        let parentID = params.parentId ? params.parentId : '';
        let teacherID = params.teacherId ? params.teacherId: '';
        
        if (parentID != '' && classID != '') {
            let listGroupMessage = await MessageService.find(
                {
                    classes: classID,
                    parent: parentID
                });
            return res.ok({
                status: 200,
                data: listGroupMessage
            })
        } else if(teacherID != '' && classID != '') {
            let listGroupMessage = await MessageService.find(
                {
                    classes: classID,
                    teacher: teacherID
                });
            return res.ok({
                status: 200,
                data: listGroupMessage
            })
        } else if(teacherID == '' && classID != '') {
            return res.ok({
                status: 400,
                data: 'Missing Teacher ID'
            })
        } else if(parentID == '' && classID != '') {
            return res.ok({
                status: 400,
                data: 'Missing Parent ID'
            })
        } else if(classID == '' && parentID != '') {
            return res.ok({
                status: 400,
                data: 'Missing Class ID'
            })
        } else if(classID == '' && classID != '') {
            return res.ok({
                status: 400,
                data: 'Missing Class ID'
            })
        } else {
            return res.ok({
                status: 400,
                data: 'Need input data ID'
            })
        }
        
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
        let message = params.messageId ? params.messageId : '';
        if (message == '') {
            return res.badRequest('Missing message group id');
        }
        
        let listMessage = await MessageDataService.find({ message: message });
        let data = [];
        if (listMessage.length > 0) {
            for (let i = 0; i < listMessage.length; i++){
                if (listMessage[i].dataLogs.user == listMessage[i].message.teacher) {
                    let tmp = {};
                    let userMessage = await UserService.get(listMessage[i].dataLogs.user);
                    if (!_.isEmpty(userMessage)) {
                        tmp.id = userMessage.id;
                        tmp.fullName = userMessage.fullName;
                        data.push(tmp);
                    }
                    
                } else {
                    let parentMessage = await ParentService.get(listMessage[i].dataLogs.user);
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
        })
    }
};
