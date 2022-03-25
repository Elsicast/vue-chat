const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
// const { check } = require("prettier");

module.exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    const isexist = await User.findOne({
      username: username,
    });
    if (isexist) return res.json({ msg: "此用户名已注册！", status: false });
    const checkEmail = await User.findOne({
      email: email,
    });
    if (checkEmail) return res.json({ msg: "此邮箱已注册！", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const user = await User.findOne({
      username: username,
    });
    if (!user) {
      res.json({ msg: "用户名不存在！", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.json({ msg: "密码错误！", status: false });
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.setavatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage: avatarImage,
      },
      { new: true }
    );
    console.log(userData);
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports.logOut = async (req, res, next) => {
  try {
    const user = await User.find({ _id: req.params.id });
    console.log(user);
    if (user) {
      return res.json({ status: 200 });
    }
  } catch (error) {
    next(error);
  }
};
