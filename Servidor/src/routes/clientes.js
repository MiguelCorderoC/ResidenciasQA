const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.get("/clientes", (req, res) => {
  conexion.query("SELECT * from view_clientes", (error, rows) => {
    if (error) {
      console.error(error);
    } else {
      res.send(rows);
    }
  });
});

router.post("/clientes", (req, res) => {
  const nombre = req.body.nombre;
  const apellido_paterno = req.body.apellido_paterno;
  const apellido_materno = req.body.apellido_materno;
  const constancia_fiscal = req.body.constancia_fiscal;
  const rfc = req.body.rfc;
  const negocio = req.body.negocio;
  const domicilio = req.body.domicilio;
  const telefono_wp = req.body.telefono_wp;
  const telefono_fijo = req.body.telefono_fijo;
  const correo = req.body.correo;
  const id_estado_cliente = req.body.id_estado_cliente;
  const id_tipo_cliente = req.body.id_tipo_cliente;

  conexion.query(
    "CALL sp_insertar_cliente (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      nombre,
      apellido_paterno,
      apellido_materno,
      constancia_fiscal,
      rfc,
      negocio,
      domicilio,
      telefono_wp,
      telefono_fijo,
      correo,
      id_estado_cliente,
      id_tipo_cliente,
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
