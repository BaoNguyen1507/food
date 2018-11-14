const NotificationService = require('../../services/NotificationService');
const AlbumService = require('../../services/AlbumService');
const MediaService = require('../../services/MediaService');
const ScheduleService = require('../../services/ScheduleService');
const MenuService = require('../../services/MenuService');

const ScheduleError = require('../../../config/errors/schedule');
const NotificationError = require('../../../config/errors/notification');
const AlbumError = require('../../../config/errors/album');
const MenuError = require('../../../config/errors/menu');
const MediaError = require('../../../config/errors/media');
module.exports = {

    search: async (req, res) => {
        let params = req.allParams();

        // CHECK TOKEN
        let tempToken = true;
        let token = await AuthService.find(params.token);
        let checkToken = false;
        
        if (token.token === params.tokens) {
            checkToken = true;
        }

        if (tempToken === false) {
        return res.badRequest(AuthError.ERR_SYSTEM_TOKEN_REQUIRE);
        }
        // END CHECK TOKEN
        
        let date = params.date;
        let size = 10;
        let fromPosition = (params.page - 1) * size;
        // LIST NOTE
        let newNoti = await NotificationService.find({ status: sails.config.custom.STATUS.PUBLISH}, size, fromPosition, null);
        if (!newNoti) {
            newNoti = [];
        }
       
        // LIST ALBUM
        let album = await AlbumService.find({ status: sails.config.custom.STATUS.PUBLISH }, size, fromPosition, null);
        let listAlbum = [];
        if (album && album.length > 0) {
            for (let y = 0; y < album.length; y++){
                let listMediaObj = [];
                let tmp = {};
                let mediaId = album[y].avatar;
                tmp.title = album[y].title;
                if (mediaId && mediaId.length > 0) {
                    for (let i = 0; i < mediaId.length; i++){
                        let mediaObj = await MediaService.get({ id: mediaId[i] });                    
                        listMediaObj.push(mediaObj);
                    }
                }
                tmp.avatar = listMediaObj;
                listAlbum.push(tmp);
            }
        }
        
        // LIST SCHEDULE
        let schedule = await ScheduleService.find({ status: sails.config.custom.STATUS.PUBLISH,date: date }, size, fromPosition, null);
        if (!schedule) {
            schedule = [];
        }

        // LIST MENU
        let menus = await MenuService.find({ status: sails.config.custom.STATUS.PUBLISH,date: date }, size, fromPosition, null);
        let listMenus = [];
        if (menus && menus.length > 0) {
            for (let i = 0; i < menus.length; i++){
                let listMeals = [];
                let tmp = {};
                let titleMeal = {};
                tmp.title = menus[i].title;
                tmp.time = menus[i].time;
                let arrayMeal = menus[i].meal;
                if (arrayMeal.length > 0) {
                    for (let y = 0; y < arrayMeal.length; y++){
                        let tmpThumb = {};
                        let titleMeal = arrayMeal[y].title
                        let thum = await MediaService.get({ id: arrayMeal[y].thumbnail });
                        if (thum.length === 0) {
                            return res.badRequest(ScheduleError.ERR_NOT_FOUND);
                        } else {
                            tmpThumb.title_meal = titleMeal;
                            tmpThumb.path = thum.path;
                            listMeals.push(tmpThumb);
                        }
                    }
                }
                tmp.meal = listMeals;
                listMenus.push(tmp);
            }
        } 
        return res.json({
            code: 'SUCCESS_200',
            data: {
                notification: newNoti,
                album: listAlbum,
                schedule: schedule,
                menus: listMenus
            }
        });
    },
}