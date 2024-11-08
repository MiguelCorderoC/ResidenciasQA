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

DELIMITER //

CREATE PROCEDURE sp_insertar_tipo_cliente(
    IN p_nombre VARCHAR(30),
    IN p_descripcion VARCHAR(100)
)
BEGIN
    INSERT INTO tipos_clientes (nombre, descripcion)
    VALUES (p_nombre, p_descripcion);
    
     -- Retornar la última cotización insertada
    SELECT * FROM tipos_clientes WHERE id = (SELECT MAX(id) FROM tipos_clientes);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_insertar_estado_cliente(
    IN p_nombre VARCHAR(30),
    IN p_descripcion VARCHAR(100)
)
BEGIN
    INSERT INTO estados_clientes (nombre, descripcion)
    VALUES (p_nombre, p_descripcion);
    
    SELECT * FROM estados_clientes WHERE id = (SELECT MAX(id) FROM estados_clientes);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_insertar_cliente(
    IN p_nombre VARCHAR(30),
    IN p_apellido_paterno VARCHAR(20),
    IN p_apellido_materno VARCHAR(20),
    IN p_constancia_fiscal VARCHAR(20),
    IN p_rfc VARCHAR(20),
    IN p_negocio VARCHAR(30),
    IN p_domicilio VARCHAR(50),
    IN p_telefono_wp VARCHAR(15),
    IN p_telefono_fijo VARCHAR(15),
    IN p_correo VARCHAR(50),
    IN p_id_estados_clientes INT,
    IN p_id_tipos_clientes INT
)
BEGIN
    INSERT INTO clientes (
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
        id_estados_clientes, 
        id_tipos_clientes
    )
    VALUES (
        p_nombre, 
        p_apellido_paterno, 
        p_apellido_materno, 
        p_constancia_fiscal, 
        p_rfc, 
        p_negocio, 
        p_domicilio, 
        p_telefono_wp, 
        p_telefono_fijo, 
        p_correo, 
        p_id_estados_clientes, 
        p_id_tipos_clientes
    );
    
       SELECT * FROM clientes WHERE id = (SELECT MAX(id) FROM clientes);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_insertar_clasificacion(
    IN p_nombre VARCHAR(30),
    IN p_descripcion VARCHAR(100)
)
BEGIN
    INSERT INTO clasificaciones (nombre, descripcion)
    VALUES (p_nombre, p_descripcion);
    
    SELECT * FROM clasificaciones WHERE id = (SELECT MAX(id) FROM clasificaciones);
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE sp_insertar_subclasificacion (
	IN p_nombre VARCHAR (30),
    IN p_descripcion VARCHAR (100),
    IN p_id_clasificacion INT )
    
    BEGIN 
		INSERT INTO subclasificaciones (nombre, descripcion, id_clasificacion) 
        VALUES (p_nombre, p_descripcion, p_id_clasificacion);
        
	    SELECT * FROM subclasificaciones WHERE id = (SELECT MAX(id) FROM subclasificaciones);
END //
DELIMITER ;