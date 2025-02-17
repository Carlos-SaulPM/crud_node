const express = require("express");
const router = express.Router();

const productos_controller = require("../controladores/productos_controller");
const {validacionDatosBody, validacionDatosParams} =require("../middleware/validacionesDatos-middleware")

/**
 * Mostrar todos los productos
 */
router.get(
  "/productos",
  productos_controller.obtenerTodosLosProductosProductos
);

/**
 * Busqueda por ID
 */

router.get(
  "/productos/:id",
  validacionDatosParams,
  productos_controller.obtenerUnProducto
);

/**
 * Crear un nuevo producto
 */

router.post(
  "/productos/agregar",
  validacionDatosBody,
  productos_controller.crearNuevoProducto
);

/**
 * Modificar un producto
 */
router.put(
  "/productos/:id",
  validacionDatosParams,
  validacionDatosBody,
  productos_controller.modificarProducto
);

/**
 * Eliminar producto
 */
router.delete(
  "/productos/:id",
  validacionDatosParams,
  productos_controller.eliminarProducto
);

module.exports = router;
