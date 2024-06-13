const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const nodemailer = require("nodemailer");
const { ObjectId } = require("mongoose").Types;

const JWT_SECRET = "Amishaisagoodgirl@143";
//express-validator is a package for validation

//--------------------------Route 1------------------------------------------------------
//Create a User using: POST "/api/createUser". Register API
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a email name").isEmail(),
    body("role", "Enter a role please").isLength({
      min: 2,
    }),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //if there are errors, returns bad request and the errors
    // res.send('Hello Amishaaaa');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      // Check wheather the user with the same exists already
      let user = await User.findOne({
        email: req.body.email,
      });
      console.log("user==>", user);
      if (user) {
        return res.status(400).json({
          error: "Sorry, user with this email already exist",
        });
      }

      //Creating a secured password from req.body.password
      const salt = await bcrypt.genSalt(10);
      let securedPassword = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
        role: req.body.role,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log("jwt data console==>", authToken);
      res.status(200).json({ authToken, role: req.body.role});
    } catch (error) {
      console.log("My error==>", error);
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
    console.log("catch block me gya code")
  
  }
);

//--------------------------Route 2------------------------------------------------------
//Authenticate a user : post "localhost:5000/api/auth/createUser". Login API
router.post(
  "/loginUser",
  [
    body("email", "Enter a email name").isEmail(),
    body("password", "Password can not be blank").exists(),
    body("role", "Role cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // const { email, password } = req.body;
    const { email, password, role } = req.body;
    try {
      //user mese email find karenge and usse match karwaenge(campare karenge)
      let user = await User.findOne({
        email: email,
      });

      //agar email match nahi hua to..
      if (!user) {
        return res.status(400).json({
          error: "Please try to login with correct credentials",
        });
      }
  
      //Bcrypt ki help se passowrd ko comapre karenge, jo passwaord dala jaya hai usse user ke password se compare karenge
      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(400).json({
          error: "Please try to login with correct credentials",
        });
      }
      // Check if the role matches
      if (role !== user?.role) {
        return res.status(400).json({
          error: "Role is not correct",
          
        });
      } else {console.log("role is", user?.role);}
      //jab email and password dono sahi hoga tab response me ye chala jaega
      const data = {
        user: {
          id: user.id,
          role: user.role, // Include role in the payload
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      // res.status(200).json({ authToken });
      res.status(200).json({ authToken, role: user.role });
    } catch (error) {
      console.log("My error==>", error);
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
