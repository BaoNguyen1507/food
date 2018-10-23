/**
 * @copyright 2017 @ ZiniMedia Team
 * @author thanhvo
 * @create 2017/10/25 09:52
 * @update 2017/10/25 09:52
 * @file api/services/SchoolService.js
 */
'use strict';

const SchoolService = {
    get: async (options) => {
        sails.log.info("================================ SchoolService.get -> options: ================================");
        sails.log.info(options);

        let records = await School.findOne(options);
        return records;

    },

    add: async (options) => {
        sails.log.info("================================ SchoolService.add -> options: ================================");
        sails.log.info(options);

        let newObj = await School.create(options)
            // Some other kind of usage / validation error
            .intercept('UsageError', (err) => {
                return 'invalid';
            })
            .fetch();
        sails.log.info("================================ SchoolService.add -> new object: ================================");
        sails.log.info(newObj);
        return newObj;
    },

    edit: async (query, params) => {
        sails.log.info("================================ SchoolService.edit -> query, params: ================================");
        sails.log.info(query);
        sails.log.info(params);

        let options = {};

        for (let key in School.attributes) {
            if (key === "id" || key === "creadtedAt" || key === "toJSON") continue;

            if (params && typeof (params[key]) !== "undefined") {
                options[key] = params[key];
            }
        }
        options.updatedAt = new Date().getTime();
        let editObj = await School.update(query, options).fetch();
        sails.log.info("================================ SchoolService.edit -> edit object: ================================");
        sails.log.info(editObj);
        return editObj;
    },

    del: (options, cb) => {
        sails.log.info("================================ SchoolService.del -> options: ================================");
        sails.log.info(options);

        School.destroy(options).exec((error, deletedRecords) => {
            if (error) {
                sails.log.error(error);
                return cb(error, null);
            }

            return cb(null, deletedRecords);
        });
    },

    find: async (where, limit, skip, sort) => {
        sails.log.info("================================ SchoolService.find -> where: ================================");
        sails.log.info(JSON.stringify(where));
        sails.log.info(limit);
        sails.log.info(skip);
        sails.log.info(sort);
        where = (typeof where === 'object') ? where : {};
        limit = (limit !== null && typeof limit === 'number') ? limit : 10;
        skip = (skip !== null && typeof skip === 'number') ? skip : 0;
        sort = (sort !== null && typeof sort === 'object') ? sort : [{ createdAt: 'DESC' }];

        let school = await School.find({ where: where, limit: limit, skip: skip, sort: sort })
            .populate("media");

        return school;
    },

    count: async (where) => {
        where = (typeof where === 'object') ? where : {};
        let totalSchool = await School.count(where);
        return totalSchool;
    }
};

module.exports = SchoolService;