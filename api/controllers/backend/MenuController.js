/**
 * MenuController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const MenuError = require('../../../config/errors/menu');
const MenuService = require('../../services/MenuService');
//Library
const moment = require('moment');

module.exports = {
 
  add: async (req, res) => {
    sails.log.info("================================ MenuController.add => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();
    // CHECK FULLNAME & EMAILADDRESS & GENDER PARAMS
    if (!params.time) {
      return res.badRequest(MenuError.ERR_TITLE_REQUIRED);
    } else if (!params.title || !params.title.trim().length) {
      return res.badRequest(MenuError.ERR_TIME_REQUIRED);
    }
    let meal = params.meal;
    // PREPARE DATA MENU
    const newData = {
      time: params.time, // REQUIRED
      title: params.title, // REQUIRED
      meal: meal,
      date : params.date,
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      createdBy: req.session.userId
    };
    
    // ADD NEW DATA MENU
    const newMenu = await MenuService.add(newData);
    if (meal) {
      await Menu.addToCollection(newMenu.id, 'meal', meal).exec(function (err) { });
    }
    // RETURN DATA MENU
    return res.ok(newMenu);
  },

  get: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK ID PARAM
    if (!params.id) {
      return res.badRequest(MenuError.ERR_ID_REQUIRED);
    }

    // QUERY & CHECK DATA POST
    const menu = await MenuService.get({
      id: params.id
    });
    if (!menu) {
      return res.notFound(MenuError.ERR_NOT_FOUND);
    }

    // RETURN DATA POST
    return res.json({
      data: menu
    });
  },

  edit: async (req, res) => {
    sails.log.info("================================ MenuController.edit => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();
    if (!params.time) {
      return res.badRequest(MenuError.ERR_TITLE_REQUIRED);
    } else if (!params.title || !params.title.trim().length) {
      return res.badRequest(MenuError.ERR_TIME_REQUIRED);
    }
    let meal = params.meal;
    // PREPARE DATA MENU
    const newData = {
      time: params.time, // REQUIRED
      title: params.title, // REQUIRED
      meal: meal,
      date : params.date,
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      createdBy: req.session.userId
    };

    // CHECK DATA MENU
    const menu = MenuService.get({
      id: params.id
    });
    if (!menu) {
      return res.notFound(MenuError.ERR_NOT_FOUND);
    }
    // UPDATE DATA MENU
    const editObj = await MenuService.edit({
      id: params.id
    }, newData);
    if (meal) {
      await Menu.replaceCollection(editObj[0].id, 'meal', meal).exec(function (err) { });
    }
    // RETURN DATA Menu
    return res.json({
      data: editObj[0]
    });
  },

  trash: async (req, res) => {
    sails.log.info("================================ MenuController.trash => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();
    // CHECK IDS PARAM
    if (!params.ids || !params.ids.length) {
      return res.badRequest(MenuError.ERR_ID_REQUIRED);
    }
    // CHECK Menu & UPDATE
    const menus = await MenuService.find({
      id: params.ids
    });
    if (typeof params.ids === 'string') {
      if (!menus.length) {
        return res.badRequest(MenuError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    } else {
      if (menus.length !== params.ids.length) {
        return res.badRequest(MenuError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    }
    await Menu.update({
      id: params.ids
    }).set({
      status: 3
    });
    // RETURN DATA
    return res.json();
  },

  search: async (req, res) => {
    sails.log.info("================================ MenuController.search => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();

   // PREAPARE BODY PARAMS
   const bodyParams = {
    filter: (params.filter && params.filter.trim().length) ? JSON.parse(params.filter) : null,
    limit: (params.limit !== 'null') ? params.limit : 10,
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
        meal: {
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
    // QUERY DATA menu
    const menus = await MenuService.find(where, bodyParams.limit, bodyParams.offset, bodyParams.sort),
      total = await MenuService.count({
        status: {
          '>=': sails.config.custom.STATUS.ALL
        }
      }),
      trash = await MenuService.count({ status: sails.config.custom.STATUS.TRASH }),
      publish = await MenuService.count({ status: sails.config.custom.STATUS.PUBLISH });

    // RETURN DATA Menu
    return res.json({
      recordsTotal: total,
      recordsTrash: trash,
      recordsPublish: publish,
      data: menus
    });
  }
};
