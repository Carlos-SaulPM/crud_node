const express = require("express");
const router = express.Router();

// const repositorio = require("../repositorios/productos-repositorios");
const repositorio = require("../repositorios/productos-repositorio-mongo")


const holaMundo = ()=>{
  console.log("Hola Mundo")
  return "Hola Mundo";
}

/**
 * Crear un nuevo producto
 */

router.post("/api/productos/", (req, res) => {
  let productoNuevo = req.body;
  repositorio.crearNuevoProducto(productoNuevo);
  res.status(201).json(productoNuevo);
});

/**
 * Mostrar todos los productos
 */
router.get("/api/productos", async(req, res) => {
  let productos = await repositorio.obtenerTodosLosProductos();
  res.status(200).json(productos);
});

/**
 * Busqueda por ID
 */

router.get("/api/productos/:id", async (req, res) => {
  let producto = await repositorio.obtenerProductoID(req.params.id);
  if (producto === undefined) {
    res.status(404).json("No se encontro el producto");
  }
  res.status(200).json(producto);
});

/**
 * Modificar un producto
 */
router.put("/api/productos/:id", (req, res) => {
  req.body.id = req.params.id;
  let productoAModificar = req.body;
  let error = repositorio.modificarProducto(productoAModificar);

  if (error === -1) {
    res.status(404).json("No se encontro el producto");
    return;
  }
  res.status(202).json(productoAModificar);
});

/**
 * Eliminar producto
 */
router.delete("/api/productos/:id", (req, res) => {
  console.log(req.params.id);
  let procesado = null;
  procesado = repositorio.eliminarProducto(req.params.id);
  (procesado === undefined || procesado===null)
    ? res.status(404).send("No existe ese producto con ese ID")
    : res.status(200).send("Producto eliminado");
});

module.exports =router;