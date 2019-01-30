/**
 * @copyright 2017 @ ZiniMediaTeam
 * @author brianvo
 * @create 2017/10/23 01:05
 * @update 2017/10/23 01:05
 * @file api/models/Menu.js
 * @description :: Menu  model.
 */

module.exports = {
  attributes: {
    slotFeedings: {
      type: 'json',
      description: 'List schedule data',
      defaultsTo: [{ "key": "1part", "time": "07:00", "foods": []}]
      //Format for food
      //"foods\":[{"title":"Banana", "description":"Banana","nutrition":0.25, "thumbnail":"/path/aa.jpg"}]
    },
    dateUse: {
        type: 'string', /* Ngày áp dụng format YYYY-mm-dd*/
    },
    // class: {
    //   model: 'class'
    // }
  }
};