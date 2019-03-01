/**
 * MenuController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const MenuError = require('../../../config/errors/menu');
const MenuService = require('../../services/MenuService');
const FoodService = require('../../services/FoodService');
const SchoolService = require('../../services/SchoolService');
const ClassService = require('../../services/ClassService');

//Library
const moment = require('moment');
var fs = require('fs');

module.exports = {
 
  add: async (req, res) => {
    // sails.log.info("================================ MenuController.add => START ================================");
    
    const params = req.allParams();
    let foods = [];
    let meal = params.meal;
    if (meal.length > 0) {
      for (let i = 0; i < meal.length; i++){
        let tmp = {};
        let foodList = await FoodService.get(meal[i]);
        tmp.title = foodList.title;
        tmp.description = foodList.description;
        tmp.id = foodList.id;
        foods.push(tmp);
      }
    }
   
    let time = params.time;
    let date = params.date;
    let status = params.status;
    let slotFeedings = {
      time: time,
      foods: foods
    }
    const tmpData = {
      slotFeedings: slotFeedings,
      dateUse: date,
      status: status
    };

    const newMenu = await MenuService.add(tmpData);
    
    return res.ok(newMenu);
  },
  importExcel: async (req, res) => {
    sails.log.info("================================ StudentController.Import => START ================================");
    // GET ALL PARAMS
    const excelToJson = require('convert-excel-to-json');
    const originFolder = require('path').resolve(sails.config.appPath, 'assets/images/zadmin/uploads/medias/import/');
    
    req.file('file').upload({
      dirname: originFolder
    },async (err, file) => {
      if (err) {
        return res.badRequest(err);
      } else {
        console.log(file[0].fd);
        
        var dir = require('node-dir');
        //var files = dir.files(originFolder, { sync: true });
        const data = fs.readdirSync(originFolder, { encoding: 'utf-8' })
          //
        console.log(originFolder);
        const result = excelToJson({
          sourceFile: originFolder + '/' +data[0]
        });
        var obj = Object.values(result);

        
        for (let i = 2; i < obj.length; i++){
          let slotFeeding = [];
          let tab = obj[i];
          if (tab.length > 0) {
            let dateUse = tab[0].B;
            let checkDate = moment(dateUse).weekday();
            if (checkDate < 6) {
              let sdkSchool = tab[1].B;
              let schoolObj = await SchoolService.get({ sdkSchool: sdkSchool });
              let school = schoolObj.id;
              let sdkClass = tab[2].B;
              let classObj = await ClassService.get({ sdkClass: sdkClass });
              let classes = classObj.id;
              let tmp = {};
              let foodArr = [];
              let monday = [];
              let tuesday = [];
              let wednessday = [];
              let thursday = [];
              let friday = [];
              let dayCheck = 0;
              let nextDay = 0;
              for (let y = 4; y < tab.length; y++){
                if ((y+1) == tab.length) {
                  
                }
                
                if (tab[y].A != '' && tab[y].A != undefined) {
                    nextDay = checkDate + dayCheck;
                    if (nextDay == 1) {

                      tmp = {};
                      tmp.time = tab[y].A ? tab[y].A : '';
                      foodArr = [];
                      let date = {};
                      //monday = [];
                      // tuesday = [];
                      // wednessday = [];
                      // thursday = [];
                      // friday = [];
    
                      let mondayFood = tab[y].B ? tab[y].B : '';
                      if (mondayFood != '') {
                        let mondayObj = await FoodService.get({ foodCode: mondayFood });
                        //monday.push(mondayObj.id)
                        date.id = mondayObj.id
                      }
                      // let tuesdayFood = tab[y].C ? tab[y].C : '';
                      // if (tuesdayFood != '') {
                      //   let tuesdayObj = await FoodService.get({ foodCode: tuesdayFood });
                      //   tuesday.push(tuesdayObj.id)
                      //   date.tuesday = tuesday
                      // }
                      // let wednessdayFood = tab[y].D ? tab[y].D : '';
                      // if (wednessdayFood != '') {
                      //   let wednessdayObj = await FoodService.get({ foodCode: wednessdayFood });
                      //   wednessday.push(wednessdayObj.id)
                      //   date.wednessday = wednessday
                      // }
                      // let thursdayFood = tab[y].E ? tab[y].E : '';
                      // if (thursdayFood != '') {
                      //   let thursdayObj = await FoodService.get({ foodCode: thursdayFood });
                      //   thursday.push(thursdayObj.id)
                      //   date.thursday = thursday
                      // }
                      // let fridayFood = tab[y].F ? tab[y].F : '';
                      // if (fridayFood != '') {
                      //   let fridayObj = await FoodService.get({ foodCode: fridayFood });
                      //   friday.push(fridayObj.id)
                      //   date.friday = friday
                      // }
                      foodArr.push(date);
                      tmp.foods = foodArr;
                      slotFeeding.push(tmp);
                    } 
                  } else {
                  let date = {};
                    if (nextDay == 1) {
                      let mondayFood = tab[y].B ? tab[y].B : '';
                      if (mondayFood != '') {
                        let mondayObj = await FoodService.get({ foodCode: mondayFood });
                        //monday.push(mondayObj.id)
                        date.id = mondayObj.id;
                      }
                    }
                    
                    // let tuesdayFood = tab[y].C ? tab[y].C : '';
                    // if (tuesdayFood != '') {
                    //   let tuesdayObj = await FoodService.get({ foodCode: tuesdayFood });
                    //   tuesday.push(tuesdayObj.id)
                    //   date.tuesday = tuesday
                    // }
                    // let wednessdayFood = tab[y].D ?  tab[y].D : '';
                    // if (wednessdayFood != '') {
                    //   let wednessdayObj = await FoodService.get({ foodCode: wednessdayFood });
                    //   wednessday.push(wednessdayObj.id)
                    //   date.wednessday = wednessday
                    // }
                    // let thursdayFood = tab[y].E ? tab[y].E : '';
                    // if (thursdayFood != '') {
                    //   let thursdayObj = await FoodService.get({ foodCode: thursdayFood });
                    //   thursday.push(thursdayObj.id)
                    //   date.thursday = thursday
                    // }
                    // let fridayFood = tab[y].F ? tab[y].F : '';
                    // if (fridayFood != '') {
                    //   let fridayObj = await FoodService.get({ foodCode: fridayFood });
                    //   friday.push(fridayObj.id)
                    //   date.friday = friday
                    // }
                    foodArr.push(date);
                    tmp.foods = foodArr;
                    //slotFeeding.push(tmp);
                  }

              }
              let tmpData = {
                dateUse: dateUse,
                slotFeedings: slotFeeding,
                school: school,
                classes: classes,
                status: 1
              }
              const newMenu = await MenuService.add(tmpData);
              if (school) {
                await Menu.addToCollection(newMenu.id, 'school', school).exec(function (err) { });
              }
            }
            
          }
        }

        fs.unlinkSync(originFolder + '/' + data);
        return res.ok({
          status: 200,
          //data: newMenu
        })
      }
    });
  },
  get: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK ID PARAM
    if (!params.id) {
      return res.badRequest(MenuError.ERR_ID_REQUIRED);
    }

    // QUERY & CHECK DATA POST
    const menu = await MenuService.get({
      id: params.id
    });
    if (!menu) {
      return res.notFound(MenuError.ERR_NOT_FOUND);
    }

    // RETURN DATA POST
    return res.json({
      data: menu
    });
  },

  edit: async (req, res) => {
    sails.log.info("================================ MenuController.edit => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();
    if (!params.time) {
      return res.badRequest(MenuError.ERR_TITLE_REQUIRED);
    } else if (!params.title || !params.title.trim().length) {
      return res.badRequest(MenuError.ERR_TIME_REQUIRED);
    }
    let meal = params.meal;
    // PREPARE DATA MENU
    const newData = {
      time: params.time, // REQUIRED
      title: params.title, // REQUIRED
      meal: meal,
      date : params.date,
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      createdBy: req.session.userId
    };

    // CHECK DATA MENU
    const menu = MenuService.get({
      id: params.id
    });
    if (!menu) {
      return res.notFound(MenuError.ERR_NOT_FOUND);
    }
    // UPDATE DATA MENU
    const editObj = await MenuService.edit({
      id: params.id
    }, newData);
    if (meal) {
      await Menu.replaceCollection(editObj[0].id, 'meal', meal).exec(function (err) { });
    }
    // RETURN DATA Menu
    return res.json({
      data: editObj[0]
    });
  },

  trash: async (req, res) => {
    sails.log.info("================================ MenuController.trash => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();
    // CHECK IDS PARAM
    if (!params.ids || !params.ids.length) {
      return res.badRequest(MenuError.ERR_ID_REQUIRED);
    }
    // CHECK Menu & UPDATE
    const menus = await MenuService.find({
      id: params.ids
    });
    if (typeof params.ids === 'string') {
      if (!menus.length) {
        return res.badRequest(MenuError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    } else {
      if (menus.length !== params.ids.length) {
        return res.badRequest(MenuError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    }
    await Menu.update({
      id: params.ids
    }).set({
      status: 3
    });
    // RETURN DATA
    return res.json();
  },

  search: async (req, res) => {
    sails.log.info("================================ MenuController.search => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();

   // PREAPARE BODY PARAMS
   const bodyParams = {
    filter: (params.filter && params.filter.trim().length) ? JSON.parse(params.filter) : null,
    limit: (params.limit !== 'null') ? params.limit : 10,
    offset: params.offset ? Number(params.offset) : null,
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
        title: {
          contains: bodyParams.filter.keyWord
        }
      }, {
        meal: {
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
    // QUERY DATA menu
    const menus = await MenuService.find(where, bodyParams.limit, bodyParams.offset, bodyParams.sort),
      total = await MenuService.count({
        status: {
          '>=': sails.config.custom.STATUS.ALL
        }
      }),
      trash = await MenuService.count({ status: sails.config.custom.STATUS.TRASH }),
      publish = await MenuService.count({ status: sails.config.custom.STATUS.PUBLISH });

    // RETURN DATA Menu
    return res.json({
      recordsTotal: total,
      recordsTrash: trash,
      recordsPublish: publish,
      data: menus
    });
  }
};
