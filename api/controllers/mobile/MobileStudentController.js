/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const StudentError = require('../../../config/errors/student');
const StudentService = require('../../services/StudentService');

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
  }  
};
