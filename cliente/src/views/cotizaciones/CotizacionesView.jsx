import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function CotizacionesView() {
  const [cotizaciones, setCotizaciones] = useState([]);

  const obtenerCotizaciones = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/cotizaciones`
      );
      setCotizaciones(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener cotizaciones");
    }
  };

  useEffect(() => {
    obtenerCotizaciones();
  }, []);

  return (
    <>
      <section className="text-gray-800 bg-gray-50">
        <article className="flex items-center justify-between p-5">
          <h2 className="text-4xl font-semibold">Cotizaciones</h2>
          <Link
            to={"/cotizaciones/create"}
            className="transition h-10 duration-300 text-white bg-green-800 hover:bg-green-900 font-medium rounded text-sm px-5 py-2.5 text-center"
          >
            Nuevo
          </Link>
        </article>
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 text-left font-semibold">ID</th>
              <th className="px-6 py-3 text-left font-semibold">Negocio</th>
              <th className="px-6 py-3 text-left font-semibold">Cliente</th>
              <th className="px-6 py-3 text-left font-semibold">Emision</th>
              <th className="px-6 py-3 text-left font-semibold">Vigencia</th>
              <th className="px-6 py-3 text-left font-semibold">Estado</th>
              <th className="px-6 py-3 text-left font-semibold">Factura</th>
              <th className="px-6 py-3 text-left font-semibold">Personal</th>
              <th className="px-6 py-3 text-left font-semibold">
                Observaciones
              </th>
              <th className="px-6 py-3 text-left font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {cotizaciones.map((item) => (
              <tr
                key={item.id}
                className="odd:bg-gray-100 even:bg-slate-200 border-b dark:border-gray-700"
              >
                <td className="px-6 py-3">{item.cotizacion_id}</td>
                <td className="px-6 py-3">{item.cliente_negocio}</td>
                <td className="px-6 py-3">{item.cliente_nombre}</td>
                <td className="px-6 py-3">
                  {new Date(item.fecha_emision).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-3">
                  {new Date(item.fecha_vigencia).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-3">{item.estado}</td>
                <td className="px-6 py-3">{item.factura}</td>
                <td className="px-6 py-3">{item.personal}</td>
                <td className="px-6 py-3">{item.observaciones}</td>
                <td className="px-6 py-3">${item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
export default CotizacionesView;
