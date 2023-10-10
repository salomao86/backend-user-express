const router = require("express").Router();
const user = require("../controllers/user.controller");
const userValidator = require('../validators/user.validator');

router.get("/find/:id", user.find);
router.get("/findAll", user.findAllUsers);
router.post("/create", userValidator.validationBodyRules, userValidator.checkRules, user.createUser);
router.put("/update/:id", userValidator.validationBodyRules, userValidator.checkRules, user.updateUser);
router.delete("/delete/:id", user.deleteUser);

module.exports = router;