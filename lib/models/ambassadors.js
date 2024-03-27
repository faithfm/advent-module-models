const mongoose = require('mongoose');

const ambassadorServiceAreaSchema = new mongoose.Schema({
    area_id: {
        type: String
    },    
});

const ambassadorSkillsSchema = new mongoose.Schema({
    skill_id: {
        type: String
    },    
});

const ambassadorActivitySchema = new mongoose.Schema({
    last_check_in: {
        type: Date,
    },
    last_task_date: {
        type: Date
    },
    //this is the total number of times this ambassador as been offered a task
    tasks_requested: {
        type: Number,
        default: 0, 
    },   
    //this is the total number of times this ambassador has viewed a requested offer
    tasks_requested_viewed: {
        type: Number,
        default: 0, 
    },     
    //this is the total number of times this ambassador has accepted a task
    tasks_requested_accepted: {
        type: Number,
        default: 0, 
    },
    migration_sms_sent: {
        type: Boolean,
        default: false
    }
});

// Define a virtual field 'last_task_date_ago'
ambassadorActivitySchema.virtual('last_task_date_ago').get(function() {
    if (this.last_task_date) {
        const diff = Date.now() - this.last_task_date.getTime();
        const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return diffDays;
    }
    return null;
});

// Define a virtual field 'in_last_6_months'
ambassadorActivitySchema.virtual('in_last_6_months').get(function() {
    const now = Date.now();
    const sixMonthsAgo = new Date(now - 182.5 * 24 * 60 * 60 * 1000); // approximately 6 months in milliseconds
    return (this.last_check_in && this.last_check_in >= sixMonthsAgo) ||
           (this.last_task_date && this.last_task_date >= sixMonthsAgo);
});


const ambassadorSchema = new mongoose.Schema({
    acms_id: {
        type: String,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
    gender: {
        type: String,
    },
    languages: {
        type: String,
    },
    preferred_communication_method: {
        type: String,
    },
    provider_id :{
        type: String,
    },
    score: {
        type: Number,
        default: 0, 
    },  
    activity: ambassadorActivitySchema,

    skills: [ambassadorSkillsSchema],

    address_street: {
        type: String,
    },
    address_suburb: {
        type: String,
    },
    address_state: {
        type: String,
    },
    address_postcode: {
        type: String,
    },
    address_country: {
        type: String,
    },
    address_street_lat: {
        type: Number,
    },
    address_street_lng: {
        type: Number,
    },    
    conference: {
        type: String,
    },
    enrolment_signup_church: {
        type: String,
    },
    enrolment_signup_pastor: {
        type: String,
    },
    enrolment_training_code: {
        type: String,
    },
    enrolment_training_date: {
        type: Date,
    },
    enrolment_status: {
        type: String,
        enum: ['signup', 'trained', 'verified', 'not-approved', 'vacation', 'resigned'],
        default: 'signup'
    },
    enrolment_pastor: {
        type: Boolean,
    }, 
    enrolment_welcome_sent: {
        type: Boolean,
    }, 
    enrolment_provider_code: {
        type: String,
    },
    service_areas: [ambassadorServiceAreaSchema]
})

ambassadorSchema.virtual('fullname').get(function() {
    return `${this.firstname} ${this.lastname}`;
});

ambassadorSchema.virtual('img').get(function() {
    let backgroundColor = "9E9E9E"; // default gray color for missing, null, or empty gender
   
    if (this.gender === "male") {
        backgroundColor = "0000FF"; // blue color for male
    } else if (this.gender === "female") {
        backgroundColor = "FFC0CB"; // pink color for female
    }

    return `https://ui-avatars.com/api/?background=${backgroundColor}&color=FFFFFF&name=${this.firstname} ${this.lastname}`;
});
ambassadorSchema.virtual('full_address').get(function() {
    return `${this.address_street}, ${this.address_suburb}, ${this.address_state} ${this.address_postcode}, ${this.address_country}`;
});

ambassadorSchema.statics.markMigrationSmsSent = async function(ambassadorId) {
    try {
        const result = await this.findOneAndUpdate(
            { _id: ambassadorId }, // finds the document by ID
            { $set: { 'activity.migration_sms_sent': true } }, 
            { new: true, runValidators: true } // options: return the updated object, and run schema validators
        );
        return result;
    } catch (error) {
        console.error(error);
    }
};

ambassadorSchema.statics.incrementTaskRequestedCount = async function(ambassadorId) {
    try {
        const result = await this.findOneAndUpdate(
            { _id: ambassadorId }, // finds the document by ID
            { $inc: { 'activity.tasks_requested': 1 } }, // increments tasks_requested
            { new: true, runValidators: true } // options: return the updated object, and run schema validators
        );
        return result;
    } catch (error) {
        console.error(error);
    }
};
ambassadorSchema.statics.incrementTaskRequestedViewedCount = async function(ambassadorId) {
    try {
        const result = await this.findOneAndUpdate(
            { _id: ambassadorId }, // finds the document by ID
            { $inc: { 'activity.tasks_requested_viewed': 1 } }, // increments tasks_requested_viewed
            { new: true, runValidators: true } // options: return the updated object, and run schema validators
        );
        return result;
    } catch (error) {
        console.error(error);
    }
};
ambassadorSchema.statics.incrementTaskAcceptedCount = async function(ambassadorId) {
    try {
        const result = await this.findOneAndUpdate(
            { _id: ambassadorId }, // finds the document by ID
            { $inc: { 'activity.tasks_requested_accepted': 1 } }, // increments tasks_requested_accepted
            { new: true, runValidators: true } // options: return the updated object, and run schema validators
        );
        return result;
    } catch (error) {
        console.error(error);
    }
};

ambassadorSchema.set('toJSON', { virtuals: true });
ambassadorSchema.set('toObject', { virtuals: true });

const Ambassadors = mongoose.model('ambassadors', ambassadorSchema);

module.exports = Ambassadors;