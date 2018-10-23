/**
 * @copyright 2017 @ ZiniMediaTeam
 * @author brianvo
 * @create 2017/10/23 01:05
 * @update 2017/10/23 01:05
 * @file api/models/User.js
 * @description :: Staff user model.
 */

module.exports = {
  attributes: {
    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      description: 'The email address for this user.',
      example: 'example@zinimedia.com'
    },

    phone: {
      type: 'string',
      maxLength: 11,
      required: true,
      unique: true,
    },

    password: {
      type: 'string',
      description: 'Securely hashed representation of the user\'s login password.',
      protect: true,
      example: '2$28a8eabna301089103-13948134nad'
    }, 

    fullName: {
      type: 'string',
      required: true,
      description: 'The fist of the student\'s name',
      example: 'Vo Thien Thanh',
      maxLength: 255,
    },
    professional: {
      type: 'string',
      description: 'master of bachelor etc...',
    },
    birthday: {
      type: 'string',
      example: 'DD/MM/YYYY'
    },
    address: {
      type: 'string',
      description: 'The User address',
      example: 'abc street, ward 5, Ho Chi Minh City'
    },
    isSuperAdmin: {
      type: 'boolean',
      defaultsTo: false,
      description: 'Whether this user is a "super admin" with extra permissions, etc.',
      extendedDescription: `Super admins might have extra permissions, see a different default home page when they log in,
      or even have a completely different feature set from normal users.  In this app, the \`isSuperAdmin\`
      flag is just here as a simple way to represent two different kinds of users.`
    },

    passwordResetToken: {
      type: 'string',
      description: 'A unique token used to verify the user\'s identity when recovering a password.  Expires after 1 use, or after a set amount of time has elapsed.'
    },

    passwordResetTokenExpiresAt: {
      type: 'number',
      description: 'A JS timestamp (epoch ms) representing the moment when this user\'s `passwordResetToken` will expire (or 0 if the user currently has no such token).',
      example: 1502844074211
    },

    emailStatus: {
      type: 'string',
      isIn: ['unconfirmed', 'changeRequested', 'confirmed'],
      defaultsTo: 'confirmed',
      description: 'The confirmation status of the user\'s email address.',
      extendedDescription: `Users might be created as "unconfirmed" (e.g. normal signup) or as "confirmed" (e.g. hard-coded
      admin users).  When the email verification feature is enabled, new users created via the
      signup form have \`emailStatus: 'unconfirmed'\` until they click the link in the confirmation email.
      Similarly, when an existing user changes their email address, they switch to the "changeRequested"
      email status until they click the link in the confirmation email.`
    },

    lastSeenAt: {
      type: 'number',
      description: 'A JS timestamp (epoch ms) representing the moment at which this user most recently interacted with the backend while logged in (or 0 if they have not interacted with the backend at all yet).',
      example: 1502844074211,
      defaultsTo: Date.now()
    },

    status: {                           //Integer {"TRASH":-1,"DRAFT":0,"PUBLISH":1}
      type: 'number',
      isIn: [sails.config.custom.STATUS.TRASH,sails.config.custom.STATUS.DRAFT,sails.config.custom.STATUS.PUBLISH],
      defaultsTo: sails.config.custom.STATUS.DRAFT
    },
    userType: {
      type: 'number',
      isIn: [sails.config.custom.TYPE.STAFF,sails.config.custom.TYPE.TEACHER],
      defaultsTo: sails.config.custom.TYPE.STAFF
    },
    //--- association ---
    avatar: {
      collection: 'media',
      via: 'uploadBy',
      description: 'user photo'
    },

    albums: {
      collection: 'album',
      via: 'owner'
    },

    post: {
      collection: 'post',
      via: 'author'
    },

    taxonomy: {
      collection: 'taxonomy',
      via: 'createdBy'
    },

    comments: {
      collection: 'comment',
      via: 'authorCmt'
    },

    settings: {
      collection: 'setting',
      via: 'uploadBy'
    },

    schools: {
      model: 'school'
    },

    classes: {
      collection: 'class',
      via: 'owner'
    },
    
    student: {
      collection: 'student',
      via: 'owner'
    }
  } 
};
