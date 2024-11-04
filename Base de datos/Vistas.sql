CREATE VIEW vista_clientes_cotizaciones AS
SELECT
    cli.id AS cliente_id,
    cli.nombre AS cliente_nombre,
    cli.negocio AS cliente_negocio,
    cot.id AS cotizacion_id,
    cot.subtotal,
    cot.iva,
    cot.total,
    cot.fecha_emision,
    cot.fecha_vigencia,
    cot.estado,
    cot.factura,
    cot.personal,
    cot.observaciones
FROM 
    clientes AS cli
JOIN 
    cotizaciones AS cot ON cli.id = cot.id_clientes;
    
    SELECT * FROM cotizaciones;
    SELECT * FROM vista_clientes_cotizaciones;
/*------------------------------------------------------------------------------------*/    
    CREATE VIEW vista_clasificaciones_subclasificaciones AS
SELECT 
    c.id AS clasificacion_id,
    c.nombre AS clasificacion_nombre,
    c.descripcion AS clasificacion_descripcion,
    s.id AS subclasificacion_id,
    s.nombre AS subclasificacion_nombre,
    s.descripcion AS subclasificacion_descripcion
FROM 
    clasificaciones c
JOIN 
    subclasificaciones s ON c.id = s.id_clasificacion;
    
    /*-----------------------------------------------------------------------------*/
    
CREATE VIEW vista_productos_subclasificaciones AS
SELECT 
    p.id AS producto_id,
    p.aplicar_instalacion,
    p.precio_con_instalacion,
    p.precio_sin_instalacion,
    p.observaciones,
    s.id AS subclasificacion_id,
    s.nombre AS subclasificacion_nombre,
    s.descripcion AS subclasificacion_descripcion
FROM 
    productos p
JOIN 
    subclasificaciones s ON p.id_subclasificacion = s.id;