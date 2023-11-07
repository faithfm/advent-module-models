const mongoose = require('mongoose');
const {generalLogSchema, requestQuery, requestHistorySchema} = require('common');

const preAuthorizationSchema = new mongoose.Schema({
    
    provider_code: {
      type: String
    },

    provider_contact_id: {
      type: String
    },

    date_requested: {
      type: Date
    },

    instructions: {
      type: String
    },

    contact_first_name: {
      type: String
    },

    contact_last_name: {
      type: String
    },

    contact_address: {
      type: String
    },
    
    contact_suburb: {
      type: String
    },

    contact_state: {
      type: String
    },

    contact_postcode: {
      type: String
    },

    contact_country: {
      type: String
    },

    date_authorised: {
      type: Date
    },
    
    ambassador_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ambassadors'
    },

    query: requestQuery,    

    request_history: [requestHistorySchema],

    log: [generalLogSchema]

});

preAuthorizationSchema.virtual('date_expired').get(function() {
  if (this.date_authorised) {
      const expiryDate = new Date(this.date_authorised);
      expiryDate.setMonth(expiryDate.getMonth() + 6);
      return expiryDate;
  }
  return null; // or undefined, depending on your needs
});

preAuthorizationSchema.set('toJSON', { virtuals: true });

const preAuthorizations = mongoose.model('preauthorizations', preAuthorizationSchema);

module.exports = preAuthorizations;