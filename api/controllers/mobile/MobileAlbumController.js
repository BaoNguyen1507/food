/**
 * AlbumController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const AlbumError = require('../../../config/errors/album');
const AlbumService = require('../../services/AlbumService');
const MediaService = require('../../services/MediaService');

module.exports = {
  
  add: async (req, res) => {
    sails.log.info("================================ AlbumController.add => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK TITTLE PARAMS
    if (!params.title) {
      return res.badRequest(AlbumError.ERR_TITLEALBUM_REQUIRED);
    } else if (!params.photos || !params.photos.length) {
      return res.badRequest(AlbumError.ERR_PHOTO_REQUIRED);
    } else if (!params.owner) {
      return res.badRequest(AlbumError.ERR_OWNER_REQUIRED);
    } else if (!params.class) {
      return res.badRequest(AlbumError.ERR_CLASS_REQUIRED);
    }

    // PREPARE DATA ALBUM
    const newData = {
      title: params.title, //REQUIRED
      description: (params.description && params.description.trim().length) ? params.description : '',
      photos: params.photos,
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
      owner: params.owner,
      atClass: params.class
    };

    // ADD NEW DATA ALBUM
    const newAlbum = await AlbumService.add(newData);

    // RETURN DATA ALBUM
    return res.json({
      status: 200,
      data: newAlbum
    });
  },

  get: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK ID PARAM
    if (!params.id) {
      return res.badRequest(AlbumError.ERR_ID_REQUIRED);
    }

    // QUERY & CHECK DATA ALBUM
    const album = await AlbumService.get({
      id: params.id
    });
    if (!album) {
      return res.notFound(AlbumError.ERR_NOT_FOUND);
    }
    
    const listMedias = await MediaService.find({ id: album.photos });
    album.photos = listMedias;

    // RETURN DATA ALBUM
    return res.json({
      data: album
    });
  },

  edit: async (req, res) => {
    sails.log.info("================================ AlbumController.edit => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK TITTLE PARAMS
    if (!params.title) {
      return res.badRequest(AlbumError.ERR_TITLEALBUM_REQUIRED);
    } else if (!params.id) {
      return res.badRequest(AlbumError.ERR_ID_REQUIRED);
    }

    // CHECK DATA ALBUM
    const album = AlbumService.get({
      id: params.id
    });
    if (!album) {
      return res.notFound(AlbumError.ERR_NOT_FOUND);
    }
    
    // PREPARE DATA ALBUM
    let newData = {};
    for(key in params){
      if(key !== 'id'){
        newData[key] = params[key];
      }
    }

    // UPDATE DATA ALBUM
    await AlbumService.edit({
      id: params.id
    }, newData);

    const found = await AlbumService.get({
      id: params.id
    });

    // RETURN DATA ALBUM
    return res.json({
      data: found
    });
  },

  list: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // QUERY DATA NOTIFICATION
    const albums = await AlbumService.find({
      status: sails.config.custom.STATUS.PUBLISH
    }, params.limit, (params.page-1) * params.limit, params.sort)
      
    if(albums.length > 0){
      for(let i=0; i<albums.length; i++){
        let medias = await MediaService.find({id: albums[i].photos?albums[i].photos:[]}, 1000, null, null);
        if(medias && medias.length > 0){
          albums[i].photos = medias;
        }
      }
    }

    // RETURN DATA NOTIFICATION
    return res.json({
      data: albums
    });
  },
  
  trash: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK IDS PARAM
    if (!params.ids || !params.ids.length) {
      return res.badRequest(AlbumError.ERR_ID_REQUIRED);
    }

    // CHECK ALBUM & UPDATE
    const albums = await AlbumService.find({
      id: params.ids
    });
    if (typeof params.ids === 'string') {
      if (!albums.length) {
        return res.badRequest(AlbumError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    } else {
      if (albums.length !== params.ids.length) {
        return res.badRequest(AlbumError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    }

    await Album.update({
      id: params.ids
    }).set({
      status: sails.config.custom.STATUS.TRASH
    });

    // RETURN DATA
    return res.json();
  },

  search: async (req, res) => {
    sails.log.info("================================ AlbumController.search => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();

    // PREAPARE BODY PARAMS
    const bodyParams = {
      filter: (params.filter && params.filter.trim().length) ? JSON.parse(params.filter) : null,
      limit: params.limit ? Number(params.limit) : null,
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
    
    // QUERY DATA PARENT
    const albums = await AlbumService.find(where, bodyParams.limit, bodyParams.offset, bodyParams.sort),
      total = await AlbumService.count({
        status: {
          '>=': sails.config.custom.STATUS.ALL
        }
      }),
      trash = await AlbumService.count({ status: sails.config.custom.STATUS.TRASH }),
      publish = await AlbumService.count({ status: sails.config.custom.STATUS.PUBLISH });

    // RETURN DATA PARENTS
    return res.json({
      recordsTotal: total,
      recordsTrash: trash,
      recordsPublish: publish,
      data: albums
    });
  }
};
