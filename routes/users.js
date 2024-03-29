const express = require("express");
//const router = express.Router();
const router = require("express-promise-router")();
const UsersController = require("../controllers/users");
const {
  validateParam,
  schemas,
  validateBody
} = require("../helpers/routeHelpers");

router
  .route("/")
  .get(UsersController.index)
  .post(validateBody(schemas.userSchema), UsersController.newUser);

//  /users/:id
router
  .route("/:userId")
  .get(validateParam(schemas.idSchema, "userId"), UsersController.getUser)
  .put(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userSchema)
    ],
    UsersController.replaceUser
  )
  .patch(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userOptionalSchema)
    ],
    UsersController.updateUser
  );

router
  .route("/:userId/cars")
  .get(validateParam(schemas.idSchema, "userId"), UsersController.getUserCars)
  .post(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userCarSchema)
    ],
    UsersController.newUserCar
  );

module.exports = router;
