/**
 * FoodController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const FoodError = require('../../../config/errors/food');
const FoodService = require('../../services/FoodService');
//Library
const moment = require('moment');

module.exports = {
 
  add: async (req, res) => {
    sails.log.info("================================ FoodController.add => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();
    // CHECK TITLE & NUTRITION & DESCRIPTION PARAMS
    if (!params.title || !params.title.trim().length) {
      return res.badRequest(FoodError.ERR_TITLEFOOD_REQUIRED);
    } else if (!params.nutrition || !params.nutrition.trim().length) {
      return res.badRequest(FoodError.ERR_NUTRITION_REQUIRED);
    } else if (!params.description || !params.description.trim().length) {
      return res.badRequest(FoodError.ERR_DESCRIPTION_REQUIRED);
    }
    // PREPARE DATA FOOD
    const newData = {
      title: params.title, // REQUIRED
      nutrition: params.nutrition, // REQUIRED
      description: params.description, // REQUIRED
      thumbnail: params.thumbnail,
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      createdBy: req.session.userId
    };
    // ADD NEW DATA FOOD
    const newFood = await FoodService.add(newData);
    // RETURN DATA FOOD
    return res.ok(newFood);
  },

  get: async (req, res) => {
    sails.log.info("================================ FoodController.get => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();
    // CHECK ID PARAM
    if (!params.id) {
      return res.badRequest(FoodError.ERR_ID_REQUIRED);
    }
    // QUERY & CHECK DATA FOOD
    const foods = await FoodService.get({
      id: params.id
    });
    if (!foods) {
      return res.notFound(FoodError.ERR_NOT_FOUND);
    }
    // RETURN DATA FOOD
    return res.json({
      data: foods
    });
  },

  edit: async (req, res) => {
    sails.log.info("================================ FoodController.edit => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();
    // CHECK TITLE & NUTRITION & DESCRIPTION PARAMS 
    if (!params.title || !params.title.trim().length) {
      return res.badRequest(FoodError.ERR_TITLE_REQUIRED);
    } else if (!params.nutrition || !params.nutrition.trim().length) {
      return res.badRequest(FoodError.ERR_NUTRITION_REQUIRED);
    } else if (!params.description || !params.description.trim().length) {
      return res.badRequest(FoodError.ERR_DESCRIPTION_REQUIRED);
    }
    // PREPARE DATA FOOD
    const newData = {
      title: params.title, // REQUIRED
      nutrition: params.nutrition, // REQUIRED
      description: params.description, // REQUIRED
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      createdBy: req.session.userId
    };
    // CHECK DATA FOOD
    const foods = FoodService.get({
      id: params.id
    });
    if (!foods) {
      return res.notFound(FoodError.ERR_NOT_FOUND);
    }
    // UPDATE DATA FOOD
    const editObj = await FoodService.edit({
      id: params.id
    }, newData);
    // RETURN DATA FOOD
    return res.json({
      data: editObj
    });
  },

  trash: async (req, res) => {
    sails.log.info("================================ FoodController.trash => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();
    // CHECK IDS PARAM
    if (!params.ids || !params.ids.length) {
      return res.badRequest(FoodError.ERR_ID_REQUIRED);
    }
    // CHECK FOOD & UPDATE
    const foods = await FoodService.find({
      id: params.ids
    });
    if (typeof params.ids === 'string') {
      if (!foods.length) {
        return res.badRequest(FoodError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    } else {
      if (foods.length !== params.ids.length) {
        return res.badRequest(FoodError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    }

    await Food.update({
      id: params.ids
    }).set({
      status: sails.config.custom.STATUS.TRASH
    });

    // RETURN DATA
    return res.json();
  },

  search: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();
    // PREAPARE BODY PARAMS
    const bodyParams = {
      filter: (params.filter && params.filter.trim().length) ? JSON.parse(params.filter) : null,
      limit: params.limit ? Number(params.limit) : null,
      offset: params.offset ? Number(params.offset) : null,
      sort: (params.sort && params.sort.trim().length) ? JSON.parse(params.sort) : null
    };
    let where = {};
    if (bodyParams.filter.status) {
      where = {
        status: bodyParams.filter.status === sails.config.custom.STATUS.ALL ? {
          '>=': sails.config.custom.STATUS.ALL
        } : bodyParams.filter.status
      }
    } else if (bodyParams.filter.rangeDate.active) {
      where = {
        createdAt: {
          '>=': moment(bodyParams.filter.rangeDate.begin).valueOf(),
          '<=': moment(bodyParams.filter.rangeDate.end).valueOf()
        }
      }
    } else if (typeof bodyParams.filter.keyWord === "string" && bodyParams.filter.keyWord.trim().length) {
      where = {
        or: [{
          title: {
            contains: bodyParams.filter.keyWord
          }
        }, {
          nutrition: {
            contains: bodyParams.filter.keyWord
          }
        }]
      }
    } else {
      // nothing to do
    }
    let condition;
    if (params.condition && !Utils.isJsonString(params.condition)) {
      return res.serverError(ErrorService.SYSTEM_JSON_FORMAT_FAIL);
    } else {
      condition = (params.condition) ? JSON.parse(params.condition) : null;
    }
    if (condition) {
      where = condition;
    }
    // QUERY DATA FOOD
    const foods = await FoodService.find(where, bodyParams.limit, bodyParams.offset, bodyParams.sort),
      total = await FoodService.count({
        status: {
          '>=': sails.config.custom.STATUS.ALL
        }
      }),
      trash = await FoodService.count({ status: sails.config.custom.STATUS.TRASH }),
      publish = await FoodService.count({ status: sails.config.custom.STATUS.PUBLISH });

    // RETURN DATA FOODS
    return res.json({
      recordsTotal: total,
      recordsTrash: trash,
      recordsPublish: publish,
      data: foods
    });
  }
};
