/**
 * AlbumController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const AttendentError = require('../../../config/errors/attendent');
const AttendentService = require('../../services/AttendentService');
const StudentService = require('../../services/StudentService');
const ClassService = require('../../services/ClassService');
module.exports = {

  checkAttendent: async (req, res) => {
    sails.log.info("================================ AttendentController.checkAttendent => START ================================");
    let params = req.allParams();
    let arrayStudents = params.students;
    let classAttendent = params.class;
    let dateOff = params.dateOff; 
    if (!classAttendent) {
      return res.badRequest(AttendentError.ERR_CLASS_REQUIRED);
    } else if (!dateOff){
      return res.badRequest(AttendentError.ERR_DATEOFF_REQUIRED);
    }
    const newData = {
      students: arrayStudents, 
      class: classAttendent,
      dateOff: dateOff,
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT
    };

    // ADD NEW DATA ATTENDENT
    const newAttendent = await AttendentService.add(newData);

    if (arrayStudents) {
      Attendent.addToCollection(newAttendent.id, 'students', arrayStudents).exec(function (err) { });
    }
    if (classAttendent) {
      Attendent.addToCollection(newAttendent.id, 'class', classAttendent).exec(function (err) { });
    }
    sails.log.info("================================ AttendentController.checkAttendent => END ================================");
    return res.ok(newAttendent);
  },
  checkStudentByClass: async (req, res) => { 
    sails.log.info("================================ AttendentController.checkStudentByClass => START ================================");
    let params = req.allParams();
    let classID = params.class;
    if (!classID) {
      return res.badRequest(AttendentError.ERR_CLASS_REQUIRED);
    } 
    let classObj = await ClassService.get({ id: classID });
    let arrStudent = [];
    for (let i = 0; i < classObj.students.length; i++){
      let tmp = {};
      tmp.fullName = classObj.students[i].fullName;
      tmp.gender = classObj.students[i].gender;
      arrStudent.push(tmp);
    }
    sails.log.info("================================ AttendentController.checkStudentByClass => END ================================");
    return res.ok({
      data : arrStudent
    })
  }
};
