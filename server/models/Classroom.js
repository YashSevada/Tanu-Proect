const mongoose = require('mongoose')

const ClassroomSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user_collections'
    },
    classroom_name:{
        type:String,
        required:true
    },
    classroom_author:{
        type:String,
        required:true
    },
    classroom_subject:{
        type:String,
        required:true
    },
    classroom_institute:{
        type:String,
        required:true
    },
    isPrivate:{
        type:Boolean,
        default:false
    },
    uniqueID:{
        type:String,
        required:true
    },
    members:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user_collections'
        }
    }],
    requests:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user_collections'
        }
    }],
    banned:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user_collections'
        },
        reason:{
            type:String,
            required:true
        }
    }],
    posts:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user_collections'
        },
        post:{
            type:String,
            required:true
        },
        created_at : 
        { 
            type: Date, 
            required: true, 
            default: Date.now 
        }
    }]
})

module.exports = mongoose.model('classroom',ClassroomSchema)