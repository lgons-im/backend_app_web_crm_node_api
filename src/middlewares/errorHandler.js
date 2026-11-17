export function errorHandler(err, req, res, _next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    ok: false,
    mensaje: err.message || 'Error interno del servidor',
    codigo: err.code || null,
  });
}