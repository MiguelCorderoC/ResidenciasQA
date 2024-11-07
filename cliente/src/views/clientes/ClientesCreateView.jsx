import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

function ClientesCreateView() {
  const [id, setId] = useState("*****");
  const [tiposClientes, setTiposClientes] = useState([]);
  const [estadosClientes, setEstadosClientes] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { id_estado_cliente: "1", id_tipo_cliente: "1" },
  });

  const obtenerTiposClientes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/tipos-clientes`
      );
      setTiposClientes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerEstadosClientes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/estados-clientes`
      );
      setEstadosClientes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      constancia_fiscal,
      rfc,
      negocio,
      domicilio,
      telefono_wp,
      telefono_fijo,
      correo,
      id_estado_cliente,
      id_tipo_cliente,
    } = data;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DEVICE_IP}/api/clientes`,
        {
          nombre,
          apellido_paterno,
          apellido_materno,
          constancia_fiscal,
          rfc,
          negocio,
          domicilio,
          telefono_wp,
          telefono_fijo,
          correo,
          id_estado_cliente,
          id_tipo_cliente,
        }
      );
      toast.success("Cliente registrado");
      setId(response.data.id);
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar cliente");
    }
  };

  useEffect(() => {
    obtenerTiposClientes();
    obtenerEstadosClientes();
  }, []);

  return (
    <>
      <section className="text-gray-800 bg-gray-50 dark:bg-gray-900 h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border shadow rounded w-full max-w-4xl flex flex-col gap-3 px-5 py-7"
        >
          <h2 className="text-4xl font-semibold">Registrar cliente</h2>
          <article className="flex justify-between gap-4">
            <article>
              <label className="font-semibold text-sm">ID</label>
              <input
                type="text"
                disabled
                value={id}
                className="border rounded h-10 bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </article>
            <article className="flex gap-5">
              <article>
                <label className="font-semibold text-sm">Tipo de cliente</label>
                <select
                  {...register(" id_tipo_cliente")}
                  className="border rounded h-10 bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {tiposClientes.map((tipoCliente, i) => (
                    <option key={i} value={tipoCliente.id}>
                      {tipoCliente.nombre}
                    </option>
                  ))}
                </select>
              </article>
              <article>
                <label className="font-semibold text-sm">Estado cliente</label>
                <select
                  {...register(" id_estado_cliente")}
                  className="border rounded h-10 bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {estadosClientes.map((estadosClientes, i) => (
                    <option key={i} value={estadosClientes.id}>
                      {estadosClientes.nombre}
                    </option>
                  ))}
                </select>
              </article>
            </article>
          </article>
          <article className="flex gap-2">
            <article className="w-1/4">
              <label className="font-semibold text-sm">Nombre</label>
              <input
                type="text"
                {...register("nombre")}
                className="border rounded h-10 w-full bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </article>
            <article className="flex-grow">
              <label className="font-semibold text-sm">Apellido paterno</label>
              <input
                type="text"
                {...register("apellido_paterno")}
                className="border rounded h-10 w-full bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </article>
            <article className="flex-grow">
              <label className="font-semibold text-sm">Apellido materno</label>
              <input
                type="text"
                {...register("apellido_materno")}
                className="border rounded h-10 w-full bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </article>
          </article>
          <article className="flex gap-2">
            <article className="flex-grow">
              <label className="font-semibold text-sm">Negocio</label>
              <input
                type="text"
                {...register("negocio")}
                className="border rounded h-10 w-full bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </article>
            <article className="flex-grow">
              <label className="font-semibold text-sm">Domicilio</label>
              <input
                type="text"
                {...register("domicilio")}
                className="border rounded h-10 w-full bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </article>
            <article className="w-1/4">
              <label className="font-semibold text-sm">RFC</label>
              <input
                type="text"
                {...register("rfc")}
                className="border rounded h-10 w-full bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </article>
          </article>
          <article className="flex gap-2">
            <article className="flex-grow">
              <label className="font-semibold text-sm">Telefono fijo</label>
              <input
                type="text"
                {...register("telefono_fijo")}
                className="border rounded h-10 w-full bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </article>
            <article className="flex-grow">
              <label className="font-semibold text-sm">Telefono WhatsApp</label>
              <input
                type="text"
                {...register("telefono_wp")}
                className="border rounded h-10 w-full bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </article>
            <article className="w-1/4">
              <label className="font-semibold text-sm">Correo</label>
              <input
                type="text"
                {...register("correo")}
                className="border rounded h-10 w-full bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </article>
          </article>
          <button className="w-full transition duration-300 text-white bg-black font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800">
            Registrar cliente
          </button>
        </form>
      </section>
    </>
  );
}
export default ClientesCreateView;
