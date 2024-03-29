/**
 * @copyright 2017 @ ZiniMedia Team
 * @author thanhvo
 * @create 2017/10/25 09:52
 * @update 2017/10/25 09:52
 * @file api/services/ClassService.js
 */
'use strict';

const StudentService = {
    get: async (options) => {
        sails.log.info("================================ StudentService.get -> options: ================================");
        sails.log.info(options);

        let records = await Student.findOne(options)
            .populate("class")
            .populate("parents");
            //.populate("avatars");
        return records;

    },

    add: async (options) => {
        sails.log.info("================================ StudentService.add -> options: ================================");
        sails.log.info(options);

        let newObj = await Student.create(options)
            // Some other kind of usage / validation error
            .intercept('UsageError', (err) => {
                return 'invalid';
            })
            .fetch();
        sails.log.info("================================ StudentService.add -> new object: ================================");
        sails.log.info(newObj);
        return newObj;
    },

    edit: async (query, params) => {
        sails.log.info("================================ StudentService.edit -> query, params: ================================");
        sails.log.info(query);
        sails.log.info(params);

        let options = {};

        for (let key in Student.attributes) {
            if (key === "id" || key === "creadtedAt" || key === "toJSON") continue;

            if (params && typeof (params[key]) !== "undefined") {
                options[key] = params[key];
            }
        }
        options.updatedAt = new Date().getTime();
        let editObj = await Student.update(query, options).fetch();
        sails.log.info("================================ StudentService.edit -> edit object: ================================");
        sails.log.info(editObj);
        return editObj;
    },
    del: (options, cb) => {
        sails.log.info("================================ StudentService.del -> options: ================================");
        sails.log.info(options);

        Student.destroy(options).exec((error, deletedRecords) => {
            if (error) {
                sails.log.error(error);
                return cb(error, null);
            }

            return cb(null, deletedRecords);
        });
    },

    find: async (where, limit, skip, sort) => {
        sails.log.info("================================ StudentService.find -> where: ================================");
        sails.log.info(JSON.stringify(where));
        sails.log.info(limit);
        sails.log.info(skip);
        sails.log.info(sort);
        where = (typeof where === 'object') ? where : {};
        limit = (limit !== 'null') ? limit : 10;
        skip = (skip !== null) ? skip : 0;
        sort = (sort !== null && typeof sort === 'object') ? sort : [{ createdAt: 'ASC' }];

        let classes = await Student.find({ where: where, limit: limit, skip: skip, sort: sort })
            .populate("parents")
            .populate("class")
            .populate("owner");
            //.populate("avatars");
        return classes;
    },

    count: async (where) => {
        where = (typeof where === 'object') ? where : {};
        let totalStudent = await Student.count(where);
        return totalStudent;
    }
};
module.exports = StudentService;