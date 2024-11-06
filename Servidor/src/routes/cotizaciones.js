const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.get("/cotizaciones", (req, res) => {
  conexion.query("SELECT * FROM vista_clientes_cotizaciones", (error, rows) => {
    if (error) {
      console.error("Error al obtener cotizaciones ", error);
    } else {
      res.send(rows);
    }
  });
});

router.post("/cotizaciones", (req, res) => {
  const p_subtotal = req.body.p_subtotal;
  const p_iva = req.body.p_iva;
  const p_total = req.body.p_total;
  const p_fecha_vigencia = req.body.p_fecha_vigencia;
  const p_estado = req.body.p_estado;
  const p_factura = req.body.p_factura;
  const p_personal = req.body.p_personal;
  const p_observaciones = req.body.p_observaciones;
  const p_id_clientes = req.body.p_id_clientes;
  const p_id_tipos_ventas = req.body.p_id_tipos_ventas;

  conexion.query(
    "CALL insertar_cotizacion (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      p_subtotal,
      p_iva,
      p_total,
      p_fecha_vigencia,
      p_estado,
      p_factura,
      p_personal,
      p_observaciones,
      p_id_clientes,
      p_id_tipos_ventas,
    ],
    (error, rows) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error al registrar cotización");
      } else {
        const id = rows[0][0].id;
        res.send({ id });
      }
    }
  );
});

module.exports = router;
