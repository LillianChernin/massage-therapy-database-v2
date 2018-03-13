
const login = (req, res) => {
  res.render('./auth/login', {
    message: req.flash('loginMessage')
  });
}

const signup = (req, res) => {
  res.render('./auth/signup', {
    message: req.flash('signupMessage');
  });
}

const logout = (req, res) => {
  req.logout();
  res.redirect('/');
}


module.exports.login = login;
module.exports.signup = signup;
module.exports.logout = logout;
