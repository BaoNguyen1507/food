/**
 * @copyright 2017 @ ZiniMedia Team
 * @author thanhvo
 * @create 2017/10/25 09:52
 * @update 2017/10/25 09:52
 * @file api/services/NotificationService.js
 */
'use strict';

const NotificationService = {
    get: async (options) => {
        sails.log.info("================================ NotificationService.get -> options: ================================");
        sails.log.info(options);

        let records = await Notifications.findOne(options);
        return records;

    },

    add: async (options) => {
        sails.log.info("================================ NotificationService.add -> options: ================================");
        sails.log.info(options);

        let newObj = await Notifications.create(options)
            // Some metaFields kind of usage / validation error
            .intercept('UsageError', (err) => {
                return 'invalid';
            })
            .fetch();
        sails.log.info("================================ NotificationService.add -> new object: ================================");
        sails.log.info(newObj);
        return newObj;
    },

    edit: async (query, params) => {
        sails.log.info("================================ NotificationService.edit -> query, params: ================================");
        sails.log.info(query);
        sails.log.info(params);

        let options = {};

        for (let key in Notifications.attributes) {
            if (key === "id" || key === "createdAt" || key === "toJSON") continue;

            if (params && typeof (params[key]) !== "undefined") {
                options[key] = params[key];
            }
        }

        options.updatedAt = new Date().getTime();

        let editObj = await Notifications.update(query, options).fetch();
        sails.log.info("================================ NotificationService.edit -> edit object: ================================");
        sails.log.info(editObj);
        return editObj;
    },

    del: (options, cb) => {
        sails.log.info("================================ NotificationService.del -> options: ================================");
        sails.log.info(options);

        User.destroy(options).exec((error, deletedRecords) => {
            if (error) {
                sails.log.error(error);
                return cb(error, null);
            }

            return cb(null, deletedRecords);
        });
    },

    find: async (where, limit, skip, sort) => {
        sails.log.info("================================ NotificationService.find -> where: ================================");
        sails.log.info(JSON.stringify(where));
        sails.log.info(limit);
        sails.log.info(skip);
        sails.log.info(sort);
        where = (typeof where === 'object') ? where : {};
        limit = (limit !== 'null') ? limit : 10;
        skip = (skip !== null && typeof skip === 'number') ? skip : 0;
        sort = (sort !== null && typeof sort === 'object') ? sort : [{ createdAt: 'ASC' }];

        let notification = await Notifications.find({ where: where, limit: limit, skip: skip, sort: sort });
        return notification;
    },

    count: async (where) => {
        where = (typeof where === 'object') ? where : {};
        let totalNotification = await Notifications.count(where);
        return totalNotification;
    }
};

module.exports = NotificationService;