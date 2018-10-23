const ScheduleService = require('../../services/ScheduleService');
module.exports = {

    getSchedule: async (req, res) => {
        let params = req.allParams();
        let schedule = await ScheduleService.find({ status: sails.config.custom.STATUS.PUBLISH }, 999, null, null);
        return res.json({
            code: 'SUCCESS_200',
            data: schedule
          });
    },
    
}