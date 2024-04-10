module.exports = async function (context, req) {
  const cars = require("./cars.json");
  const id = req.params.id;

  switch (req.method) {
    case "GET":
      if (id) {
        const car = cars.find((car) => String(car.id) === String(id));
        if (car) {
          context.res = { body: car };
        } else {
          context.res = {
            status: 404,
            body: { message: `Car with id ${id} not found.` },
          };
        }
      } else {
        context.res = { body: cars };
      }
      break;
    case "PUT":
      const updatedCar = req.body;
      const index = cars.findIndex((car) => String(car.id) === String(id));
      if (index !== -1) {
        cars[index] = updatedCar;
        context.res = { body: updatedCar };
      } else {
        context.res = {
          status: 404,
          body: { message: `Car with id ${id} not found.` },
        };
      }
      break;
    case "DELETE":
      const deleteIndex = cars.findIndex(
        (car) => String(car.id) === String(id)
      );
      if (deleteIndex !== -1) {
        cars.splice(deleteIndex, 1);
        context.res = { body: { message: `Car with id ${id} deleted.` } };
      } else {
        context.res = {
          status: 404,
          body: { message: `Car with id ${id} not found.` },
        };
      }
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
