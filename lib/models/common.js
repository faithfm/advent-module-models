const mongoose = require('mongoose');

const generalLogSchema = new mongoose.Schema({
    date: {
      type: Date,
    },
    type: {
      type: String,
    },
    status: {
      type: String,
    },
    comment: {
      type: String
    }
});

const requestHistorySchema = new mongoose.Schema({

    ambassador_id: {
      type: mongoose.Schema.Types.ObjectId,
        ref: 'ambassadors'
    },
  
    ambassador_fullname: {
      type: String
    },
  
    ambassador_mobile: {
      type: String
    },
  
    date_sent: {
      type: Date
    },
  
    date_viewed: {
      type: Date
    },
  
    date_accepted: {
      type: Date
    },
  
});

const requestQuery = new mongoose.Schema({

    lat: {
       type: Number,
     },
   
     lng: {
       type: Number,
     }, 
     
     radius: {
       type: Number,
     }, 
     
     primary_skill: {
       type: String
     },
     
     secondary_skill: {
       type: String
     },
     
     gender: {
       type: String
     },
     
     pastor: {
       type: String
     },
     
     preferred_ambassador_id: {
       type: String
     }
   
});

module.exports = {
    generalLogSchema,
    requestQuery, 
    requestHistorySchema   
};
