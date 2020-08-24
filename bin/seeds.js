const mongoose = require("mongoose");
const fs = require("fs");
const Movie = require("../models/Movie.model");

mongoose
  .connect(`mongodb://localhost/lab-express-cinemas`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// READ JSON FILE
const movies = JSON.parse(fs.readFileSync(`${__dirname}/movies.json`, "utf-8"));

// IMPORT DATA INTO DB
const importData = async () => {
  console.log("1");
  try {
    console.log("2");
    await Movie.create(movies);
    console.log("3");
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Movie.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  deleteData();
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
