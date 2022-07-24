const express = require("express");
const router = express.Router();
const productsController = require("../controllers/studentsController");
const studentsController = require("../controllers/studentsController");
const hrProfileController = require("../controllers/hrProfileController");
const traineeProfileController = require("../controllers/traineeProfileController");
const interviewsController = require("../controllers/interviewsController");
const traineeScoreController = require("../controllers/traineeScoreController");

// dla funkcji z productsController np. find, create itd.
// console.log(hrProfileController.hrProfile);

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
router.get("/interviews/", interviewsController.interviews);
router.get("/traineeScore/", traineeScoreController.traineeScore);
// router.get("/hrProfile/", studentsController.hrProfile);
// router.get("/products/", productsController.products);
// router.get("/allProducts/", productsController.allProducts);
// router.post("/products/", productsController.find);
// router.get("/newProducts/", productsController.newProducts);
// router.get("/product/:id", productsController.singleProduct);
// router.get("/categories/", productsController.categories);
// router.get("/category/:category", productsController.category);

module.exports = router;
