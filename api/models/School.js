/**
 * @copyright 2017 @ ZiniMediaTeam
 * @author brianvo
 * @create 2017/10/23 01:05
 * @update 2017/10/23 01:05
 * @file api/models/Scholl.js
 * @description :: Scholl model.
 */

module.exports = {

  attributes: {
    schoolName: {
      type: 'string',
      required: true,
      description: 'Name of the School that user enroled in',
      example: 'University of Natural Science'
    },
    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      description: 'Email address to login',
      example: 'abc@gmail.com'
    },
    phone: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 11,
      description: 'The phone number to login or used for contact by School',
      example: '0123456789'
    },
    password: {
      type: 'string',
      required: true,
      protect: true,
      description: 'Password for login'
    },
    address: {
      type: 'string',
      description: 'The User address',
      example: 'abc street, ward 5, Ho Chi Minh City'
    },
    description: {
      type: 'string',
      description: 'what the user expectation from School',
      example: 'I wanna become a Software development'
    },
    status: {                           //Integer {"TRASH":-1,"DRAFT":0,"PUBLISH":1}
      type: 'number',
      isIn: [sails.config.custom.STATUS.TRASH, sails.config.custom.STATUS.DRAFT, sails.config.custom.STATUS.PUBLISH],
      defaultsTo: sails.config.custom.STATUS.DRAFT
    },
    trialTime: {
      type: 'string',
      columnType: 'date',
      defaultsTo: '30'
    },
    owner: {
      collection: 'user',
      via: 'schools',
      description: 'The user who studyied at this school.'
    },
    media: {
      model: 'media'
    },
    sdkSchool: {
      type: 'string',
      description: 'The code of school'
    },
    numberOfVAT: {
      type: 'string',
      description: 'The number of VAT'
    },
    website: {
      type: 'string',
      description: 'The website of school'
    },
    published: {
      type: 'string',
      description: 'The date publish school'
    },
    foods:{
      collection: 'food',
      via:'school'
    }
  }
};

