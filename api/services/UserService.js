/**
 * @copyright 2017 @ ZiniMedia Team
 * @author thanhvo
 * @create 2017/10/25 09:52
 * @update 2017/10/25 09:52
 * @file api/services/UserService.js
 */
'use strict';

const UserService = {
    get: async (options) => {
        sails.log.info("================================ UserService.get -> options: ================================");
        sails.log.info(options);

        let records = await User.findOne(options);
        return records;
        
    },

    add : async (options) => {
        sails.log.info("================================ UserService.add -> options: ================================");
        sails.log.info(options);
        
        let newObj = await User.create(options)
        // Some other kind of usage / validation error
        .intercept('UsageError', (err)=> {
            return 'invalid';
        })
        .fetch();
        sails.log.info("================================ UserService.add -> new object: ================================");
        sails.log.info(newObj);
        return newObj;
    },

    edit: async (query, params) => {
        sails.log.info("================================ UserService.edit -> query, params: ================================");
        sails.log.info(query);
        sails.log.info(params);

        let options = {};

        for(let key in User.attributes) {
            if( key === "id" || key === "createdAt" || key === "toJSON" ) continue;

            if(params && typeof(params[key]) !== "undefined") {
                options[key] = params[key];
            }
        }

        options.updatedAt = new Date().getTime();
        
        let editObj = await User.update(query, options).fetch();
        sails.log.info("================================ UserService.edit -> edit object: ================================");
        sails.log.info(editObj);
        return editObj;
    },

    find:  async( where, limit, skip, sort) => {
        sails.log.info("================================ UserService.find -> where: ================================");
        sails.log.info(JSON.stringify(where));
        sails.log.info(limit);
        sails.log.info(skip);
        sails.log.info(sort);
        where = (typeof where === 'object') ? where : {};
        limit = (limit !== null && typeof limit === 'number') ? limit : 10;
        skip = (skip !== null && typeof skip === 'number') ? skip: 0;
        sort = (sort !== null && typeof sort === 'object') ? sort : [{ createdAt: 'DESC' }];

        let Users  = await User.find({ where: where, limit: limit, skip: skip, sort: sort})
            .populate("avatar")
            .populate("albums")
            .populate("post")
            .populate("taxonomy")
            .populate("comments")
            .populate("settings")
            .populate("schools")
            .populate("classes")
            .populate("student");
        return Users;    
    },

    count: async (where) => {
        where = (typeof where === 'object') ? where : {};
        let totalUser  = await User.count(where);
        return totalUser;
    }
};

module.exports = UserService;