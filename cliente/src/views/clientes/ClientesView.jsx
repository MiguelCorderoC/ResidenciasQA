import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function ClientesView() {
  const [clientes, setClientes] = useState([]);

  const obtenerClientes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/clientes`
      );
      setClientes(response.data);
    } catch (error) {
      toast.error("Error al obtener clientes");
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  return (
    <>
      <section className="text-gray-800 bg-gray-50">
        <article className="flex items-center justify-between p-5">
          <h2 className="text-4xl font-semibold">Clientes</h2>
          <Link
            to={"/clientes/create"}
            className="transition h-10 duration-300 text-white bg-green-800 hover:bg-green-900 font-medium rounded text-sm px-5 py-2.5 text-center"
          >
            Nuevo
          </Link>
        </article>
        <article className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-3 text-left font-semibold">ID</th>
                <th className="px-6 py-3 text-left font-semibold">Nombre</th>
                <th className="px-6 py-3 text-left font-semibold">
                  Apellido Paterno
                </th>
                <th className="px-6 py-3 text-left font-semibold">
                  Apellido Materno
                </th>
                <th className="px-6 py-3 text-left font-semibold">
                  Constancia Fiscal
                </th>
                <th className="px-6 py-3 text-left font-semibold">RFC</th>
                <th className="px-6 py-3 text-left font-semibold">Negocio</th>
                <th className="px-6 py-3 text-left font-semibold">Domicilio</th>
                <th className="px-6 py-3 text-left font-semibold">
                  Teléfono WP
                </th>
                <th className="px-6 py-3 text-left font-semibold">
                  Teléfono Fijo
                </th>
                <th className="px-6 py-3 text-left font-semibold">Correo</th>
                <th className="px-6 py-3 text-left font-semibold">
                  Tipo de cliente
                </th>
                <th className="px-6 py-3 text-left font-semibold">
                  Estado de cliente
                </th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((item) => (
                <tr
                  key={item.id}
                  className="odd:bg-gray-100 even:bg-slate-200 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-3">{item.id}</td>
                  <td className="px-6 py-3">{item.nombre}</td>
                  <td className="px-6 py-3">{item.apellido_paterno}</td>
                  <td className="px-6 py-3">{item.apellido_materno}</td>
                  <td className="px-6 py-3">{item.constancia_fiscal}</td>
                  <td className="px-6 py-3">{item.rfc}</td>
                  <td className="px-6 py-3">{item.negocio}</td>
                  <td className="px-6 py-3">{item.domicilio}</td>
                  <td className="px-6 py-3">{item.telefono_wp}</td>
                  <td className="px-6 py-3">{item.telefono_fijo}</td>
                  <td className="px-6 py-3">{item.correo}</td>
                  <td className="px-6 py-3">{item.estado_cliente}</td>
                  <td className="px-6 py-3">{item.tipo_cliente}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
    </>
  );
}

export default ClientesView;
