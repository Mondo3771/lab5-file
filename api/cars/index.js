module.exports = async function (context, req) {
  const cars = require("../../cars.json");
  const id = req.params.id;
  switch (req.method) {
    case "GET":
      if (id) {
        const car = cars.find((car) => car.id === id);
        context.res = { body: car };
      } else {
        context.res = { body: cars };
      }
      break;
    case "PUT":
      const updatedCar = req.body;
      const index = cars.findIndex((car) => car.id === id);
      cars[index] = updatedCar;
      context.res = { body: updatedCar };
      break;
    case "DELETE":
      const deleteIndex = cars.findIndex((car) => car.id === id);
      cars.splice(deleteIndex, 1);
      context.res = { body: { message: `Car with id ${id} deleted.` } };
      break;
    case "POST":
      const newCar = req.body;
      cars.push(newCar);
      context.res = { body: newCar };
      break;
    default:
      context.res = {
        status: 400,
        body: "Please make a GET, PUT, DELETE, or POST request.",
      };
      break;
  }
};
