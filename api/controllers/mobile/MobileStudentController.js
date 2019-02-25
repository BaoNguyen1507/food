/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const StudentError = require('../../../config/errors/student');
const StudentService = require('../../services/StudentService');
const MediaService = require('../../services/MediaService');
const Sharp = require('sharp/lib');
//Library
const moment = require('moment');

module.exports = {

  updateStudentDetail: async (req, res) => {
    let params = req.allParams();
    let idStudent = params.idStudent;
    let height = parseInt(params.height);
    let weight = parseInt(params.weight);
    let date = params.date;
    let createdAt = moment().valueOf();

    if (idStudent == '') {
      return res.badRequest('Missing id');
    }
    let studentObj = await Student.findOne(idStudent);
    let data = {
      createdAt: createdAt,
      date: date,
      height: height,
      weight: weight
    }
    // Find date in w_h_history
    var found = studentObj.w_h_History.some(function (el) {
      return el.date === date;
    });
    let editObj = {};
    if (found == true) {
      for (let i = 0; i < studentObj.w_h_History.length; i++) {
        if (date == studentObj.w_h_History[i].date) {
          studentObj.w_h_History[i].height = height;
          studentObj.w_h_History[i].weight = weight;
        editObj = await Student.update(idStudent)
          .set(studentObj)
          .fetch();
        }
      }
    } else {
      studentObj.w_h_History.push(data);
      editObj = await Student.update(idStudent)
      .set(studentObj)
      .fetch();
    }
    sails.log(found);
    
    sails.log(studentObj.w_h_History);
    sails.log(createdAt);
    return res.json({
      code: 'SUCCESS_200',
      data: editObj
    })
  },
  getStudent: async (req, res) => {
    let params = req.allParams();
    let student = await StudentService.get({ id: params.id });
    if (student.length === 0) {
        return res.badRequest(StudentError.ERR_NOT_FOUND);
      }
    return res.json({
      code: 'SUCCESS_200',
      data: student
    });
  },
  getStudentThumb: async (req, res) => {
    let params = req.allParams();
    let sizeStudent = 10;
    let fromPosition = (params.page - 1) * sizeStudent;
    // LIST ALBUM
    let studentArr = await StudentService.find({ status: sails.config.custom.STATUS.PUBLISH }, sizeStudent, fromPosition, null);
    if (studentArr.length === 0) {
      return res.badRequest(StudentError.ERR_NOT_FOUND);
    }
    let listStudent = [];
    for (let i = 0; i < studentArr.length; i++){
      let listMediaObj = [];
      let mediaId = studentArr[i].avatar;
      let mediaObj = await MediaService.get({ id: mediaId });   
        listMediaObj.push(mediaObj);
        studentArr[i].avatar = listMediaObj;
        listStudent.push(studentArr[i]);
    }
    return res.json({
      code: 'SUCCESS_200',
      data: listStudent
    });
  }
};
