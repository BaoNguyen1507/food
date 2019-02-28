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
        tuitionName: {
            type:'string'
        },
        classes: {
            model:'class'
        },
        type: {
            type: 'number',
            isIn: [sails.config.custom.TYPE.NOTPAID,sails.config.custom.TYPE.PAID],
            defaultsTo: sails.config.custom.TYPE.NOTPAID
        }
    }
};