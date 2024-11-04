const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cotizaciones = require("./routes/cotizaciones");
const productos = require("./routes/productos");
const clasificaciones = require("./routes/clasificaciones");
const subclasificaciones = require("./routes/subclasificaciones");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use("/api", cotizaciones);
app.use("/api", productos);
app.use("/api", clasificaciones);
app.use("/api", subclasificaciones);

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
