/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const StudentError = require('../../../config/errors/student');
const StudentService = require('../../services/StudentService');
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
  // resizeAvatar: async (req, res) => {
  //   var imageData = { 
  //         origin: '/images/uploads/2018/' + oriFileName,
  //         horizontal: '/images/uploads/2018/'+ _cust.UPLOAD.THUMB.HORIZONTAL.name +'/' + thumbHorzontal,
  //         vertical: '/images/uploads/2018/'+ _cust.UPLOAD.THUMB.VERTICAL.name +'/' + thumbVertical,
  //         square: '/images/uploads/2018/'+ _cust.UPLOAD.THUMB.SQUARE.name +'/' + thumbSquare
  //       }
  //   Sharp(ofile[0].fd).resize(_cust.UPLOAD.THUMB.HORIZONTAL.width, _cust.UPLOAD.THUMB.HORIZONTAL.height).crop(Sharp.gravity.northwest)
  //     .toFile(require('path').resolve(sails.config.appPath, 'assets/images/uploads/2018/'+ _cust.UPLOAD.THUMB.HORIZONTAL.name +'/') + '/' + thumbHorzontal)
  //     .then((info) => {}).catch( (err) => { sails.log(err); });      
  // }
};
