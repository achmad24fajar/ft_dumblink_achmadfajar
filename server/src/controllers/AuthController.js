const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");

exports.registerUser = async (req, res) => {
  try {
    const { email, password, fullname } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().min(10).max(50).required(),
      password: Joi.string().min(8).required(),
      fullname: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        status: "validation failed",
        message: error.details[0].message,
      });

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (checkEmail)
      return res.status(400).send({
        status: "Register failed",
        message: "Email already registered",
      });

    const hashStrength = 10;
    const salt = bcrypt.genSaltSync(hashStrength);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const slug = fullname.toLowerCase().replace(" ", "-")

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const secretKey = "akda4860@a9d1";
    const token = jwt.sign(
      {
        id: user.id,
      },
      secretKey
    );

    res.send({
      status: "success",
      message: "User Succesfully Registered",
      data: {
        user: {
          fullname: user.fullname,
          email: user.email,
          token,
        }
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().min(10).max(50).required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        status: "validation failed",
        message: error.details[0].message,
      });

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (!checkEmail)
      return res.status(400).send({
        status: "Login Failed",
        message: "Your Credentials does not exist",
      });

    const isValidPass = await bcrypt.compareSync(password, checkEmail.password);

    console.log(checkEmail.password);

    if (!isValidPass) {
      return res.status(400).send({
        status: "Login Failed",
        message: "Your Credentials is not Valid",
      });
    }

    const secretKey = "akda4860@a9d1";
    const token = jwt.sign(
      {
        id: checkEmail.id,
      },
      secretKey
    );

    res.send({
      status: "success",
      message: "Login Success",
      data: {
        user: {
          fullname: checkEmail.fullname,
          email: checkEmail.email,
          token,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.editUser = async (req, res) => {
  try{
    const body = req.body

    const update = await User.update(body, {
      where: {
        id: req.userId.id
      }
    })

    const user = await User.findOne({
      where:{
        id: req.userId.id
      },
      attributes:{
        exclude: [ 'password', 'createdAt', 'updatedAt' ]
      }

    })

    res.send({
      status: "Success",
      data:{
        user,
      }
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
}

exports.getUserLogin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId.id,
      },
    });

    const secretKey = "akda4860@a9d1";
    const token = jwt.sign(
      {
        id: req.userId.id,
      },
      secretKey
    );

    res.send({
      status: "success",
      message: "User Valid",
      data: {
        user:{
          ...user.dataValues,
          token
        }
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
}