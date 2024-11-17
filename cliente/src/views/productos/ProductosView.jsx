import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function ProductosView() {
  const [productos, setProductos] = useState([]);
  const [searchText, setSearchText] = useState("");

  const obtenerProductos = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/producto`
      );
      setProductos(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener los productos");
    }
  };

  const filteredProductos = productos.filter(
    (item) =>
      item.nombre_prod?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.nom_material?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.nom_clasificacion
        ?.toLowerCase()
        .includes(searchText.toLowerCase()) ||
      item.nom_subclasificacion
        ?.toLowerCase()
        .includes(searchText.toLowerCase()) ||
      item.nom_unidad?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.observaciones?.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <section className="min-h-screen text-gray-800 bg-gray-50 dark:bg-darkMode-fondo dark:text-darkMode-font">
      <article className="flex items-center justify-between p-5">
        <h2 className="text-4xl font-semibold">Productos</h2>
        <article className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={`border h-8 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-form dark:border-gray-600 dark:text-white`}
          />
          <Link
            to={"/productos/create"}
            className="transition h-10 duration-300 text-white bg-green-800 hover:bg-green-900 font-medium rounded text-sm px-5 py-2.5 text-center"
          >
            Nuevo
          </Link>
        </article>
      </article>
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg text-xs">
        <thead className="text-base">
          <tr className="bg-gray-200 dark:bg-darkMode-form">
            <th className="px-6 py-3 text-left font-semibold">Nombre</th>
            <th className="px-6 py-3 text-left font-semibold">Instalación</th>
            <th className="px-6 py-3 text-left font-semibold">
              Precio sin instalación
            </th>
            <th className="px-6 py-3 text-left font-semibold">
              Precio con instalación
            </th>
            <th className="px-6 py-3 text-left font-semibold">Observaciones</th>
            <td className="px-6 py-3 text-left font-semibold">Material</td>
            <th className="px-6 py-3 text-left font-semibold">Unidad</th>
            <th className="px-6 py-3 text-left font-semibold">
              Subclasificacion
            </th>
            <th className="px-6 py-3 text-left font-semibold">Clasificacion</th>
          </tr>
        </thead>
        <tbody>
          {filteredProductos.map((item) => (
            <tr
              key={item.id}
              className="odd:bg-gray-100 even:bg-slate-200 border-b dark:border-darkMode-border dark:bg-darkMode-table dark:odd:bg-darkMode-tableOdd"
            >
              <td className="px-6 py-3">{item.nombre_prod}</td>
              <td className="px-6 py-3">{item.apl_inst == 1 ? "Si" : "No"}</td>
              <td className="px-6 py-3">{item.precio_sin}</td>
              <td className="px-6 py-3">{item.precio_con}</td>
              <td className="px-6 py-3">{item.observaciones}</td>
              <td className="px-6 py-3">{item.nom_material}</td>
              <td className="px-6 py-3">{item.nom_unidad}</td>
              <td className="px-6 py-3">{item.nom_subclasificacion}</td>
              <td className="px-6 py-3">{item.nom_clasificacion}</td>
            </tr>
          ))}
          {filteredProductos.length === 0 && (
            <tr className="border-gray-300 border dark:bg-darkMode-form dark:border-darkMode-border">
              <td className="px-6 py-4 text-center" colSpan="9">
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default ProductosView;
