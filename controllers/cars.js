const Car = require("../models/car");
const User = require("../models/user");

module.exports = {
  index: async (req, res, next) => {
    //Get all the cars
    const cars = await Car.find({});
    res.status(200).json(cars);
  },

  newCar: async (req, res, next) => {
    console.log("req.value", req.value);
    // 1.Find the actual seller
    const seller = await User.findById(req.value.body.seller);
    //console.log(seller);
    // 2.Create a new car
    const newCar = req.value.body;
    delete newCar.seller;

    const car = new Car(newCar);
    car.seller = seller;
    await car.save();

    // 3.And newly created car to the actual seller
    seller.cars.push(car);
    await seller.save();

    res.status(200).json(car);
  },

  getCar: async (req, res, next) => {
    const car = await Car.findById(req.value.params.carId);
    res.status(200).json(car);
  },

  replaceCar: async (req, res, next) => {
    const { carId } = req.value.params;
    const newCar = req.value.body;

    const result = await Car.findByIdAndUpdate(carId, newCar, { new: true });
    res.status(200).json(result);
  },

  updateCar: async (req, res, next) => {
    const { carId } = req.value.params;
    const newCar = req.value.body;
    const result = await Car.findByIdAndUpdate(carId, newCar, { new: true });
    res.status(200).json(result);
  },

  deleteCar: async (req, res, next) => {
    const { carId } = req.value.params;
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ error: "Car doesn't exist" });
    }

    const sellerId = car.seller;
    const seller = await User.findById(sellerId);

    await car.remove();
    seller.cars.pull(car);
    await seller.save();

    res.status(200).json(seller);
  }
};
