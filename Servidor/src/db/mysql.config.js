const mysql = require("mysql");

const conexion = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "QA",
  user: "root",
  password: "",
});

conexion.connect((error) => {
  if (error) {
    console.error("Error al conectar a la base de datos: " + error);
  } else {
    console.log("Conexion a la base de datos exitosa");
  }
});

module.exports = conexion;
