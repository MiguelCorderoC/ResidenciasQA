import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function TiposClientesView() {
  const [tiposclientes, setTiposclientes] = useState([]);
  const [searchText, setSearchText] = useState("");

  const obtenerTiposclientes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/tipocliente`
      );
      setTiposclientes(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener tipos de clientes");
    }
  };

  useEffect(() => {
    obtenerTiposclientes();
  }, []);

  const filteredClientes = tiposclientes.filter((item) =>
    item.nom_tpcliente.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <section>
        <article className="flex items-center justify-between p-5">
          <h2 className="text-4xl font-semibold">Tipos de clientes</h2>
          <article className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border h-8 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <Link
              to={"/tipos-clientes/create"}
              className="transition h-10 duration-300 text-white bg-green-800 hover:bg-green-900 font-medium rounded text-sm px-5 py-2.5 text-center"
            >
              Nuevo
            </Link>
          </article>
        </article>
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 text-left font-semibold">Nombre</th>
              <th className="px-6 py-3 text-left font-semibold">Descripcion</th>
              <th className="px-6 py-3 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.map((item, i) => (
              <tr
                key={i}
                className="odd:bg-gray-100 even:bg-slate-200 border-b dark:border-gray-700"
              >
                <td className="px-6 py-3">{item.nom_tpcliente}</td>
                <td className="px-6 py-3">{item.desc_tpcliente}</td>
                <td className="px-6 py-3">
                  <Link
                    to={`/tipos-clientes/edit/${item.id_tpCliente}`}
                    className="rounded bg-blue-600 text-white p-1 text-sm font-medium"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default TiposClientesView;
