/**
 * Schedule Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const ScheduleError = require('../../../config/errors/schedule');
const ScheduleService = require('../../services/ScheduleService');
const SubjectService = require('../../services/SubjectService');
//Library
const moment = require('moment');

module.exports = {
	search: async (req, res) => {
		let params = req.allParams();

    if (!params.dateUse) {
      return res.badRequest(ScheduleError.ERR_DATE_REQUIRED);
    }
    const tmpData = {
      dateUse: params.dateUse
    };

    const find = await ScheduleService.find(tmpData);
    if (find.length > 0) {
			let i, j, k;
			
      for (i=0; i<find.length; i++) {
        if (find[i].slotSubjects.length > 0) {
          for (j=0; j<find[i].slotSubjects.length; j++) {
            if (find[i].slotSubjects[j].subjects.length > 0) {
              for (k=0; k<find[i].slotSubjects[j].subjects.length; k++) {
                let findSubjects = null;
                findSubjects = await SubjectService.get({id: find[i].slotSubjects[j].subjects[k]});
                if (findSubjects) {
                  find[i].slotSubjects[j].subjects[k] = findSubjects;
                }
              }
            }
          }
        }
      }
    }

    return res.ok({
      data: find
    });
	}
    
}