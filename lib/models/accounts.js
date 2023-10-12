const mongoose = require('mongoose');

const accountRoleSchema = new mongoose.Schema({
  //ambassador|provider|admin
  role: {
    type: String,
  },
});

const accountSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
  },
  account_created: {
    type: Date,
    default: new Date().toISOString(),
  },
  otp: {
    type: String,
  },
  issued: {
    type: Date,
  },
  validated: {
    type: Date,
  },  
  expires: {
    type: Date,
  },
  roles: [accountRoleSchema]
});

const Accounts = mongoose.model('accounts', accountSchema);

module.exports = Accounts;
