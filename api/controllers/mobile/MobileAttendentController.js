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
 /**
   @api {put} /api/v1/mobile/attendent/checkAttendent 01. Check Attendent
   @apiName checkAttendent
   @apiVersion 1.0.0
   @apiGroup Attendent

   @apiParam {String} students
   @apiParam {String} class  
    @apiParam {String} dateOff  

   @apiSuccessExample {json} Success-Response:
   HTTP/1.1 200 OK
   {
      {
      "createdAt": 1542248060697,
      "updatedAt": 1542248060697,
      "id": "5becd67c404b6409417980f1",
      "dateOff": "22-12-2018",
      "status": 0,
      "classID": "5be402093f0097227dbf8101"
      }
   }

   @apiErrorExample Error-Response:
   HTTP/1.1 500 Internal Server Error
   {
     code: "SYS001",
     message: "Error system"
   }
   {
      code: 'SYS008',
      message: "JSON format is not valid"
   }
   HTTP/1.1 400 Bad Request
   {
     code: "ERR_ATTENDENT_004",
     message: "Not found"
   }
   {
     code: "ERR_ATTENDENT_005",
     message: "Class ID is required"
   }
   {
     code: "ERR_ATTENDENT_006",
     message: "DateOff is required"
   }
   */

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
      classID: classAttendent,
      dateOff: dateOff,
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT
    };

    // ADD NEW DATA ATTENDENT
    const newAttendent = await AttendentService.add(newData);

    if (arrayStudents) {
      Attendent.addToCollection(newAttendent.id, 'students', arrayStudents).exec(function (err) { });
    }
    if (classAttendent) {
      Attendent.addToCollection(newAttendent.id, 'classID', classAttendent).exec(function (err) { });
    }
    sails.log.info("================================ AttendentController.checkAttendent => END ================================");
    return res.ok(newAttendent);
  },
/**
   @api {put} /api/v1/mobile/attendent/checkStudentByClass 01. Check student by class
   @apiName checkStudentByClass
   @apiVersion 1.0.0
   @apiGroup Attendent

   @apiParam {String} class    

   @apiSuccessExample {json} Success-Response:
   HTTP/1.1 200 OK
   {
    {
            "createdAt": 1541739291847,
            "updatedAt": 1541739291847,
            "id": "5be5131b7c1be172823f5b90",
            "fullName": "Hà Uyên",
            "dateOfBirth": "2018-11-21T17:00:00.000Z",
            "gender": "Female",
            "currentAddress": "hauyen@gmail.com",
            "height": "",
            "weight": "",
            "bloodGroup": "",
            "allergy": "",
            "heartRate": "",
            "eyes": "",
            "ears": "",
            "notes": "",
            "healthHistory": [
                {
                    "date": "0",
                    "symptom": "0",
                    "note": "0"
                }
            ],
            "w_h_History": [
                {
                    "createdAt": 0,
                    "date": 0,
                    "height": 0,
                    "weight": 0
                }
            ],
            "avatar": {
                "createdAt": 1541739280891,
                "updatedAt": 1541739280891,
                "id": "5be513107c1be172823f5b8f",
                "title": "14.png",
                "path": "/assets/images/zadmin/uploads/products/square/53f7dfe9-bb30-48d2-b434-918841581f26.png",
                "caption": "Caption14.png",
                "status": 1,
                "uploadBy": null,
                "school": null
            },
            "admissionDate": "",
            "status": 1,
            "owner": null
        }
   }

   @apiErrorExample Error-Response:
   HTTP/1.1 500 Internal Server Error
   {
     code: "SYS001",
     message: "Error system"
   }
   {
      code: 'SYS008',
      message: "JSON format is not valid"
   }
   HTTP/1.1 400 Bad Request
   {
     code: "ERR_ATTENDENT_004",
     message: "Not found"
   }
   {
     code: "ERR_ATTENDENT_005",
     message: "Class ID is required"
   }
   */
  checkStudentByClass: async (req, res) => { 
    sails.log.info("================================ AttendentController.checkStudentByClass => START ================================");
    let params = req.allParams();
    let classID = params.class;
    if (!classID) {
      return res.badRequest(AttendentError.ERR_CLASS_REQUIRED);
    } 
    let classObj = await ClassService.get({ id: classID });
    let arrStudent = [];
    if (classObj.students.length > 0) {
      for (let i = 0; i < classObj.students.length; i++){
        let mediaID = classObj.students[i].avatar;
        let mediaObj = await MediaService.get({ id: mediaID });
        classObj.students[i].avatar = mediaObj;    
        arrStudent.push(classObj.students[i]);
      }
    }
    sails.log.info("================================ AttendentController.checkStudentByClass => END ================================");
    return res.ok({
      data : arrStudent
    })
  }
};
