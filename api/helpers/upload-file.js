module.exports = {
  
  friendlyName: 'Upload file to folder',
  description: 'Upload file to folder',

  inputs: {
    req: {
      type: 'ref'
    },
    file: {
      type: 'string'
    },
    dest: {
      type: 'string'
    },
    fileName: {
      type: 'string'
    }
  },

  exits: {
    success: {},
    cannotupload: {
      description: 'Could not upload file.'
    }
  },
  
  fn: async function (inputs, exits) {
    
    let fileEl = inputs.file;

    await inputs.req.file(fileEl).upload({
      // option
      // maxBytes: 10000000,
      dirname: inputs.dest,
      // saveAs: inputs.fileName,
      // option
    }, async function whenDone(err, files) {
      if (err) throw 'cannotupload';
      
      return exits.success(files);
    });

  }

};