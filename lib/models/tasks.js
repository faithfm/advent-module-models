const mongoose = require('mongoose');
const querystring = require('querystring');
const {generalLogSchema, requestQuery, requestHistorySchema} = require('./common');

function getInterestLabel(spiritual_interest_index) {
  if (spiritual_interest_index  == 0) {
      return "Unknown Interest";
  } else if (spiritual_interest_index >= 1 && spiritual_interest_index <= 2) {      
    return "Very Low Interest";
  } else if (spiritual_interest_index >= 3 && spiritual_interest_index <= 4) {
      return "Low Interest";
  } else if (spiritual_interest_index >= 5 && spiritual_interest_index <= 6) {
      return "Moderate Interest";
  } else if (spiritual_interest_index >= 7 && spiritual_interest_index <= 8) {
      return "High Interest";
  } else if (spiritual_interest_index >= 9 && spiritual_interest_index <= 10) {
      return "Extremely Interested";
  } else {
      return "Invalid";
  }
}

const taskAttachmentSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  sku: {
    type: String,
  },
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  author: {
    type: String,
  },
  price: {
    type: String,
  },
  comment: {
    type: String,
  },
});

const taskCompletionFeedbackSchema = new mongoose.Schema({

    //inperson,mailbox,giveup,call,sms,social,email,
    feedback_method: {
      type: String
    },

    feedback_note: {
      type: String
    },

    feedback_score: {
      type: Number
    }, 

    feedback_age: {
      type: Number
    },   

    was_known_sda: {
      type: Number
    }, 

    is_adventist: {
      type: String,
      enum: ['unknown', 'yes', 'no'],
      default: 'unknown'      
    },


    feedback_0: {
      type: Number
    },
    feedback_1: {
      type: Number
    },
    feedback_2: {
      type: Number
    },
    feedback_3: {
      type: Number
    },
    feedback_4: {
      type: Number
    },
    feedback_5: {
      type: Number
    },
    feedback_6: {
      type: Number
    },
    feedback_7: {
      type: Number
    },
    feedback_8: {
      type: Number
    },
    feedback_9: {
      type: Number
    }

});

const taskSchema = new mongoose.Schema({

   //delivery|call|sms|email|social|bible|pastoral
    type: {
      type: String
    },
    
    //DELIVERY STATUS - PROCESS
    //requested->(action)->assigned->processed->sent->(ready)->completed

    //CALL/EMAIL/SMS/SOCIAL STATUS - PROCESS
    //requested->(action)->assigned->ready->completed

    //BIBLE/PASTORAL STATUS - PROCESS
    //requested->(action)->assigned->ready->completed

    status: {
      type: String,
      enum: ['new', 'action', 'requested', 'assigned', 'processed', 'sent', 'ready', 'completed'],
      default: 'new'      
    },

    date_updated: {
      type: Date
    },

    date_requested: {
      type: Date
    },
    
    date_assigned: {
      type: Date
    },
    
    date_completed: {
      type: Date
    },
    
    fulfilment_agency: {
      type: String
    },

    provider_code: {
      type: String
    },

    provider_brand_name: {
      type: String
    },


    provider_task_id: {
      type: String
    },

    provider_contact_id: {
      type: String
    },

    provider_contact_score: {
      type: Number
    },

    provider_contact_background: {
      type: String
    },

    contact_first_name: {
      type: String
    },

    contact_last_name: {
      type: String
    },

    contact_phone: {
      type: String
    },

    contact_email: {
      type: String
    },  

    contact_social: {
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

    contact_street_lat: {
      type: Number,
    },

    contact_street_lng: {
      type: Number,
    },   
    conference: {
      type: String,
    },
    query_lat: {
      type: Number,
    },

    query_lng: {
      type: Number,
    }, 
    query_radius: {
      type: Number,
    }, 
    query_primary_skill: {
      type: String
    },
    query_secondary_skill: {
      type: String
    },
    query_gender: {
      type: String
    },
    query_pastor: {
      type: String
    },
    query_preferred_ambassador_id: {
      type: String
    },
    query_auto_assign_ambassador_id: {
      type: String
    },

    ambassador_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ambassadors'
    },    
    
    completion_feedback: taskCompletionFeedbackSchema,
    
    instructions: {
      type: String
    },
    
    attachments: [taskAttachmentSchema],
    
    log: [generalLogSchema],

    request_history: [requestHistorySchema]

});

taskSchema.virtual('ambassador_profile', {
  ref: 'ambassadors', 
  localField: 'ambassador_id',
  foreignField: '_id',
  justOne: true 
});

taskSchema.virtual('provider_contact_score_label').get(function() {
  return getInterestLabel(this.provider_contact_score);
});

taskCompletionFeedbackSchema.virtual('feedback_score_label').get(function() {
  return getInterestLabel(this.feedback_score);
});



taskSchema.virtual('url_status_processed').get(function() {
  return process.env.WEB_APP_URL + '/status.html?task_id=' + this._id + '&status=processed';
});
taskSchema.virtual('url_status_processed_qr').get(function() {
  return 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=' + querystring.escape(this.url_status_processed);
});

taskSchema.virtual('url_status_sent').get(function() {
  return process.env.WEB_APP_URL + '/status.html?task_id=' + this._id + '&status=sent';
});
taskSchema.virtual('url_status_sent_qr').get(function() {
  return 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=' + querystring.escape(this.url_status_sent);
});

taskSchema.virtual('url_status_complete').get(function() {
  return process.env.WEB_APP_URL + '/tasks.html?task_id=' + this._id + '&action=complete';
});
taskSchema.virtual('url_status_complete_qr').get(function() {
  return 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=' + querystring.escape(this.url_status_complete);
});

taskSchema.set('toJSON', { virtuals: true });
taskSchema.set('toObject', { virtuals: true });

const Tasks = mongoose.model('tasks', taskSchema);

module.exports = Tasks;