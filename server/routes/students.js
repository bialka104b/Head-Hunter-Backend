const express = require("express");
const router = express.Router();
const productsController = require("../controllers/studentsController");
const studentsController = require("../controllers/studentsController");
const hrProfileController = require("../controllers/hrProfileController");
const traineeProfileController = require("../controllers/traineeProfileController");

// dla funkcji z productsController np. find, create itd.
// console.log(hrProfileController.hrProfile);

router.get("/students/", studentsController.students);
router.get("/hrProfile/", hrProfileController.hrProfile);
router.get("/traineeProfile/", traineeProfileController.traineeProfile);
// router.get("/hrProfile/", studentsController.hrProfile);
// router.get("/products/", productsController.products);
// router.get("/allProducts/", productsController.allProducts);
// router.post("/products/", productsController.find);
// router.get("/newProducts/", productsController.newProducts);
// router.get("/product/:id", productsController.singleProduct);
// router.get("/categories/", productsController.categories);
// router.get("/category/:category", productsController.category);

module.exports = router;

