/**
 * @copyright 2017 @ ZiniMedia Team
 * @author thanhvo
 * @create 2017/10/25 10:52
 * @update 2017/10/25 10:52
 * @file api/controllers/NotificationController.js
 */

const NotificationError = require('../../../config/errors/notification');
const NotificationService = require('../../services/NotificationService');
const moment = require('moment');

const BackendNotificationController = {

  get: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK ID PARAM
    if (!params.id) {
      return res.badRequest(NotificationError.ERR_ID_REQUIRED);
    }

    // QUERY & CHECK DATA NOTIFICATION
    const notification = await NotificationService.get({
      id: params.id
    });
    if (!notification) {
      return res.notFound(NotificationError.ERR_NOT_FOUND);
    }

    // RETURN DATA NOTIFICATION
    return res.json({
      data: notification
    });
  },

  list: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // QUERY DATA NOTIFICATION
    const notes = await NotificationService.find({
      status: sails.config.custom.STATUS.PUBLISH
    }, params.limit, (params.page-1) * params.limit, params.sort),
      
    // RETURN DATA NOTIFICATION
    return res.json({
      data: notes
    });
  }
};

module.exports = BackendNotificationController;