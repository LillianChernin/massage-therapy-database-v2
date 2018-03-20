const db = require('../models');
const bcrypt = require('bcrypt');
const session = require('express-session');

try {
  ENV = require('../env');
} catch (ex) {
  ENV = process.env;
}

const login = (req, res) => {
  db.User.findOne({email: req.body.email}, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) {
        res.status(500).send(err);
      }
      if (isMatch) {
        req.session.regenerate(() => {
						console.log('password matches');
						req.session.user = user;
						res.redirect('/')
        })
      }
    })
  })
}

const signup = (req, res) => {
  res.render('./auth/signup', {
    message: req.flash('signupMessage')
  });
}



const createNewUser = (req, res) => {
  bcrypt.genSalt(ENV.SALT_WORK_FACTOR, (err, salt) => {
  	bcrypt.hash(req.body.password, salt, (err, hash) => {
  		let user = new db.User({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      })
  		user.save().then((newUser) => {
  			console.log('Successfuly added to the database!')
  			req.session.regenerate(() => {
  			  req.session.user = user;
  			  console.log(req.session.user);
  			  res.redirect('/')
  			})
  		})
  	})
  })
}

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
}


module.exports.login = login;
module.exports.signup = signup;
module.exports.createNewUser = createNewUser;
module.exports.logout = logout;
