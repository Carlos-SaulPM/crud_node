const express = require("express");
const port = 3000;
const app = express();

const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path")

const errorMiddleware = require("./middleware/error-middleware");

const route = require("./routes/home_route")
const productos = require("./routes/productos_route")


app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use("/", route)
app.use("/api", productos)


app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
