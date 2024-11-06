import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

function CotizacionesCreateView() {
  const [id, setId] = useState("*****");
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [tiposVentas, setTiposVentas] = useState([]);
  const [productosForms, setProductosForms] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues: { id_tipos_ventas: "1", id_clientes: "1" } });
  const auth = useAuth();
  const { displayName } = auth.user || {};

  const handleAddProductosForms = () => {
    setProductosForms([
      ...productosForms,
      {
        id: productosForms.length + 1,
        content: `Artículo ${productosForms.length + 1}`,
      },
    ]);
  };

  const obtenerProductoId = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/productos/${id}`
      );
    } catch (error) {
      toast.error("Error al obtener Producto por id");
      console.error(error);
    }
  };

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
        `${import.meta.env.VITE_DEVICE_IP}/api/tipos-ventas`
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
        `${import.meta.env.VITE_DEVICE_IP}/api/productos`
      );
      setProductos(response.data);
    } catch (error) {
      toast.error("Error al obtener productos");
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    const updatedForms = productosForms.filter((item) => item.id !== id);
    setProductosForms(updatedForms);
  };

  const onSubmit = async (data) => {
    const {
      subtotal,
      iva,
      total,
      fecha_vigencia,
      estado,
      factura,
      observaciones,
      id_clientes,
      id_tipos_ventas,
    } = data;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DEVICE_IP}/api/cotizaciones`,
        {
          p_subtotal: subtotal,
          p_iva: iva,
          p_total: total,
          p_fecha_vigencia: fecha_vigencia,
          p_factura: factura ? "Y" : "N",
          p_estado: estado ? "Y" : "N",
          p_personal: displayName,
          p_observaciones: observaciones,
          p_id_clientes: id_clientes,
          p_id_tipos_ventas: id_tipos_ventas,
        }
      );
      console.log(data);
      setId(response.data.id);
      toast.success("Cotizacion registrada");
    } catch (error) {
      toast.error("Error al registrar cotizacion");
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerClientes();
    obtenerTiposVentas();
    obtenerProductos();
  }, []);
  return (
    <>
      <section className="text-gray-800 bg-gray-50 dark:bg-gray-900 h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border shadow rounded w-full max-w-5xl flex flex-col px-5 gap-3 pb-2"
        >
          <h2 className="text-4xl font-semibold">Cotizacion</h2>
          <article className="flex items-center gap-3">
            <article>
              <label className="font-semibold text-sm">ID</label>
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
                {...register("id_clientes")}
                className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
              >
                {clientes.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.nombre + " " + item.apellido_paterno}
                  </option>
                ))}
              </select>
            </article>
            <article className="flex-grow">
              <label className="font-semibold text-sm">Tipo de venta</label>
              <select
                {...register("id_tipos_ventas")}
                className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
              >
                {tiposVentas.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </select>
            </article>
            <article className="flex-grow">
              <label className="font-semibold text-sm">Fecha de vigencia</label>
              <input
                type="date"
                {...register("fecha_vigencia")}
                className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
              />
            </article>
          </article>
          <article className="flex gap-3 justify-end">
            <article className="flex items-center gap-2">
              <label className="font-semibold text-sm">Factura</label>
              <input type="checkbox" {...register("factura")} />
            </article>
            <article className="flex items-center gap-2">
              <label className="font-semibold text-sm">Estado</label>
              <input type="checkbox" {...register("estado")} />
            </article>
          </article>
          <div className="h-40 border overflow-y-auto p-1">
            {productosForms.map((items) => (
              <article key={items.id} className="flex gap-5">
                <article className="flex-[2]">
                  <label className="font-semibold text-sm">Producto</label>
                  <select className="border h-7 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {productos.map((item, i) => (
                      <option key={i} value={item.producto_id}>
                        {item.subclasificacion_nombre}
                      </option>
                    ))}
                  </select>
                </article>
                <article className="flex-1">
                  <label className="font-semibold text-sm">Cantidad</label>
                  <input
                    type="number"
                    className="border h-7 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </article>
                <article className="flex-1">
                  <label className="font-semibold text-sm">Base</label>
                  <input
                    type="number"
                    className="border h-7 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </article>
                <article className="flex-1">
                  <label className="font-semibold text-sm">Altura</label>
                  <input
                    type="number"
                    className="border h-7 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </article>
                <article className="flex items-center gap-2">
                  <label className="font-semibold text-sm">Instalacion</label>
                  <input type="checkbox" />
                </article>
                <article className="flex-1">
                  <label className="font-semibold text-sm">
                    Precio unitario
                  </label>
                  <input
                    type="number"
                    className="border h-7 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </article>
                <article className="flex-1">
                  <label className="font-semibold text-sm">Total</label>
                  <input
                    type="number"
                    className="border h-7 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
              <FaPlusCircle className="size-6 text-black" />
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
                  {...register("subtotal")}
                  className="border h-7 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </article>
              <article>
                <label className="font-semibold text-sm">IVA</label>
                <input
                  type="text"
                  {...register("iva")}
                  className="border h-7 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </article>
              <article>
                <label className="font-semibold text-sm">Total</label>
                <input
                  type="text"
                  {...register("total")}
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
