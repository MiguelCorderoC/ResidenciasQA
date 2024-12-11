import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function OrdenesView() {
  const [ordenes, setOrdenes] = useState([]);
  const [searchText, setSearchText] = useState("");

  const filteredOrdenes = ordenes.filter(
    (item) =>
      item.nom_tpcliente?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.nom_negocio?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.dom_cliente?.toLowerCase().includes(searchText.toLowerCase()) ||
      item["Nombre Completo"]
        ?.toLowerCase()
        .includes(searchText.toLowerCase()) ||
      item.telFJ_cliente?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.correo_cliente?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.RFC_cliente?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.telWP_cliente?.toLowerCase().includes(searchText.toLowerCase())
  );

  const obtenerOrdenes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/ordentrabajo`
      );
      setOrdenes(response.data);
    } catch (error) {
      toast.error("Error al obtener ordenes");
      console.error(error);
    }
  };

  const imprimirOrden = async (id) => {
    try {
      await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/ordentrabajo/imprimir/${id}`
      );
    } catch (error) {
      console.error(error);
      toast.error("Error al generar pdf");
    }
  };

  useEffect(() => {
    obtenerOrdenes();
  }, []);

  return (
    <>
      <section className="min-h-screen text-gray-800 bg-gray-50 dark:bg-darkMode-fondo dark:text-darkMode-font">
        <article className="flex items-center justify-between p-5">
          <h2 className="text-4xl font-semibold">Ordenes</h2>
          <article className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={`border h-8 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-form dark:border-gray-600 dark:text-white`}
            />
            <Link
              to={"/ordenes/create"}
              className="transition h-10 duration-300 text-white bg-green-800 hover:bg-green-900 font-medium rounded text-sm px-5 py-2.5 text-center"
            >
              Nuevo
            </Link>
          </article>
        </article>
        <article className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg text-xs">
            <thead className="text-base">
              <tr className="bg-gray-200 dark:bg-darkMode-form">
                <th className="px-6 py-3 text-left font-semibold">Acciones</th>
                <th className="px-6 py-3 text-left font-semibold">Folio</th>
                <th className="px-6 py-3 text-left font-semibold">Cliente</th>
                <th className="px-6 py-3 text-left font-semibold">Negocio</th>
                <th className="px-6 py-3 text-left font-semibold text-nowrap">
                  Aprobado por
                </th>
                <th className="px-6 py-3 text-left font-semibold">Emitido</th>
                <th className="px-6 py-3 text-left font-semibold text-nowrap">
                  Estado de cobranza
                </th>
                <th className="px-6 py-3 text-left font-semibold text-nowrap">
                  Total de venta
                </th>
                <th className="px-6 py-3 text-left font-semibold">Pago</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrdenes.map((item, i) => (
                <tr
                  key={i}
                  className="odd:bg-gray-100 even:bg-slate-200 border-b dark:border-darkMode-border dark:bg-darkMode-table dark:odd:bg-darkMode-tableOdd"
                >
                  <td className="px-6 py-3">
                    <button
                      onClick={() => {
                        imprimirOrden(item.id_ordenTrabajo);
                      }}
                      className="p-2 rounded bg-red-600 text-white font-semibold"
                    >
                      PDF
                    </button>
                  </td>
                  <td className="px-6 py-3">{item.id_ordenTrabajo}</td>
                  <td className="px-6 py-3">{item["Nombre Completo"]}</td>
                  <td className="px-6 py-3">{item.nom_negocio}</td>
                  <td className="px-6 py-3">{item.correo_pers}</td>
                  <td className="px-6 py-3">
                    {new Date(item.fechaEmision).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-3">{item.nom_estCobranza}</td>
                  <td className="px-6 py-3">{item["Total Venta"]}</td>
                  <td className="px-6 py-3">{item.totalPagado}</td>
                </tr>
              ))}
              {filteredOrdenes.length === 0 && (
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

export default OrdenesView;
