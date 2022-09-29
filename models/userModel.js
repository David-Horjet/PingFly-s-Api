const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     fullName: {
          type: String,
          required: true,
     },
     email: {
          type: String,
          required: true,
     },
     userName: {
          type: String,
          required: true,
     },
     password: {
          type: String,
          required: true,
     },
     isImageSet: {
          type: Boolean,
          default: false,
     },
     image: {
          type: String,
          default: "../public/img/person-icon-svg-1.jpg",
     }
},
{
     timestamps: true
});

module.exports = mongoose.model('Users', userSchema)