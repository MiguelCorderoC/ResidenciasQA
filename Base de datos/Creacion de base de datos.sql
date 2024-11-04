CREATE DATABASE QA;

USE QA;

CREATE TABLE estados_clientes (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (30),
    descripcion VARCHAR (100)
);

CREATE TABLE tipos_clientes (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (30),
    descripcion VARCHAR (100)
);

CREATE TABLE clientes (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (30),
    apellido_paterno VARCHAR (20),
    apellido_materno VARCHAR (20),
    constancia_fiscal VARCHAR (20),
    rfc VARCHAR (20),
    negocio VARCHAR (30),
    domicilio VARCHAR (50),
    telefono_wp VARCHAR (15),
    telefono_fijo VARCHAR (15),
    correo VARCHAR (50),
    id_estados_clientes INT,
    id_tipos_clientes INT,
    CONSTRAINT fk_estados_clientes FOREIGN KEY (id_estados_clientes) REFERENCES estados_clientes (id),
    CONSTRAINT fk_tipos_clientes FOREIGN KEY (id_tipos_clientes) REFERENCES tipos_clientes (id)
);

CREATE TABLE tipos_ventas (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (20),
    descripcion VARCHAR (50)    
);

CREATE TABLE cotizaciones (
	id INT AUTO_INCREMENT PRIMARY KEY,
    subtotal FLOAT,
    iva FLOAT,
    total FLOAT,
    fecha_emision DATE,
    fecha_vigencia DATE,
    estado CHAR,
    factura CHAR,
    personal VARCHAR (30),
    observaciones VARCHAR (100),
    id_clientes INT,
    id_tipos_ventas INT,
    CONSTRAINT fk_clientes_cotizaciones FOREIGN KEY (id_clientes) REFERENCES clientes (id),
    CONSTRAINT fk_tipos_ventas_cotizaciones FOREIGN KEY (id_tipos_ventas) REFERENCES tipos_ventas (id)
);

CREATE TABLE clasificaciones (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (20),
    descripcion VARCHAR (100)
);

CREATE TABLE subclasificaciones (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (20),
    descripcion VARCHAR (100),
    id_clasificacion INT,
    CONSTRAINT fk_clasificaciones_subclasificaciones FOREIGN KEY (id_clasificacion) REFERENCES clasificaciones (id)
);

CREATE TABLE productos (
	id INT AUTO_INCREMENT PRIMARY KEY,
    aplicar_instalacion CHAR,
    precio_con_instalacion FLOAT,
    precio_sin_instalacion FLOAT,
    observaciones VARCHAR (100),
    id_subclasificacion INT,
    CONSTRAINT fk_subclasificaciones_productos FOREIGN KEY (id_subclasificacion) REFERENCES subclasificaciones (id)
);

CREATE TABLE productos_cotizaciones (
	id_cotizacion INT,
    id_producto INT,
    cantidad INT,
    base FLOAT,
    altura FLOAT,
    precio_unitario FLOAT,
    importe FLOAT,
    PRIMARY KEY (id_cotizacion, id_producto),
    CONSTRAINT fk_cotizaciones_productos_cotizaciones FOREIGN KEY (id_cotizacion) REFERENCES cotizaciones (id),
    CONSTRAINT fk_productos_productos_cotizaciones FOREIGN KEY (id_producto) REFERENCES productos (id)
);