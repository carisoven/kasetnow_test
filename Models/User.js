const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    uid:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
        default: 'ROLE_ADMIN'
      },
    profile:{
        information:{
            lives:{type:String},
            tel:{type:String},
            email:{type:String},
            website:{type:String}
        },
        about:{
            gender:{type:String},
            dateofbirth:{type:String},
            religious:{type:String},
            aboutyour:{type:String},
        }
    }
    },
    { timestamps: true }
    );

module.exports = User = mongoose.model('user',UserSchema);