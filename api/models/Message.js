/**
 * @copyright 2018 @ ZiniMedia Ltd. Co
 * @author thanhvo
 * @create 2019/10/21 20:18
 * @update 2019/10/21 20:18
 * @file api/models/Auth.js
 */
'use strict';

module.exports = {
    attributes: {
        teacherID: {
            type: 'string'
        },
        parentID: {
            type:'string'
        },
        type: {
            type: 'number',
            isIn: [sails.config.custom.TYPE.PRIVATE,sails.config.custom.TYPE.PUBLIC],
            defaultsTo: sails.config.custom.TYPE.PRIVATE
        },
        dataLogs: {
            type: 'json',
            defaultsTo: [{userID:"", message:"", time:""}]
        },
        lastSeen: {
            type: 'string',
            columnType: 'datetime'
        }
    }
};