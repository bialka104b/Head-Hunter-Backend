import { Router } from "express";
import { students } from "../controllers/studentsController";

// dla funkcji z productsController np. find, create itd.

export const studentsRoutes = Router().get("/students/", students);
// .get("/products/", productsController.products);
// .get("/allProducts/", productsController.allProducts);
// .post("/products/", productsController.find);
// .get("/newProducts/", productsController.newProducts);
// .get("/product/:id", productsController.singleProduct);
// .get("/categories/", productsController.categories);
// .get("/category/:category", productsController.category);
