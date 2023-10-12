const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['provider', 'ambassador'],
    required: true
  },
  type: {
    type: String,
    default: "SMS"
  },
  timestamp: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  ref_task_id: {
    type: String,
    default: ""
  },
  receipent_state: {
    type: String,
    enum: ['new', 'readed', 'archived', 'deleted'],
    default: 'new'
  }
});

const mailboxSchema = new mongoose.Schema({
  context: {
    service_mobile: {
      type: String,
      required: true
    },    
    provider_code: {
      type: String,
      required: true
    },
    ambassador_id: {
        type: String,
      },    
    ambassador_mobile: {
      type: String,
      required: true
    },
    last_message: {
      type: String,
      required: true
    },    
  },
  conversation: {
    type: [messageSchema],
    default: []
  }
});

const Mailboxes = mongoose.model('mailboxes', mailboxSchema);

module.exports = Mailboxes;
