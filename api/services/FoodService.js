/**
 * @copyright 2017 @ ZiniMedia Team
 * @author thanhvo
 * @create 2017/10/25 09:52
 * @update 2017/10/25 09:52
 * @file api/services/FoodService.js
 */
'use strict';

const FoodService = {
    get: async (options) => {
        sails.log.info("================================ FoodService.get -> options: ================================");
        sails.log.info(options);

        let records = await Food.findOne(options);
        return records;
        
    },

    add : async (options) => {
        sails.log.info("================================ FoodService.add -> options: ================================");
        sails.log.info(options);
        
        let newObj = await Food.create(options)
        // Some other kind of usage / validation error
        .intercept('UsageError', (err)=> {
            return 'invalid';
        })
        .fetch();
        sails.log.info("================================ FoodService.add -> new object: ================================");
        sails.log.info(newObj);
        return newObj;
    },

    edit: async (query, params) => {
        sails.log.info("================================ FoodService.edit -> query, params: ================================");
        sails.log.info(query);
        sails.log.info(params);

        let options = {};

        for(let key in Food.attributes) {
            if( key === "id" || key === "createdAt" || key === "toJSON" ) continue;

            if(params && typeof(params[key]) !== "undefined") {
                options[key] = params[key];
            }
        }

        options.updatedAt = new Date().getTime();
        
        let editObj = await Food.update(query, options).fetch();
        sails.log.info("================================ FoodService.edit -> edit object: ================================");
        sails.log.info(editObj);
        return editObj;
    },

    del: (options, cb) => {
        sails.log.info("================================ FoodService.del -> options: ================================");
        sails.log.info(options);

        Food.destroy(options).exec( (error, deletedRecords) => {
            if(error) {
                sails.log.error(error);
                return cb(error, null);
            }

            return cb(null, deletedRecords);
        });
    },

    find:  async( where, limit, skip, sort) => {
        sails.log.info("================================ FoodService.find -> where: ================================");
        sails.log.info(JSON.stringify(where));
        sails.log.info(limit);
        sails.log.info(skip);
        sails.log.info(sort);
        where = (typeof where === 'object') ? where : {};
        limit = (limit !== null && typeof limit === 'number') ? limit : 10;
        skip = (skip !== null && typeof skip === 'number') ? skip: 0;
        sort = (sort !== null && typeof sort === 'object') ? sort : [{ createdAt: 'DESC' }];

        let food  = await Food.find({ where: where, limit: limit, skip: skip, sort: sort})
            .populate("menus");
            // //.populate("createdBy", {select: ['id', 'fullName', 'type']})
            // .populate("createdBy");
        return food;    
    },

    count: async (where) => {
        where = (typeof where === 'object') ? where : {};
        let totalFood  = await Food.count(where);
        return totalFood;
    }
};

module.exports = FoodService;