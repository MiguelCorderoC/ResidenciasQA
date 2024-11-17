import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function SubclasificacionesView() {
  const [subclasificaciones, setSubclasificaciones] = useState([]);
  const [searchText, setSearchText] = useState("");

  const obtenerSubclasificaciones = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/subclasificaciones`
      );
      setSubclasificaciones(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener subclasificaciones");
    }
  };

  useEffect(() => {
    obtenerSubclasificaciones();
  }, []);

  const filteredClientes = subclasificaciones.filter((item) =>
    item.nom_subclasificacion?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <section className="min-h-screen text-gray-800 bg-gray-50 dark:bg-darkMode-fondo dark:text-darkMode-font">
        <article className="flex items-center justify-between p-5">
          <h2 className="text-4xl font-semibold">Subclasificaciones</h2>
          <article className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={`border h-8 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-form dark:border-gray-600 dark:text-white`}
            />
            <Link
              to={"/subclasificaciones/create"}
              className="transition h-10 duration-300 text-white bg-green-800 hover:bg-green-900 font-medium rounded text-sm px-5 py-2.5 text-center"
            >
              Nuevo
            </Link>
          </article>
        </article>
        <article className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg text-xs">
            <thead className="text-base">
              <tr className="bg-gray-200 dark:bg-darkMode-form">
                <th className="px-6 py-3 text-left font-semibold">Nombre</th>
                <th className="px-6 py-3 text-left font-semibold">
                  Descripcion
                </th>
                <th className="px-6 py-3 text-left font-semibold">
                  Clasificacion
                </th>
                <th className="px-6 py-3 text-left font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((item, i) => (
                <tr
                  key={i}
                  className="odd:bg-gray-100 even:bg-slate-200 border-b dark:border-darkMode-border dark:bg-darkMode-table dark:odd:bg-darkMode-tableOdd"
                >
                  <td className="px-6 py-3">{item.nom_subclasificacion}</td>
                  <td className="px-6 py-3">{item.desc_subclasificacion}</td>
                  <td className="px-6 py-3">Nombre de clasificacion</td>
                  <td className="px-6 py-3">
                    <Link
                      to={`/subclasificaciones/edit/${item.id_material}`}
                      className="rounded bg-blue-600 text-white p-1 text-sm font-medium"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredClientes.length === 0 && (
                <tr className="border-gray-300 border dark:bg-darkMode-form dark:border-darkMode-border">
                  <td className="px-6 py-4 text-center" colSpan="9">
                    No se encontraron resultados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </article>
      </section>
    </>
  );
}

export default SubclasificacionesView;
