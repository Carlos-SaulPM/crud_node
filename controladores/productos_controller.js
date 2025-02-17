const repositorio = require("../repositorios/productos-repositorio-mongo");

const obtenerTodosLosProductosProductos = async (req, res, next) => {
 let productos = await repositorio.obtenerTodosLosProductos();

  res.render("productos/productos", { productos });
};

const obtenerUnProducto = async (req, res, next) => {
  let producto = await repositorio.obtenerProductoID(req.params.id);
  if (producto === undefined || producto === null) {
    res.status(404).json("No se encontro el producto");
    return;
  }
  res.status(200).json(producto);
};

const crearNuevoProducto = (req, res) => {
  let productoNuevo = req.body;
  repositorio.crearNuevoProducto(productoNuevo);
  res.status(201).json(productoNuevo);
};

const modificarProducto = (req, res) => {
  req.body.id = req.params.id;
  let productoAModificar = req.body;
  //Modoficar la respuesta de status
  let respuesta = repositorio.modificarProducto(productoAModificar);
  respuesta
    ? res.render("/partials/error_404")
    : res.status(202).json(productoAModificar);
};

const eliminarProducto = (req, res) => {
  console.log(req.params.id);
  let procesado = null;
  procesado = repositorio.eliminarProducto(req.params.id);
  procesado === undefined || procesado === null
    ? res.render("/partials/error_404")
    : res.status(200).send("Producto eliminado");
};

module.exports = {
  obtenerTodosLosProductosProductos,
  obtenerUnProducto,
  crearNuevoProducto,
  modificarProducto,
  eliminarProducto,
};
