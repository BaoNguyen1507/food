/**
 * @copyright 2017 @ ZiniMediaTeam
 * @author brianvo
 * @create 2017/10/23 01:05
 * @update 2017/10/23 01:05
 * @file api/models/Parent.js
 * @description :: Parent model.
 */

module.exports = {
  attributes: {
    fullName:{
      type: 'string',
      required: true,
      description: 'Full representation of the user\'s name',
      example: 'Brian Vo',
      maxLength: 120
    },
    emailAddress:{
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: 'brian.vo@zinimedia.com'
    },
    phone:{
      type: 'string',
      required: true,
      unique: true,
      maxLength: 11
    },
    password:{
      type: 'string',
      required: true,
      description: 'Securely hashed representation of the user\'s login password.',
      protect: true,
      example: '2$28a8eabna301089103-13948134nad'
    },
    birthday: {
      type: 'string',
    },
    profession:{
      type: 'string',
      maxLength: 200,
      example: ''
    },
    currentAddress:{
      type: 'string',
      description: '',
      example: ''
    },
    permanentAddress:{
      type: 'string',
      description: '',
      example: ''
    },
    religion:{
      type: 'string',
      description: '',
      example: ''
    },
    note:{
      type: 'string',
      description: 'note what they want',
      example: 'need to upgrade quality of meal'
    },
    //LOAD RELATION ORM ** | n-n
    students: {
      collection:'student',
      via: 'parents'
    },
    
    type: {
      type: 'number',
      isIn: [sails.config.custom.TYPE.MOTHER, sails.config.custom.TYPE.FATHER, sails.config.custom.TYPE.CUSTODIAN],
      defaultsTo: sails.config.custom.TYPE.MOTHER
    },
    status: {                           //Integer {"TRASH":-1,"DRAFT":0,"PUBLISH":1}
      type: 'number',
      isIn: [sails.config.custom.STATUS.TRASH, sails.config.custom.STATUS.DRAFT, sails.config.custom.STATUS.PUBLISH],
      defaultsTo: sails.config.custom.STATUS.DRAFT
    },
    message: {
      collection: 'message',
      via: 'parentID'
    }
  }
};

