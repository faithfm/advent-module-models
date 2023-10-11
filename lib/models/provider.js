const mongoose = require('mongoose');

const providerMemberSchema = new mongoose.Schema({
  mobile: {
    type: String
  },
  role: {
    type: String
  },  
});

const providerSchema = new mongoose.Schema({
  code: {
    type: String
  },
  name: {
    type: String
  },
  branding_logo_url: {
    type: String,
  }, 
  api_private_key: {
    type: String,
  }, 
  webbook_url: {
    type: String,
  },
  twilio_sid: {
    type: String
  },
  twilio_token: {
    type: String
  },
  twilio_service_number: {
    type: String
  },  
  service_email: {
    type: String
  },      
  service_email_pwd: {
    type: String
  },      
  service_email_smtp: {
    type: String
  },      
  service_email_port: {
    type: String
  },      
  members: [providerMemberSchema]
});

const Providers = mongoose.model('providers', providerSchema);

module.exports = Providers;
