const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.get("/clasificaciones", (req, res) => {
  conexion.query("SELECT * FROM clasificaciones", (error, rows) => {
    if (error) {
      console.error("Error al obtener clasificaciones");
    } else {
      res.send(rows);
    }
  });
});

router.post("/clasificaciones", (req, res) => {
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;

  conexion.query(
    "CALL sp_insertar_clasificacion (?, ?)",
    [nombre, descripcion],
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
