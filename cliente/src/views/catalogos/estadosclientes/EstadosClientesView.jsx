import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function EstadosClientesView() {
  const [estadosClientes, setEstadosClientes] = useState([]);

  const obtenerEstadosClientes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/estados-clientes`
      );
      setEstadosClientes(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener estados de clientes");
    }
  };

  useEffect(() => {
    obtenerEstadosClientes();
  }, []);

  return (
    <>
      <section>
        <article className="flex items-center justify-between p-5">
          <h2 className="text-4xl font-semibold">Estados de clientes</h2>
          <Link
            to={"/estados-clientes/create"}
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
            {estadosClientes.map((item) => (
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
export default EstadosClientesView;
