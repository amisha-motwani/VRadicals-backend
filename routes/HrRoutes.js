const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const RoleHrMiddleware = require("../middleware/RoleHrMiddleware");

// const Note = require("../models/Note");
const Note = require("../models/HrSchema");

const { body, validationResult } = require("express-validator");

//............Route 1 - "http://localhost:3001/api/HrRoutes/viewAddedEmployees "..............

router.get("/viewAddedEmployees", async (req, res) => {
  try {
     //This line means, jo user req.user ke equal ho usse find krlo
    const notes = await Note.find({
      // user: req.user.id,
    });
    res.json(notes);    // this means notes array send krdo reponse
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//--------------------------------Route 2: To add notes---------------------
//-------------Add a new note using Post request: "http://localhost:3001/api/HrRoutes/addEmployeese"-----------------------
router.post(
  "/addEmployees",
  fetchuser,
  RoleHrMiddleware,
  [
    body("name", "Please enter name").isLength({ min: 2 }),
    body("age", "Please enter age").isLength({
      min: 2,
    }),
    body("email", "Enter a valid email").isLength({ min: 3 }),
    body("Job_profile", "Please enter Job_profile").isLength({ min: 2 }),
    body("Total_experience", "Enter your experience").isLength({ min: 1 }),
    body("Status").isLength({ min: 0 }),
  ],
  async (req, res) => {
    try {
        //Extract title, description, tag from req.body by using object destruction
      const { name, age , email, Job_profile, Total_experience, Status} = req.body;

      //If there is any error occured, return end request and the validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
 // Set default value for Status
//  const DefaultStatus = req.body.Status = "fasle";

      const note = new Note({
        name,
         age, 
         email, 
         Job_profile, 
         Total_experience,
        Status: "Status",
        user: req.user.id,
      });
      const savedEmployee = await note.save();
      const responseData = {
        EmployeeDetails: savedEmployee
      };
      res.json(responseData);
      
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
