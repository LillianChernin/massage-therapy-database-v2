
const showProfile = (req, res) => {
  res.render('profile', {
    user: req.user
  });
}

module.exports.showProfile = showProfile;
