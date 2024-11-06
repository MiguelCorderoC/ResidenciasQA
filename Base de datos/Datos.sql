-- Inserciones en la tabla estados_clientes
INSERT INTO estados_clientes (nombre, descripcion) VALUES 
('Activo', 'Cliente activo'),
('Inactivo', 'Cliente inactivo');

-- Inserciones en la tabla tipos_clientes
INSERT INTO tipos_clientes (nombre, descripcion) VALUES 
('Regular', 'Cliente regular'),
('VIP', 'Cliente VIP');

-- Inserciones en la tabla clientes
INSERT INTO clientes (nombre, apellido_paterno, apellido_materno, constancia_fiscal, rfc, negocio, domicilio, telefono_wp, telefono_fijo, correo, id_estados_clientes, id_tipos_clientes) VALUES 
('Juan', 'Pérez', 'García', 'ABC123', 'JPG850101', 'Negocio1', 'Calle Falsa 123', '1234567890', '0987654321', 'juan@example.com', 1, 1),
('Maria', 'López', 'Hernandez', 'XYZ456', 'MLH920202', 'Negocio2', 'Avenida Siempre Viva 456', '2345678901', '1098765432', 'maria@example.com', 1, 2);

-- Inserciones en la tabla tipos_ventas
INSERT INTO tipos_ventas (nombre, descripcion) VALUES 
('Contado', 'Venta al contado'),
('Crédito', 'Venta a crédito');

-- Inserciones en la tabla cotizaciones
INSERT INTO cotizaciones (subtotal, iva, total, fecha_emision, fecha_vigencia, estado, factura, personal, observaciones, id_clientes, id_tipos_ventas) VALUES 
(1000, 160, 1160, '2024-01-01', '2024-01-31', 'A', 'N', 'Empleado1', 'Cotización inicial', 1, 1),
(2000, 320, 2320, '2024-02-01', '2024-02-28', 'P', 'S', 'Empleado2', 'Cotización pendiente', 2, 2);

-- Inserciones en la tabla clasificaciones
INSERT INTO clasificaciones (nombre, descripcion) VALUES 
('Electrónica', 'Productos electrónicos'),
('Muebles', 'Productos de muebles');

-- Inserciones en la tabla subclasificaciones
INSERT INTO subclasificaciones (nombre, descripcion, id_clasificacion) VALUES 
('Teléfonos', 'Subcategoría de teléfonos', 1),
('Sofás', 'Subcategoría de sofás', 2);

INSERT INTO subclasificaciones (nombre, descripcion, id_clasificacion) VALUES 
('Impresion de vinil', 'Subcategoría de teléfonos', 2);

-- Inserciones en la tabla productos
INSERT INTO productos (aplicar_instalacion, precio_con_instalacion, precio_sin_instalacion, observaciones, id_subclasificacion) VALUES 
('S', 1200, 1000, 'Producto con instalación', 1),
('N', 800, 800, 'Producto sin instalación', 2);

-- Inserciones en la tabla productos_cotizaciones
INSERT INTO productos_cotizaciones (id_cotizacion, id_producto, cantidad, base, altura, precio_unitario, importe) VALUES 
(1, 1, 2, 10.5, 5.5, 1000, 2000),
(2, 2, 1, 12.0, 6.0, 800, 800);

