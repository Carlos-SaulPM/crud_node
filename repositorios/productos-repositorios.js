const productos = [
  {
    id: 1,
    nombre: "Sabritas Limon",
    precio: 18,
    estaActivo: true,
    fechaDeRegistro: new Date().toLocaleDateString(),
  },
  {
    id: 2,
    nombre: "Galletas Emperador",
    precio: 20,
    estaActivo: true,
    fechaDeRegistro: new Date().toLocaleDateString(),
  },
  {
    id: 3,
    nombre: "Paleta payaso",
    precio: 22,
    estaActivo: true,
    fechaDeRegistro: new Date().toLocaleDateString(),
  },
];

/**
 * CRUD
 * Create, read, update, delete
 */
/**Funciones principales */

const crearNuevoProducto = (producto) => {
  productos.push(producto);
};

const obtenerProductoID = (id) =>
  productos.find((producto) => producto.id === Number(id));

const obtenerTodosLosProductos = () => productos;

const modificarProducto = (producto) => {
  let indiceDelProducto = productosLocales.findIndex(
    (producto) => producto.id === Number(producto.id)
  );
  if (indiceDelProducto === -1) return -1;
  let productoACambiar = productos[indiceDelProducto];
  for (const llave in producto) {
    if (llave === "id") continue;
    productoACambiar[llave] = producto[llave];
  }
};
const eliminarProducto = (idProductoAEliminar) => {
  idProductoAEliminar=Number(idProductoAEliminar) - 1;
  // console.log(`Tipo de dato: ${typeof idProductoAEliminar} dato: ${idProductoAEliminar}`)
  return productos.splice(idProductoAEliminar, 1);
};

module.exports = {
  crearNuevoProducto,
  obtenerProductoID,
  obtenerTodosLosProductos,
  modificarProducto,
  eliminarProducto,
};
