const express = require("express");
const router = new express.Router();
const generateDataController = require("../controlers/imageController");




router.get("/create-companies",generateDataController.createCompanies);



module.exports = router
