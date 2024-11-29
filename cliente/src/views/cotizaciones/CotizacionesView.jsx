import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import CotizacionesPDF from "../../components/CotizacionesPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FaCheckCircle, FaPrint } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { BsFillPersonCheckFill } from "react-icons/bs";

function CotizacionesView() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [productos, setProductos] = useState([]);
  const auth = useAuth();
  const { email, displayName } = auth.user || {};

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

  const obtenerProductos = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/prodcot`
      );
      setProductos(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener productos");
    }
  };

  useEffect(() => {
    obtenerCotizaciones();
    obtenerProductos();
  }, []);

  const filteredCotizaciones = cotizaciones.filter(
    (item) =>
      item["Nombre Completo"]
        ?.toLowerCase()
        .includes(searchText.toLowerCase()) ||
      item.nom_tpVenta?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.fechaEmision?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.fechaVigencia?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.personal?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.correo_pers?.toLowerCase().includes(searchText.toLowerCase())
  );

  const aprobarCotizacion = (id) => {
    try {
      toast.info("Seguro que desea aprobar la cotizacion " + id, {
        action: {
          label: "Aceptar",
          onClick: async () => {
            try {
              await axios.post(
                `${import.meta.env.VITE_DEVICE_IP}/api/ordentrabajo/${id}`,
                {
                  correo: email,
                  personalaceptado: displayName,
                }
              );
              toast.success("Cotizacion aprobada");
            } catch (error) {
              console.error(error);
              toast.error("Error al agregar cotizacion");
            }
          },
        },
        duration: Infinity,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error al aprobar cotizacion");
    }
  };

  return (
    <>
      <section className="min-h-screen text-gray-800 bg-gray-50 dark:bg-darkMode-fondo dark:text-darkMode-font">
        <article className="flex items-center justify-between p-5">
          <h2 className="text-4xl font-semibold">Cotizaciones</h2>
          <article className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={`border h-8 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-form dark:border-gray-600 dark:text-white`}
            />
            <Link
              to={"/cotizaciones/create"}
              className="transition h-10 duration-300 text-white bg-green-800 hover:bg-green-900 font-medium rounded text-sm px-5 py-2.5 text-center"
            >
              Nuevo
            </Link>
          </article>
        </article>
        <div className="overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg text-xs">
            <thead className="text-base">
              <tr className="bg-gray-200 dark:bg-darkMode-form">
                <th className="px-6 py-3 text-left font-semibold">Acciones</th>
                <th className="px-6 py-3 text-left font-semibold">Folio</th>
                <th className="px-6 py-3 text-left font-semibold">Cliente</th>
                <th className="px-6 py-3 text-left font-semibold">Negocio</th>
                <th className="px-6 py-3 text-left font-semibold">Tipo</th>
                <th className="px-6 py-3 text-left font-semibold">Emision</th>
                <th className="px-6 py-3 text-left font-semibold">Vigencia</th>
                <th className="px-6 py-3 text-left font-semibold">Estado</th>
                <th className="px-6 py-3 text-left font-semibold">Factura</th>
                <th className="px-6 py-3 text-left font-semibold">Personal</th>
                <th className="px-6 py-3 text-left font-semibold">Correo</th>
                <th className="px-6 py-3 text-left font-semibold">
                  Observaciones
                </th>
                <th className="px-6 py-3 text-left font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredCotizaciones.map((item, i) => (
                <tr
                  key={i}
                  className="odd:bg-gray-100 even:bg-slate-200 border-b dark:border-darkMode-border dark:bg-darkMode-table dark:odd:bg-darkMode-tableOdd"
                >
                  <td className="px-6 py-3 flex items-center gap-2">
                    <PDFDownloadLink
                      document={
                        <CotizacionesPDF
                          fechaEmision={new Date(
                            item.fechaEmision
                          ).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                          fechaVigencia={new Date(
                            item.fechaVigencia
                          ).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                          cliente={item["Nombre Completo"]}
                          negocio={item.nom_negocio}
                          totalSinIva={item.subTotal}
                          iva={item.iva}
                          total={item.total}
                          personal={item.personal}
                          productos={productos.filter(
                            (producto) =>
                              producto.id_cotizacion === item.id_cotizacion
                          )}
                        />
                      }
                      fileName={
                        "cotizacion-" +
                        item.id_cotizacion +
                        "-" +
                        item.nom_negocio +
                        ".pdf"
                      }
                      className="transition duration-300 text-gray-200 bg-orange-700 hover:bg-orange-800 font-medium rounded text-sm px-2 py-1.5 text-center"
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? "Generando PDF..." : <FaPrint />
                      }
                    </PDFDownloadLink>
                    {item.estatus === 0 ? (
                      <button
                        onClick={() => {
                          aprobarCotizacion(item.id_cotizacion);
                        }}
                        className="transition duration-300 text-gray-200 bg-blue-700 hover:bg-blue-800 font-medium rounded text-sm px-2 py-1.5 text-center"
                      >
                        <FaCheckCircle />
                      </button>
                    ) : (
                      <button
                        disabled
                        className="transition duration-300 text-gray-200 bg-green-700 hover:bg-green-800 font-medium rounded text-sm px-2 py-1.5 text-center"
                      >
                        <BsFillPersonCheckFill />
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-3">{item.id_cotizacion}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {item["Nombre Completo"]}
                  </td>
                  <td className="px-6 py-3">{item.nom_negocio}</td>
                  <td className="px-6 py-3">{item.nom_tpVenta}</td>
                  <td className="px-6 py-3">
                    {new Date(item.fechaEmision).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-3">
                    {new Date(item.fechaVigencia).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {item.estatus == "0" ? "Sin aprobar" : "Aprobado"}
                  </td>
                  <td className="px-6 py-3">
                    {item.factura == 1 ? "Si" : "No"}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {item.personal}
                  </td>
                  <td className="px-6 py-3">{item.correo_pers}</td>
                  <td className="px-6 py-3">{item.observacion}</td>
                  <td className="px-6 py-3">${item.total}</td>
                </tr>
              ))}
            </tbody>
            {filteredCotizaciones.length === 0 && (
              <tr className="border-gray-300 border dark:bg-darkMode-form dark:border-darkMode-border">
                <td className="px-6 py-4 text-center" colSpan="9">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </table>
        </div>
      </section>
    </>
  );
}
export default CotizacionesView;
