const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.get("/subclasificaciones", (req, res) => {
  conexion.query(
    "SELECT * FROM vista_clasificaciones_subclasificaciones",
    (error, rows) => {
      if (error) {
        console.error("Error al obtener subclasificaciones");
      } else {
        res.send(rows);
      }
    }
  );
});

router.post("/subclasificaciones", (req, res) => {
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  const clasificacion_id = req.body.clasificacion_id;
  conexion.query(
    "CALL sp_insertar_subclasificacion (?, ?, ?)",
    [nombre, descripcion, clasificacion_id],
    (error, rows) => {
      if (error) {
        console.error(error);
      } else {
        const id = rows[0][0].id;
        res.send({ id });
      }
    }
  );
});
module.exports = router;
