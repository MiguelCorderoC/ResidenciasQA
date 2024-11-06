import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function ProductosView() {
  const [productos, setProductos] = useState([]);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/productos`
      );
      setProductos(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener los productos");
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <section className="text-gray-800 bg-gray-50">
      <article className="flex items-center justify-between p-5">
        <h2 className="text-4xl font-semibold">Productos</h2>
        <Link
          to={"/productos/create"}
          className="transition h-10 duration-300 text-white bg-green-800 hover:bg-green-900 font-medium rounded text-sm px-5 py-2.5 text-center"
        >
          Nuevo
        </Link>
      </article>
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-6 py-3 text-left font-semibold">ID</th>
            <th className="px-6 py-3 text-left font-semibold">Nombre</th>
            <th className="px-6 py-3 text-left font-semibold">Instalación</th>
            <th className="px-6 py-3 text-left font-semibold">
              Precio sin instalación
            </th>
            <th className="px-6 py-3 text-left font-semibold">
              Precio con instalación
            </th>
            <th className="px-6 py-3 text-left font-semibold">Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((item) => (
            <tr
              key={item.id}
              className="odd:bg-gray-100 even:bg-slate-200 border-b dark:border-gray-700"
            >
              <td className="px-6 py-3">{item.producto_id}</td>
              <td className="px-6 py-3">{item.subclasificacion_nombre}</td>
              <td className="px-6 py-3">{item.aplicar_instalacion}</td>
              <td className="px-6 py-3">{item.precio_sin_instalacion}</td>
              <td className="px-6 py-3">{item.precio_con_instalacion}</td>
              <td className="px-6 py-3">{item.observaciones}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default ProductosView;
