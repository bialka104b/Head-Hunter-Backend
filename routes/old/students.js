const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/old/studentsController");
const studentsController = require("../../controllers/old/studentsController");
const hrProfileController = require("../../controllers/old/hrProfileController");
const traineeProfileController = require("../../controllers/old/traineeProfileController");
const interviewsController = require("../../controllers/old/interviewsController");
const traineeScoreController = require("../../controllers/old/traineeScoreController");

// dla funkcji z productsController np. find, create itd.
// console.log(hrProfileController.hr-profile);

const mysql = require("mysql");
const pool = mysql.createPool({
	connectionLimit: 100,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
});

router.get("/students/", studentsController.students);
router.get("/hrProfile/", hrProfileController.hrProfile);
router.get("/traineeProfile/", traineeProfileController.traineeProfile);
<<<<<<<< HEAD:routes/students.ts
router.get("/interviews/", interviewsController.interviews);
router.get("/traineeScore/", traineeScoreController.traineeScore);
// router.get("/hrProfile/", studentsController.hrProfile);
========
// router.get("/hr-profile/", studentsController.hr-profile);
>>>>>>>> feature/55_be-structure-rebuild:routes/students.js
// router.get("/products/", productsController.products);
// router.get("/allProducts/", productsController.allProducts);
// router.post("/products/", productsController.find);
// router.get("/newProducts/", productsController.newProducts);
// router.get("/product/:id", productsController.singleProduct);
// router.get("/categories/", productsController.categories);
// router.get("/category/:category", productsController.category);

module.exports = router;
