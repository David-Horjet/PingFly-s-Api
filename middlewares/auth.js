const Users = reuire("../models/userModel.js")

loginRequired = async (req, res, next) => {
     if (req.session && req.session.user) {
          // find the user
          const user = await Users.findById(req.session.user._id);
          if (!user) {
               // if user not found
               return res.json({
                    status: false,
                    message: "You have to Sign in"
               })
          }
          // If user found
          req.user = user;
          return next();
     }
     // if no user in session
     return res.json({
          status: false,
          message: "You have to Sign in"
     })
}


logoutRequired = (req, res, next) => {
     if (req.session && req.session.user) {
          return res.json({
               status: false,
               message: "You have to Log out"
          })
     }
     // if not user in session
     return next();
}

module.exports = {
     loginRequired,
     logoutRequired
}