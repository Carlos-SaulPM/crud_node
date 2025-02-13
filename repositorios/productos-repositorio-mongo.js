const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const coleccion = "Productos";

const uri = "mongodb://root:12345@localhost:27017/?authMechanism=DEFAULT"; // Cambia esto si usas Mongo Atlas
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function conectarDB() {
  try {
    await client.connect();
    console.log("✅ Conectado a MongoDB");
    return client.db("PuntoDeVenta"); // Cambia el nombre de la base de datos
  } catch (error) {
    console.error("❌ Error de conexión:", error);
    process.exit(1);
  }
}

/**
 * 
 * 
obtenerTodosLosProductos,
obtenerProductoID,
crearNuevoProducto,
eliminarProducto,
modificarProducto,

 */

async function obtenerTodosLosProductos() {
  try {
    const db = await conectarDB();
    console.log(await db.collection(coleccion).countDocuments());
    const lista = await db.collection(coleccion).find({estaActivo:true}).toArray();
    return lista;
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    throw error;
  } finally {
    await client.close();
  }
}

async function obtenerProductoID(productoID) {
  try {
    const db = await conectarDB();
    const producto = await db.collection(coleccion).findOne({ id: Number(productoID) });
    console.log(producto);
    return producto;
  } catch (error) {
    console.error(
      `❌ Error al obtener el producto con id :${productoID}, ${error}`
    );
    throw error;
  }
}

const crearNuevoProducto = async (producto) => {
  try {
    const db = await conectarDB();
    // estimatedDocumentCount()
    let totalDocumentos = await db.collection(coleccion).countDocuments();
    let id = totalDocumentos + 1;
    await db.collection(coleccion).insertOne({
      id: id,
      nombre: producto.nombre,
      precio: producto.precio,
      estaActivo: true,
      fechaDeRegistro: new Date().toLocaleDateString(),
      encodedKey: uuidv4(),
    });
  } catch (error) {
    console.log(`Ocurrió un error en la creación del producto: ${error}`);
    throw error;
  }
};

const eliminarProducto = async (id) => {
  try {
    const db = await conectarDB();
    const productoActual = await obtenerProductoID(id);
    productoActual.estaActivo = false;
    await modificarProducto(productoActual);
  } catch (error) {
    console.log(`Ocurrio un error en la eliminación del producto: ${error}`);
    throw error;
  }
};

const modificarProducto = async (producto) => {
  try {
    const db = await conectarDB();
    const productoActual = obtenerProductoID(producto.id)
    if (!productoActual) {
      console.log(`No se encontró el producto con ID ${producto.id}`);
      return;
    }

    const datosAActualizar = {};
    Object.keys(producto).forEach((key) => {
      if (producto[key] !== productoActual[key]) {
        datosAActualizar[key] = producto[key];
      }
    });
    console.log(datosAActualizar);
    const resultado = await db
      .collection(coleccion)
      .updateOne({ id: producto.id }, {$set:datosAActualizar});
  } catch (error) {
    console.log(`Ocurrio un error en la eliminación del producto: ${error}`);
    throw error;
  }
};

module.exports = {
  obtenerTodosLosProductos,
  obtenerProductoID,
  crearNuevoProducto,
  eliminarProducto,
  modificarProducto,
};
