const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.get("/productos", (req, res) => {
  conexion.query(
    "SELECT * FROM vista_productos_subclasificaciones",
    (error, rows) => {
      if (error) {
        console.error(error);
      } else {
        res.send(rows);
      }
    }
  );
});

router.get("/productos/:id", (req, res) => {
  const id = req.params.id;
  conexion.query(
    "SELECT * FROM productos WHERE id = ?",
    [id],
    (error, rows) => {
      if (error) {
        console.error(error);
      } else {
        res.send(rows);
      }
    }
  );
});

router.post("/productos", (req, res) => {
  const aplicar_instalacion = req.body.aplicar_instalacion;
  const precio_con_instalacion = req.body.precio_con_instalacion;
  const precio_sin_instalacion = req.body.precio_sin_instalacion;
  const observaciones = req.body.observaciones;
  const id_subclasificacion = req.body.id_subclasificacion;

  conexion.query(
    "CALL insertar_producto (?, ?, ?, ?, ?)",
    [
      id_subclasificacion,
      aplicar_instalacion,
      precio_con_instalacion,
      precio_sin_instalacion,
      observaciones,
    ],
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
