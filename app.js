const fs = require("fs");
const express = require("express");

const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1; // covert id string to number
  const tour = tours.find((tour) => tour.id === id);
  //Confirm that tour with that id exists
  // if (id > tours.length) {
  //   return res.status(404).json({ status: "failed", message: "Invalid id" });
  // }

  // same as above
  if (!tour) {
    return res.status(404).json({ status: "failed", message: "Invalid id" });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        newTour,
      },
    });
  });
};

const updateTour = (req, res) => {
  const id = req.params.id * 1; // covert id string to number
  const tour = tours.find((tour) => tour.id === id);
  //Confirm that tour with that id exists
  // if (id > tours.length) {
  //   return res.status(404).json({ status: "failed", message: "Invalid id" });
  // }

  // same as above
  if (!tour) {
    return res.status(404).json({ status: "failed", message: "Invalid id" });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "Updated tour here...",
    },
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1; // covert id string to number
  const tour = tours.find((tour) => tour.id === id);
  //Confirm that tour with that id exists
  // if (id > tours.length) {
  //   return res.status(404).json({ status: "failed", message: "Invalid id" });
  // }

  // same as above
  if (!tour) {
    return res.status(404).json({ status: "failed", message: "Invalid id" });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app.route("/api/v1/tours/:id").get(getTour).patch(updateTour).delete(deleteTour);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
