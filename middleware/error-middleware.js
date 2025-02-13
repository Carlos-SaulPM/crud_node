const errorMiddleware = (error, req, res, next) => {
  console.log(error);
  res.status(500).json({ mensaje: "Ocurrio un error, no se agüite e intentelo más tarde" });
};

module.exports = errorMiddleware;
