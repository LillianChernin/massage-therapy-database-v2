
const showProfile = (req, res) => {
  res.render('./user/profile', {
    documentTitle: "Profile",
    user: req.session.user
  });
}

module.exports.showProfile = showProfile;
