import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function ClasificacionesView() {
  const [clasificaciones, setClasificaciones] = useState([]);

  const obtenerClasificaciones = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/clasificaciones`
      );
      setClasificaciones(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener clasificaciones");
    }
  };

  useEffect(() => {
    obtenerClasificaciones();
  }, []);

  return (
    <>
      <section>
        <article className="flex items-center justify-between p-5">
          <h2 className="text-4xl font-semibold">Clasificaciones</h2>
          <Link
            to={"/clasificaciones/create"}
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
              <th className="px-6 py-3 text-left font-semibold">Descripcion</th>
            </tr>
          </thead>
          <tbody>
            {clasificaciones.map((item) => (
              <tr
                key={item.id}
                className="odd:bg-gray-100 even:bg-slate-200 border-b dark:border-gray-700"
              >
                <td className="px-6 py-3">{item.id}</td>
                <td className="px-6 py-3">{item.nombre}</td>
                <td className="px-6 py-3">{item.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
export default ClasificacionesView;
