/**
 * MediaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const MediaError = require('../../../config/errors/media');
const MediaService = require('../../services/MediaService');
const Sharp = require('sharp/lib');
module.exports = {
  add: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK TITLE & PATH PARAMS
    if (!params.title || !params.title.trim().length) {
      return res.badRequest(MediaError.ERR_TITLEMEDIA_REQUIRED);
    } else if (!params.path || !params.path.trim().length) {
      return res.badRequest(MediaError.ERR_PATH_REQUIRED);
    }
    let school = params.school;
    // PREPARE DATA MEDIA
    const newData = {
      title: params.title, // REQUIRED
      path: params.path, // REQUIRED
      caption: (params.caption && params.caption.trim().length) ? params.caption : '',
      school: school,
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT,
    };

    // ADD NEW DATA MEDIA
    const newMedia = await MediaService.add(newData);
    if (school) {
      await Media.addToCollection(newMedia.id,'school',school)
    }
    // RETURN DATA MEDIA
    return res.json({
      data: newMedia
    });
  },

  get: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK ID PARAM
    if (!params.id) {
      return res.badRequest(MediaError.ERR_ID_REQUIRED);
    }

    // QUERY & CHECK DATA MEDIA
    const media = await MediaService.get({
      id: params.id
    });
    if (!media) {
      return res.notFound(MediaError.ERR_NOT_FOUND);
    }

    // RETURN DATA MEDIA
    return res.json({
      data: media
    });
  },

  edit: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK TITLE & PATH PARAMS
    if (!params.title || !params.title.trim().length) {
      return res.badRequest(MediaError.ERR_TITLE_REQUIRED);
    } else if (!params.path || !params.path.trim().length) {
      return res.badRequest(MediaError.ERR_PATH_REQUIRED);
    }
    let school = params.school;
    // PREPARE DATA MEDIA
    const newData = {
      title: params.title, // REQUIRED
      path: params.path, // REQUIRED
      caption: (params.caption && params.caption.trim().length) ? params.caption : '',
      school: school,
      status: params.status ? params.status : sails.config.custom.STATUS.DRAFT
    };
    // CHECK DATA MEDIA
    const media = MediaService.get({
      id: params.id
    });
    if (!media) {
      return res.notFound(MediaError.ERR_NOT_FOUND);
    }

    // UPDATE DATA MEDIA
    const editObj = await MediaService.edit({
      id: params.id
    }, newData);

    if (school) {
      await Media.replaceCollection(editObj[0].id, 'school', school).exec(function (err) { });
    }
    // RETURN DATA MEDIA
    return res.json({
      data: editObj[0]
    });
  },

  trash: async (req, res) => {
    // GET ALL PARAMS
    const params = req.allParams();

    // CHECK IDS PARAM
    if (!params.ids || !params.ids.length) {
      return res.badRequest(MediaError.ERR_ID_REQUIRED);
    }

    // CHECK MEDIA & UPDATE
    const medias = await MediaService.find({
      id: params.ids
    });
    if (typeof params.ids === 'string') {
      if (!medias.length) {
        return res.badRequest(MediaError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    } else {
      if (medias.length !== params.ids.length) {
        return res.badRequest(MediaError.ERR_NOT_FOUND);
      } else {
        // nothing to do
      }
    }

    await Media.update({
      id: params.ids
    }).set({
      status: sails.config.custom.STATUS.TRASH
    });

    // RETURN DATA
    return res.json();
  },

  search: async (req, res) => {
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
        title: {
          contains: bodyParams.filter.keyWord
        }
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

    // QUERY DATA MEDIA
    const medias = await MediaService.find(where, bodyParams.limit, bodyParams.offset, bodyParams.sort),
      total = await MediaService.count({
        status: {
          '>=': sails.config.custom.STATUS.ALL
        }
      }),
      trash = await MediaService.count({ status: sails.config.custom.STATUS.TRASH }),
      publish = await MediaService.count({ status: sails.config.custom.STATUS.PUBLISH });

    // RETURN DATA MEDIAS
    return res.json({
      recordsTotal: total,
      recordsTrash: trash,
      recordsPublish: publish,
      data: medias
    });
  },

  upload: async (req, res) => {
    let _cust = sails.config.custom; 
    if (req.method === 'GET') {
      return res.json({ 'status': 'GET not allowed' });
    }
    const originFolder = require('path').resolve(sails.config.appPath, 'assets/images/zadmin/uploads/medias/origin/');
    sails.log('link image', originFolder);
    let timeStamp = _.now();
    let thumbSquare = timeStamp + '_'+ _cust.UPLOAD.THUMB.SQUARE.name;
    console.log('check time and user', thumbSquare);
 
    req.file('file').upload({
      dirname: originFolder,
      // maxBytes: 100000
    }, (err, file) => {
      if (err) {
        return res.badRequest(err);
      } else {
        let name = '';
        _.each(file, function (img) {
          
          name = img.filename;

          Sharp(img.fd).resize({ width: 400, height: 300 }).crop(Sharp.gravity.northwest).toFile(require('path')
            .resolve(sails.config.appPath, 'assets/images/zadmin/uploads/medias/square/' + name.replace(/\s/g, '')))
             .then((info) => {}).catch( (err) => { sails.log(err); }); 
        })
        const _dataFile = process.platform === 'win32' ? file[0].fd.split('\\').pop() : file[0].fd.split('/').pop();
        return res.json({
          status: 200,
          fd: '/assets/images/zadmin/uploads/medias/square/' + name.replace(/\s/g, '')
        });
      }
    });
  }
};
