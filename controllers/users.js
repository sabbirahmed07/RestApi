const User = require("../models/user");
const Car = require("../models/car");

module.exports = {
  index: async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json(users);
  },

  newUser: async (req, res, next) => {
    console.log("req.value", req.value);
    const newUser = new User(req.value.body);
    const user = await newUser.save();
    res.status(201).json(user);
  },

  getUser: async (req, res, next) => {
    //NEW WAY
    const { userId } = req.value.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  },

  replaceUser: async (req, res, next) => {
    //enforce that req.body must contain all the fields
    const { userId } = req.value.params;
    const newUser = req.value.body;
    // console.log("userId is", userId);
    // console.log("newUser is", newUser);

    const result = await User.findByIdAndUpdate(userId, newUser, { new: true });
    // console.log("result", result);
    res.status(200).json(result);
  },

  updateUser: async (req, res, next) => {
    //req.body may contain any number of fields
    const { userId } = req.value.params;
    const newUser = req.value.body;
    // console.log("userId is", userId);
    // console.log("newUser is", newUser);

    const result = await User.findByIdAndUpdate(userId, newUser, { new: true });
    // console.log("result", result);
    res.status(200).json(result);
  },

  getUserCars: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId).populate("cars");
    //console.log("user's car", user);
    res.status(200).json(user.cars);
  },

  newUserCar: async (req, res, next) => {
    const { userId } = req.value.params;
    //create a new Car
    const newCar = new Car(req.value.body);
    //console.log("newCar", newCar);
    //get User
    const user = await User.findById(userId);
    //Assign user as a car's seller
    newCar.seller = user;
    //Save the car
    await newCar.save();
    //Add car to the user's selling array 'cars'
    user.cars.push(newCar);
    //Save the user
    await user.save();
    res.status(201).json(newCar);
  }
};

/*
We can interact with mongoose in 3 different ways
1) callbacks
2) promises
3)Async/Await (Promises)
*/

// index: (req, res, next) => {
//   User.find({}, (err, users) => {
//     if (err) {
//       next(err);
//     }
//     res.status(200).json(users);
//   });
// },

// index: (req, res, next) => {
//   User.find({})
//     .then(users => {
//       res.status(200).json(users);
//     })
//     .catch(err => {
//       next(err);
//     });
// },

// newUser: (req, res, next) => {
//   // console.log("req.body contents", req.body);
//   const newUser = new User(req.body);
//   // console.log("newUser", newUser);
//   newUser.save((err, user) => {
//     if (err) {
//       next(err);
//     }
//     // console.log("err", err);
//     // console.log("user", user);
//     res.status(201).json(user);
//   });
// },

// newUser: (req, res, next) => {
//   const newUser = new User(req.body);
//   newUser
//     .save()
//     .then(user => {
//       res.status(201).json(user);
//     })
//     .catch(err => {
//       next(err);
//     });
// }

// index: async (req, res, next) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json(users);
//   } catch (error) {
//     next(error);
//   }
// },

// newUser: async (req, res, next) => {
//   try {
//     const newUser = new User(req.body);
//     const user = await newUser.save();
//     res.status(201).json(user);
//   } catch (error) {
//     next(error);
//   }
// }
