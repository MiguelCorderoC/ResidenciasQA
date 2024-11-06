DELIMITER //

CREATE PROCEDURE insertar_producto (
    IN id_subclasificacion INT,
    IN aplicar_instalacion CHAR(1),
    IN precio_con_instalacion FLOAT,
    IN precio_sin_instalacion FLOAT,
    IN observaciones VARCHAR(100)
)
BEGIN
    INSERT INTO productos (aplicar_instalacion, precio_con_instalacion, precio_sin_instalacion, observaciones, id_subclasificacion)
    VALUES (aplicar_instalacion, precio_con_instalacion, precio_sin_instalacion, observaciones, id_subclasificacion);

    SELECT * FROM productos WHERE id = (SELECT MAX(id) FROM productos);
END //

DELIMITER ;

DELIMITER //

CREATE OR REPLACE PROCEDURE insertar_cotizacion (
    IN p_subtotal FLOAT,
    IN p_iva FLOAT,
    IN p_total FLOAT,
    IN p_fecha_vigencia DATE,
    IN p_estado CHAR(1),
    IN p_factura CHAR(1),
    IN p_personal VARCHAR(30),
    IN p_observaciones VARCHAR(100),
    IN p_id_clientes INT,
    IN p_id_tipos_ventas INT
)
BEGIN
    -- Insertar nueva cotización con la fecha de emisión actual
    INSERT INTO cotizaciones (
        subtotal,
        iva,
        total,
        fecha_emision,
        fecha_vigencia,
        estado,
        factura,
        personal,
        observaciones,
        id_clientes,
        id_tipos_ventas
    )
    VALUES (
        p_subtotal,
        p_iva,
        p_total,
        CURDATE(),  -- Fecha de emisión actual
        p_fecha_vigencia,
        p_estado,
        p_factura,
        p_personal,
        p_observaciones,
        p_id_clientes,
        p_id_tipos_ventas
    );

    -- Retornar la última cotización insertada
    SELECT * FROM cotizaciones WHERE id = (SELECT MAX(id) FROM cotizaciones);

END //

DELIMITER ;

SELECT * FROM cotizaciones;