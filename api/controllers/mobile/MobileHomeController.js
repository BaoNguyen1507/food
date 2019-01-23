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
        // let token = await AuthService.find(params.token);
        // let checkToken = false;
        
        // if (token.token === params.tokens) {
        //     checkToken = true;
        // }

        // if (checkToken === false) {
        // return res.badRequest(AuthError.ERR_SYSTEM_TOKEN_REQUIRE);
        // }
        // END CHECK TOKEN
        
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
         
        return res.json({
            code: 'SUCCESS_200',
            data: {
                notification: newNoti,
                album: listAlbum
            }
        });
    },
}