module.exports = {

    attributes: {

        title: {
            type: 'string',
            required: true
        },
        message: {
            required: true,
            type: 'string',
        },
        status: {
            type: 'number',
            isIn: [sails.config.custom.STATUS.TRASH,sails.config.custom.STATUS.DRAFT,sails.config.custom.STATUS.PUBLISH],
            defaultsTo: sails.config.custom.STATUS.DRAFT
        },
        noteType: {
            type: 'string',
            defaultsTo: sails.config.custom.TYPE.ALL.toString()
        },  
    },
};
