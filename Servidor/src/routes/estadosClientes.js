const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.get("/estados-clientes", (req, res) => {
  conexion.query("SELECT * FROM estados_clientes", (error, rows) => {
    if (error) {
      console.error(error);
    } else {
      res.send(rows);
    }
  });
});

router.post("/estados-clientes", (req, res) => {
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  conexion.query(
    "CALL sp_insertar_estado_cliente (?, ?)",
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
