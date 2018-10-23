/**
 * @copyright 2018 @ ZiniMedia Ltd. Co
 * @author thanhvo
 * @create 2017/10/21 20:18
 * @update 2017/10/21 20:18
 * @file api/models/Auth.js
 */
'use strict';

module.exports = {
    attributes: {
        expireAt: {
            type: 'number',
            defaultsTo: Date.now() + 5 * 60
        },
        token: {
            type:'string'
        }
    }
};