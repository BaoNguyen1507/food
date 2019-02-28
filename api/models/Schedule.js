/**
 * @copyright 2017 @ ZiniMediaTeam
 * @author brianvo
 * @create 2017/10/23 01:05
 * @update 2017/10/23 01:05
 * @file api/models/Schedule.js
 * @description :: Schedule  model. Thời khóa biểu: Ăn trưa, vệ sinh và khác subject môn học
 */

module.exports = {
    attributes: {
      slotSubjects: {
          type: 'json',
          description: 'List schedule data',
          defaultsTo: [{ "time": "07:00", "subjects": [] }]
          //Format for subjects -> get full structure from subject model
          //"subjects\":[{"title":"Math Team", "code":"math","alias":"math-team", "description":""}]
      },
      dateUse: {
          type: 'string', /* Ngày áp dụng format YYYY-mm-dd*/
      },
    //   class: {
    //       model: 'class',
    //       required: true
    //   }
    }
};