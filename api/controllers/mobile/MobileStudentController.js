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
