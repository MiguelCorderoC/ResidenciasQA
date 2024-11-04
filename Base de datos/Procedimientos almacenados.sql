DELIMITER //

CREATE PROCEDURE insertar_estado_cliente (
    IN nombre_estado VARCHAR(30),
    IN descripcion_estado VARCHAR(100)
)
BEGIN
    INSERT INTO estados_clientes (nombre, descripcion)
    VALUES (nombre_estado, descripcion_estado);

    SELECT * FROM estados_clientes WHERE id = (SELECT MAX(id) FROM estados_clientes);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE insertar_tipo_cliente (
    IN nombre_tipo VARCHAR(30),
    IN descripcion_tipo VARCHAR(100)
)
BEGIN
    INSERT INTO tipos_clientes (nombre, descripcion)
    VALUES (nombre_tipo, descripcion_tipo);

    SELECT * FROM tipos_clientes WHERE id = (SELECT MAX(id) FROM tipos_clientes);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE insertar_cliente (
    IN nombre_cliente VARCHAR(30),
    IN apellido_paterno VARCHAR(20),
    IN apellido_materno VARCHAR(20),
    IN constancia_fiscal VARCHAR(20),
    IN rfc_cliente VARCHAR(20),
    IN negocio_cliente VARCHAR(30),
    IN domicilio_cliente VARCHAR(50),
    IN telefono_wp VARCHAR(15),
    IN telefono_fijo VARCHAR(15),
    IN correo_cliente VARCHAR(50),
    IN id_estado INT,
    IN id_tipo INT
)
BEGIN
    INSERT INTO clientes (nombre, apellido_paterno, apellido_materno, constancia_fiscal, rfc, negocio, domicilio, telefono_wp, telefono_fijo, correo, id_estados_clientes, id_tipos_clientes)
    VALUES (nombre_cliente, apellido_paterno, apellido_materno, constancia_fiscal, rfc_cliente, negocio_cliente, domicilio_cliente, telefono_wp, telefono_fijo, correo_cliente, id_estado, id_tipo);

    SELECT * FROM clientes WHERE id = (SELECT MAX(id) FROM clientes);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE insertar_tipo_venta (
    IN nombre_tipo VARCHAR(20),
    IN descripcion_tipo VARCHAR(50)
)
BEGIN
    INSERT INTO tipos_ventas (nombre, descripcion)
    VALUES (nombre_tipo, descripcion_tipo);

    SELECT * FROM tipos_ventas WHERE id = (SELECT MAX(id) FROM tipos_ventas);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE insertar_cotizacion (
    IN subtotal_cotizacion FLOAT,
    IN iva_cotizacion FLOAT,
    IN total_cotizacion FLOAT,
    IN fecha_emision DATE,
    IN fecha_vigencia DATE,
    IN estado CHAR(1),
    IN factura CHAR(1),
    IN personal VARCHAR(30),
    IN observaciones VARCHAR(100),
    IN id_cliente INT,
    IN id_tipo_venta INT
)
BEGIN
    INSERT INTO cotizaciones (subtotal, iva, total, fecha_emision, fecha_vigencia, estado, factura, personal, observaciones, id_clientes, id_tipos_ventas)
    VALUES (subtotal_cotizacion, iva_cotizacion, total_cotizacion, fecha_emision, fecha_vigencia, estado, factura, personal, observaciones, id_cliente, id_tipo_venta);

    SELECT * FROM cotizaciones WHERE id = (SELECT MAX(id) FROM cotizaciones);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE insertar_producto (
    IN nombre_producto VARCHAR(30),
    IN aplicar_instalacion CHAR(1),
    IN precio_con_instalacion FLOAT,
    IN precio_sin_instalacion FLOAT,
    IN observaciones VARCHAR(100)
)
BEGIN
    INSERT INTO productos (nombre, aplicar_instalacion, precio_con_instalacion, precio_sin_instalacion, observaciones)
    VALUES (nombre_producto, aplicar_instalacion, precio_con_instalacion, precio_sin_instalacion, observaciones);

    SELECT * FROM productos WHERE id = (SELECT MAX(id) FROM productos);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE insertar_producto_cotizacion (
    IN id_cotizacion INT,
    IN id_producto INT,
    IN cantidad INT,
    IN base FLOAT,
    IN altura FLOAT,
    IN precio_unitario FLOAT,
    IN importe FLOAT
)
BEGIN
    INSERT INTO productos_cotizaciones (id_cotizacion, id_producto, cantidad, base, altura, precio_unitario, importe)
    VALUES (id_cotizacion, id_producto, cantidad, base, altura, precio_unitario, importe);

    SELECT * FROM productos_cotizaciones WHERE id_cotizacion = id_cotizacion AND id_producto = id_producto;
END //

DELIMITER ;

