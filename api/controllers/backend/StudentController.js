/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const StudentError = require('../../../config/errors/student');
const StudentService = require('../../services/StudentService');
var fs = require('fs');
//Library
const moment = require('moment');

module.exports = {
  add: async (req, res) => {
    sails.log.info("================================ StudentController.add => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK FULLNAME & DATEOFBIRTH & GENDER PARAMS
    if (!params.fullName && !params.fullName.trim().length) {
      return res.badRequest(StudentError.ERR_FULLNAME_REQUIRED);
    } else if (!params.gender || !params.gender.trim().length) {
      return res.badRequest(StudentError.ERR_GENDER_REQUIRED);
    } else if (!params.dateOfBirth) {
      return res.badRequest(StudentError.ERR_BIRTHDAY_REQUIRED);
    }

    let healthHistory = [];
    let w_h_History = [];
    let dataHealthHistory = {
      symptom: params.symptom,
      note: params.note
    }
    let data_w_h_History = {
      height: params.height,
      weight: params.weight
    }
    healthHistory.push(dataHealthHistory);
    w_h_History.push(data_w_h_History);
    // PREPARE DATA STUDENT
    const newData = {
      fullName: params.fullName, // REQUIRED
      dateOfBirth: params.dateOfBirth, // REQUIRED
      gender: params.gender ? params.gender : '', // REQUIRED
      currentAddress: params.currentAddress ? params.currentAddress : '',
      height: params.height ? params.height : '',
      weight: params.weight ? params.weight : '',
      bloodGroup: params.bloodGroup ? params.bloodGroup : '',
      allergy: params.allergy ? params.allergy : '',
      heartRate: params.heartRate ? params.heartRate : '',
      eyes: params.eyes ? params.eyes : '',
      ears: params.ears ? params.ears : '',
      notes: params.notes ? params.notes : '',
      avatar: params.thumbnail,
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      createdBy: req.session.userId,
      healthHistory: healthHistory,
      w_h_History: w_h_History
    };

    // ADD NEW DATA STUDENT
    const newStudent = await StudentService.add(newData);
    
    //CREATE RELATIONSHIP BETWEEN STUDENT AND SUBJECT
    
    // RETURN DATA STUDENT
    return res.ok(newStudent);
  },
  importExcel: async (req, res) => {
    sails.log.info("================================ StudentController.Import => START ================================");
    // GET ALL PARAMS
    const originFolder = require('path').resolve(sails.config.appPath, 'assets/images/zadmin/uploads/products/import/');
    
    req.file('file').upload({
      dirname: originFolder
    }, (err, file) => {
      if (err) {
        return res.badRequest(err);
      } else {
        console.log(file[0].fd);
        var dir = require('node-dir');
        var files = dir.files(originFolder, { sync: true });
        const data = fs.readdirSync(originFolder, {encoding: 'utf-8'})
        console.log(files);
        fs.readFileSync(originFolder + '/' + data, 'utf-8').split(/\r?\n/).forEach(function (line) { 
          console.log(line);
        })
        fs.unlinkSync(originFolder + '/' + data);
        
      }
    });
  },
  get: async (req, res) => {
    sails.log.info("================================ StudentController.edit => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK ID PARAM
    if (!params.id) {
      return res.badRequest(StudentError.ERR_ID_REQUIRED);
    }

    // QUERY & CHECK DATA STUDENT
    const student = await StudentService.get({
      id: params.id
    });
    if (!student) {
      return res.notFound(StudentError.ERR_NOT_FOUND);
    }

    // RETURN DATA STUDENT
    return res.json({
      data: student
    });
  },

  edit: async (req, res) => {
    sails.log.info("================================ StudentController.edit => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK FULLNAME & DATEOFBIRTH & GENDER PARAMS
    if (!params.fullName && !params.fullName.trim().length) {
      return res.badRequest(StudentError.ERR_FULLNAME_REQUIRED);
    } else if (!params.gender || !params.gender.trim().length) {
      return res.badRequest(StudentError.ERR_GENDER_REQUIRED);
    } else if (!params.dateOfBirth) {
      return res.badRequest(StudentError.ERR_BIRTHDAY_REQUIRED);
    } 
    
    // PREPARE DATA STUDENT
    const newData = {
      fullName: params.fullName, // REQUIRED
      dateOfBirth: params.dateOfBirth, // REQUIRED
      gender: params.gender ? params.gender : '', // REQUIRED
      currentAddress: params.currentAddress ? params.currentAddress : '',
      height: params.height ? params.height : '',
      weight: params.weight ? params.weight : '',
      bloodGroup: params.bloodGroup ? params.bloodGroup : '',
      allergy: params.allergy ? params.allergy : '',
      heartRate: params.heartRate ? params.heartRate : '',
      eyes: params.eyes ? params.eyes : '',
      ears: params.ears ? params.ears : '',
      notes: params.notes ? params.notes : '',
      avatar: params.thumbnail,
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      createdBy: req.session.userId
    };

    if(params.healthHistory){
      newData.healthHistory = params.healthHistory;
    }

    if(params.w_h_History){
      newData.w_h_History = params.w_h_History;
    }

    // CHECK DATA STUDENT
    const student = StudentService.get({
      id: params.id
    });
    if (!student) {
      return res.notFound(StudentError.ERR_NOT_FOUND);
    }

    // UPDATE DATA STUDENT
    const editObj = await StudentService.edit({
      id: params.id
    }, newData);

    // RETURN DATA STUDENT
    return res.json({
      data: editObj
    });
  },

  trash: async (req, res) => {
    sails.log.info("================================ StudentController.trash => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK IDS PARAM
    if (!params.ids || !params.ids.length) {
      return res.badRequest(StudentError.ERR_ID_REQUIRED);
    }

    // CHECK STUDENT & UPDATE
    const students = await StudentService.find({
      id: params.ids
    });
    if (typeof params.ids === 'string') {
      if (!students.length) {
        return res.badRequest(StudentError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    } else {
      if (students.length !== params.ids.length) {
        return res.badRequest(StudentError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    }

    await Student.update({
      id: params.ids
    }).set({
      status: sails.config.custom.STATUS.TRASH
    });

    // RETURN DATA
    return res.json();
  },

  search: async (req, res) => {
    sails.log.info("================================ StudentController.search => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();

    // PREAPARE BODY PARAMS
    const bodyParams = {
      filter: (params.filter && params.filter.trim().length) ? JSON.parse(params.filter) : null,
      limit: (params.limit !== 'null') ? params.limit : 10,
      offset: params.offset ? params.offset : null,
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
          fullName: {
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

    // QUERY DATA STUDENT
    const students = await StudentService.find(where, bodyParams.limit, bodyParams.offset, bodyParams.sort),
      total = await StudentService.count({
        status: {
          '>=': sails.config.custom.STATUS.ALL
        }
      }),
      trash = await StudentService.count({ status: sails.config.custom.STATUS.TRASH }),
      publish = await StudentService.count({ status: sails.config.custom.STATUS.PUBLISH });

    // RETURN DATA STUDENTS
    return res.json({
      recordsTotal: total,
      recordsTrash: trash,
      recordsPublish: publish,
      data: students
    });
  }
};
