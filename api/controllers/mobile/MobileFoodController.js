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

  search: async (req, res) => {
    let params = req.allParams();

    // CHECK TOKEN
    let tempToken = true;
    let token = await AuthService.find(params.token);
    let checkToken = false;
    
    if (token.token === params.tokens) {
      checkToken = true;
    }
    if (tempToken === false) {
      return res.badRequest(AuthError.ERR_SYSTEM_TOKEN_REQUIRE);
      }
      // END CHECK TOKEN
      
      let date = params.date;
      let sizeFood = 10;
      let fromPosition = (params.page - 1) * sizeFood;
      // LIST NOTE
      let newFood = await FoodService.find({ status: sails.config.custom.STATUS.PUBLISH}, sizeFood, fromPosition, null);
      
    return res.json({
        code: 'SUCCESS_200',
        data: newFood
      });
  },
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
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      
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
  }
};
