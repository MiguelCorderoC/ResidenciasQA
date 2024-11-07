const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.get("/tipos-clientes", (req, res) => {
  conexion.query("SELECT * FROM tipos_clientes", (error, rows) => {
    if (error) {
      console.error(error);
    } else {
      res.send(rows);
    }
  });
});

router.post("/tipos-clientes", (req, res) => {
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  conexion.query(
    "CALL sp_insertar_tipo_cliente (?, ?)",
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
