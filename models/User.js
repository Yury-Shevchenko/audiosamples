const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
    name             : String,
    email            : String,
    password         : String,
    created          : {
        type         : Date,
        default      : Date.now
    },
    level            : Number, //The normal user is 1, the admin is 11, the Superadmin is 101
    studies          : [{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'project'
                      }]
})

//methods
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);
