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
        message: {
            model:'message',
            required: true
        },
        user: {
            model: 'user',
            required: true
        },
        message: {
            type:'string',
            required: true
        },
        time: {
            type: 'string',
            columnType: 'datetime',
            required: true
        }
    }
};