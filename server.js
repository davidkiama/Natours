const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
