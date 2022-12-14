const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
     upload
} = require('../middlewares/upload');

const storage = upload.single('image');

const register = async (req, res, next) => {
     try {

          const {
               fullName,
               email,
               userName,
               password,
          } = req.body;

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const casedEmail = email.toLowerCase();
          const casedUname = userName.toLowerCase();

          const emailCheck = await Users.findOne({
               email: casedEmail
          });

          const unameCheck = await Users.findOne({
               userName: casedUname
          });

          if (emailCheck) {
               return res.json({
                    status: false,
                    message: "Email taken"
               })
          }

          if (unameCheck) {
               return res.json({
                    status: false,
                    message: "Username taken"
               })
          }

          const user = await Users.create({
               fullName,
               email: casedEmail,
               userName: casedUname,
               password: hashedPassword,
          });
          delete user.password;

          return res.json({
               status: true,
               message: "New User Created",
               user
          });
     } catch (error) {
          next(error);
          return res.json({
               status: false,
               message: "Internal Server Error Occured"
          })
     }
}

const login = async (req, res, next) => {
     try {
          const {
               email,
               password
          } = req.body;

          var user = await Users.findOne({
               email: email.toLowerCase()
          });

          if (!user) {
               return res.json({
                    status: false,
                    msg: "Email or Username not Found"
               })
          }

          const valid = await bcrypt.compare(password, user.password);

          if (!valid) {
               return res.json({
                    status: false,
                    msg: "Incorrect Password"
               })
          }

          req.session.user = user;

          console.log(req.session);

          return res.json({
               status: true,
               msg: "Login Successful",
               user
          })

     } catch (error) {
          next(error);
          return res.json({
               status: false,
               message: "Internal Server Error Occured"
          })
     }
}

const setImage = async (req, res, next) => {
     storage(req, res, async (error) => {

          if (error) {
               return res.json({
                    status: "false",
                    msg: error.message
               })
          }

          const body = req.body;

          if (req.file) {
               body.image = req.file.path;
          }

          const userId = req.params.id;
          const image = body.image;
          console.log(image);
          const userData = await Users.findByIdAndUpdate(userId, {
               new: true,
               image,
               isImageSet: true,
          });

          console.log(userData);

          return res.json({
               status: true,
               msg: "Profile Image Successfully Set",
               userData
          });
     })
}

module.exports = {                                                        
     register,
     login,
     setImage
}