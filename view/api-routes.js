var router = require("express").Router()
var userController = require("../controller/db-users-controller");
var roleController = require("../controller/role-controller");
var empController = require("../controller/emp-controller");

router.post("/signup",userController.signup);
router.get("/users",userController.getAllUsers);
router.delete("/users/:userId",userController.deleteUser);
router.get("/users/:userId",userController.getUserById);
router.put("/users",userController.updateUser);

router.post("/roles",roleController.addRole);
router.get("/roles",roleController.getAllRole);

router.post("/employees",empController.addEmployee);
router.get("/employees",empController.getAllEmployee);

router.post("/authenticate",userController.authenticate)
router.get("/email",userController.email);

module.exports = router