import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { v4 as uuidv4 } from "uuid"; // Instala uuid: npm install uuid

function CotizacionesCreateView() {
  const [id, setId] = useState("*****");
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [tiposVentas, setTiposVentas] = useState([]);
  const [productosForms, setProductosForms] = useState([]);
  const [usarPrecioConIva, setUsarPrecioConIva] = useState(false); // Nuevo estado
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues: { idtpVenta: 1, idCliente: 1 } });
  const auth = useAuth();
  const { displayName, email } = auth.user || {};

  const obtenerClientes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/clientes`
      );
      setClientes(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener clientes");
    }
  };

  const obtenerTiposVentas = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/tipoventa`
      );
      setTiposVentas(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener Tipos de ventas");
    }
  };

  const obtenerProductos = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/producto`
      );
      setProductos(response.data);
    } catch (error) {
      toast.error("Error al obtener productos");
      console.error(error);
    }
  };

  const handleChange = (id, field, value) => {
    setProductosForms((prev) =>
      prev.map((producto) => {
        if (producto.id === id) {
          const updatedProducto = { ...producto, [field]: value };

          // Recalcular el importe
          const base = parseFloat(updatedProducto.prod_base) || 0;
          const altura = parseFloat(updatedProducto.prod_altura) || 0;
          const cantidad = parseFloat(updatedProducto.cantidad) || 0;
          const importe =
            base *
            altura *
            cantidad *
            parseFloat(updatedProducto.precio_Uni || 0);

          return { ...updatedProducto, importe };
        }
        return producto;
      })
    );
  };

  const handleDelete = (id) => {
    setProductosForms((prev) => prev.filter((producto) => producto.id !== id));
  };

  const onSubmit = async (data) => {
    const { idCliente, idtpVenta, fechavigencia, facturar, observaciones } =
      data;

    // Preparar la cotización
    const cotizacion = {
      idCliente,
      idtpVenta,
      fechavigencia,
      facturar: facturar ? "1" : "0",
      personal: displayName,
      observaciones,
      correo_del_personal: email,
      subtotal,
      iva,
      total,
    };

    try {
      // Registrar cotización en el backend
      const response = await axios.post(
        `${import.meta.env.VITE_DEVICE_IP}/api/cotizaciones`,
        cotizacion
      );

      // Obtener ID de la cotización creada
      const cotizacionId = response.data;

      // Agregar productos asociados a la cotización
      await Promise.all(
        productosForms.map((producto) =>
          axios.post(
            `${
              import.meta.env.VITE_DEVICE_IP
            }/api/cotizaciones/producto/${cotizacionId}`,
            {
              idProducto: producto.id_producto,
              cantidad: producto.cantidad,
              base: producto.prod_base,
              altura: producto.prod_altura,
              precioUnitario: producto.precio_Uni,
              importe: producto.importe,
            }
          )
        )
      );

      setId(cotizacionId);
      toast.success("Cotización registrada correctamente.");
    } catch (error) {
      console.error("Error al registrar cotización:", error);
      toast.error("Error al registrar la cotización.");
    }
  };

  const handleAddProductosForms = () => {
    setProductosForms([
      ...productosForms,
      {
        id: uuidv4(),
        id_cotizacion: "",
        id_producto: "",
        cantidad: "",
        prod_base: "",
        prod_altura: "",
        instalacion: false,
        precio_Uni: "",
        importe: "",
      },
    ]);
  };
  const handleTogglePrecio = (id) => {
    setProductosForms((prev) =>
      prev.map((producto) => {
        if (producto.id === id) {
          const instalacion = !producto.instalacion;
          const productoSeleccionado = productos.find(
            (prod) => prod.id_producto.toString() === producto.id_producto
          );

          const precio_Uni = instalacion
            ? productoSeleccionado?.precio_con || 0
            : productoSeleccionado?.precio_sin || 0;

          // Recalcular el importe con el nuevo precio unitario
          const base = parseFloat(producto.prod_base) || 0;
          const altura = parseFloat(producto.prod_altura) || 0;
          const cantidad = parseFloat(producto.cantidad) || 0;
          const importe = base * altura * cantidad * precio_Uni;

          return {
            ...producto,
            instalacion,
            precio_Uni,
            importe,
          };
        }
        return producto;
      })
    );
  };
  const calcularTotales = () => {
    const subtotal = productosForms.reduce(
      (sum, producto) => sum + (parseFloat(producto.importe) || 0),
      0
    );
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    return { subtotal, iva, total };
  };

  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const { subtotal, iva, total } = calcularTotales();
    setSubtotal(subtotal);
    setIva(iva);
    setTotal(total);
  }, [productosForms]);

  const handleProductoChange = (id, value) => {
    const productoSeleccionado = productos.find(
      (prod) => prod.id_producto.toString() === value
    );

    if (productoSeleccionado) {
      setProductosForms((prev) =>
        prev.map((producto) => {
          if (producto.id === id) {
            const precio_Uni = producto.instalacion
              ? productoSeleccionado.precio_con
              : productoSeleccionado.precio_sin;

            return {
              ...producto,
              id_producto: value,
              precio_Uni,
              importe: 0,
            };
          }
          return producto;
        })
      );
    }
  };

  useEffect(() => {
    obtenerClientes();
    obtenerTiposVentas();
    obtenerProductos();
  }, []);
  return (
    <>
      <section className="text-gray-800 bg-gray-50 dark:bg-darkMode-fondo dark:text-darkMode-font h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border shadow rounded w-full max-w-5xl dark:bg-darkMode-form dark:border-darkMode-border flex flex-col gap-3 px-5 py-1"
        >
          <h2 className="text-4xl font-semibold">Cotizacion</h2>
          <article className="flex items-center gap-3">
            <article>
              <label className="font-semibold text-sm">Folio</label>
              <input
                className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                type="text"
                disabled
                value={id}
              />
            </article>
            <article className="flex-grow">
              <label className="font-semibold text-sm">Cliente</label>
              <select
                {...register("idCliente")}
                className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
              >
                {clientes.map((item, i) => (
                  <option key={i} value={item.id_cliente}>
                    {item["Nombre Completo"]}
                  </option>
                ))}
              </select>
            </article>
            <article className="flex-grow">
              <label className="font-semibold text-sm">Tipo de venta</label>
              <select
                {...register("idtpVenta")}
                className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
              >
                {tiposVentas.map((item, i) => (
                  <option key={i} value={item.id_tpVenta}>
                    {item.nom_tpVenta}
                  </option>
                ))}
              </select>
            </article>
            <article className="flex-grow">
              <label className="font-semibold text-sm">Fecha de vigencia</label>
              <input
                type="date"
                {...register("fechavigencia")}
                className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
              />
            </article>
          </article>
          <article className="flex gap-3 justify-end">
            <article className="flex items-center gap-2">
              <label className="font-semibold text-sm">Factura</label>
              <input type="checkbox" {...register("facturar")} />
            </article>
          </article>
          <div className="h-40 border overflow-y-auto p-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400">
            {productosForms.map((items) => (
              <article key={items.id} className="flex gap-5">
                <article className="flex-[2]">
                  <label className="font-semibold text-sm">Producto</label>
                  <select
                    className="border h-7 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={items.id_producto}
                    onChange={(e) =>
                      handleProductoChange(items.id, e.target.value)
                    }
                  >
                    <option value="">Selecciona un producto</option>
                    {productos.map((item) => (
                      <option key={item.id_producto} value={item.id_producto}>
                        {item.nombre_prod}
                      </option>
                    ))}
                  </select>
                </article>
                <article className="flex items-end gap-2">
                  <label className="font-semibold text-sm">Instalacion</label>
                  <input
                    type="checkbox"
                    checked={items.instalacion} // Usa el estado específico del producto
                    onChange={() => handleTogglePrecio(items.id)} // Cambia solo el producto actual
                  />
                </article>
                <article className="flex-1">
                  <label className="font-semibold text-sm">Cantidad</label>
                  <input
                    type="number"
                    className="border h-7 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={items.cantidad}
                    onChange={(e) =>
                      handleChange(items.id, "cantidad", e.target.value)
                    }
                  />
                </article>
                <article className="flex-1">
                  <label className="font-semibold text-sm">Base</label>
                  <input
                    type="number"
                    className="border h-7 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={items.prod_base}
                    onChange={(e) =>
                      handleChange(items.id, "prod_base", e.target.value)
                    }
                  />
                </article>
                <article className="flex-1">
                  <label className="font-semibold text-sm">Altura</label>
                  <input
                    type="number"
                    className="border h-7 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={items.prod_altura}
                    onChange={(e) =>
                      handleChange(items.id, "prod_altura", e.target.value)
                    }
                  />
                </article>
                <article className="flex-1">
                  <label className="font-semibold text-sm">
                    Precio unitario
                  </label>
                  <input
                    type="number"
                    className="border h-7 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={items.precio_Uni}
                    onChange={(e) =>
                      handleChange(items.id, "precio_Uni", e.target.value)
                    }
                    readOnly
                  />
                </article>
                <article className="flex-1">
                  <label className="font-semibold text-sm">Total</label>
                  <input
                    type="number"
                    className="border h-7 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={items.importe}
                    readOnly // El importe es calculado automáticamente
                  />
                </article>
                <article className="flex items-end">
                  <button
                    onClick={() => handleDelete(items.id)}
                    type="button"
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    <MdDelete />
                  </button>
                </article>
              </article>
            ))}
          </div>

          <article className="flex justify-center items-center mt-1">
            <button type="button" onClick={handleAddProductosForms}>
              <FaPlusCircle className="size-6 text-black dark:text-darkMode-font" />
            </button>
          </article>
          <article className="flex gap-2">
            <article className="flex-grow flex flex-col">
              <label className="font-semibold text-sm">Observaciones</label>
              <textarea
                {...register("observaciones")}
                className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white flex-grow min-h-0"
              ></textarea>
            </article>
            <article className="flex flex-col items-end">
              <article>
                <label className="font-semibold text-sm">Total sin IVA</label>
                <input
                  type="text"
                  value={subtotal.toFixed(2)} // Mostrar con dos decimales
                  readOnly
                  className="border h-7 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </article>
              <article>
                <label className="font-semibold text-sm">IVA</label>
                <input
                  type="text"
                  value={iva.toFixed(2)} // Mostrar con dos decimales
                  readOnly
                  className="border h-7 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </article>
              <article>
                <label className="font-semibold text-sm">Total</label>
                <input
                  type="text"
                  value={total.toFixed(2)} // Mostrar con dos decimales
                  readOnly
                  className="border h-7 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </article>
            </article>
          </article>
          <button className="w-full transition duration-300 text-white bg-black font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800">
            Registrar cotizacion
          </button>
        </form>
      </section>
    </>
  );
}

export default CotizacionesCreateView;
