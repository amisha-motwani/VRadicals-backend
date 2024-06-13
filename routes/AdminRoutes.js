const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const RoleHrMiddleware = require("../middleware/RoleHrMiddleware");
const RoleAdminMiddleware = require("../middleware/RoleAdminMiddleware");


// const Note = require("../models/Note");
const HrSchema = require("../models/HrSchema");

const { body, validationResult } = require("express-validator");


  //------------"http://localhost:3001/api/AdminRoutes/EmplyeeStatus/${id}"------------------
router.put(
  "/EmplyeeStatus/:id",
  fetchuser,
  RoleAdminMiddleware,
  async (req, res) => {
    try {
      //Extract title, description, tag from req.body by using object destruction
      const { Status, } = req.body;
      //Yeh line ek naya empty object newNote banata hai, jisme hum update karne wale note ki nayi values store karenge.
      const updatedStatus = {};

      //agar title hai to newNote ke title ko title kardo,

      if(Status){updatedStatus.Status = Status}; // Yeh line check karta hai ki title exist karta hai ya nahi. Agar hai, toh newNote object mein title property set karta hai.
   

      //Find the note to be updated and update it
      let note = await HrSchema.findById(req.params.id);   //params me jo id hai 
      if (!note){    //agar params me id nahi hai to..
          return res.status(404).send("Not Found")
      }

      note = await HrSchema.findByIdAndUpdate(
          req.params.id,
          {$set: updatedStatus},
          {new:true}
      )
      res.json({note});
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
