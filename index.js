const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const errorMiddleware = require("./middleware/error-middleware");

const servicio = require("./controladores/proyecto-controlador")
const productosControlador = require("./controladores/productos-controlador")

const port = 3000;

const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(servicio);
app.use(productosControlador);


app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
