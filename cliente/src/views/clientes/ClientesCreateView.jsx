import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

function ClientesCreateView() {
  const [id, setId] = useState("*****");
  const [tiposClientes, setTiposClientes] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { tpCliente: "1" },
  });

  const obtenerTiposClientes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/tipocliente`
      );
      setTiposClientes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    const {
      nombre,
      apellidopaterno,
      apellidomaterno,
      rutaconstancia,
      rfc,
      nomnegocio,
      domicilio,
      telWP,
      telFJ,
      correo,
      tpCliente,
    } = data;
    console.log(data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DEVICE_IP}/api/clientes`,
        {
          nombre,
          apellidopaterno,
          apellidomaterno,
          rutaconstancia,
          rfc,
          nomnegocio,
          domicilio,
          telWP,
          telFJ,
          correo,
          tpCliente,
        }
      );
      toast.success("Cliente registrado");
      setId(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar cliente");
    }
  };

  useEffect(() => {
    obtenerTiposClientes();
  }, []);

  return (
    <>
      <section className="text-gray-800 bg-gray-50 dark:bg-darkMode-fondo h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border dark:border-darkMode-border dark:bg-darkMode-form dark:text-darkMode-font shadow rounded w-full max-w-4xl flex flex-col gap-3 px-5 py-7"
        >
          <h2 className="text-4xl font-semibold">Registrar cliente</h2>
          <article className="flex justify-between gap-4">
            <article>
              <label className="font-semibold text-sm">ID</label>
              <input
                type="text"
                disabled
                value={id}
                className={`border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white`}
              />
            </article>
            <article className="flex gap-5">
              <article>
                <label className="font-semibold text-sm">Tipo de cliente</label>
                <select
                  {...register("tpCliente")}
                  className={`border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white`}
                >
                  {tiposClientes.map((tipoCliente, i) => (
                    <option key={i} value={tipoCliente.id_tpCliente}>
                      {tipoCliente.nom_tpcliente}
                    </option>
                  ))}
                </select>
              </article>
            </article>
          </article>
          <article className="flex gap-2">
            <article className="flex-grow">
              <label className="font-semibold text-sm">Nombre</label>
              <input
                type="text"
                {...register("nombre", {
                  required: "Campo obligatorio",
                })}
                className={`border h-10 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white ${
                  errors.nombre && "ring-2 ring-red-500"
                }`}
              />
              {errors.nombre && (
                <span className="text-red-600 text-sm font-bold">
                  {errors.nombre.message}
                </span>
              )}
            </article>
            <article className="flex-grow">
              <label className="font-semibold text-sm">Apellido paterno</label>
              <input
                type="text"
                {...register("apellidopaterno", {
                  required: "Campo requerido",
                })}
                className={`border h-10 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white ${
                  errors.apellidopaterno && "ring-2 ring-red-500"
                }`}
              />
              {errors.apellidopaterno && (
                <span className="text-red-600 text-sm font-bold">
                  {errors.apellidopaterno.message}
                </span>
              )}
            </article>
            <article className="flex-grow">
              <label className="font-semibold text-sm">Apellido materno</label>
              <input
                type="text"
                {...register("apellidomaterno", {
                  required: "Campo requerido",
                })}
                className={`border h-10 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white ${
                  errors.apellidomaterno && "ring-2 ring-red-500"
                }`}
              />
              {errors.apellidomaterno && (
                <span className="text-red-600 text-sm font-bold">
                  {errors.apellidomaterno.message}
                </span>
              )}
            </article>
          </article>
          <article className="flex gap-2">
            <article className="flex-grow">
              <label className="font-semibold text-sm">Negocio</label>
              <input
                type="text"
                {...register("nomnegocio", {
                  required: "Campo obligatorio",
                })}
                className={`border h-10 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white ${
                  errors.nomnegocio && "ring-2 ring-red-500"
                }`}
              />
              {errors.nomnegocio && (
                <span className="text-red-600 text-sm font-bold">
                  {errors.nomnegocio.message}
                </span>
              )}
            </article>
            <article className="flex-grow">
              <label className="font-semibold text-sm">Domicilio</label>
              <input
                type="text"
                {...register("domicilio")}
                className={`border h-10 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white ${
                  errors.domicilio && "ring-2 ring-red-500"
                }`}
              />
              {errors.domicilio && (
                <span className="text-red-600 text-sm font-bold">
                  {errors.domicilio.message}
                </span>
              )}
            </article>
            <article className="flex-grow">
              <label className="font-semibold text-sm">RFC</label>
              <input
                type="text"
                {...register("rfc")}
                className={`border h-10 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white ${
                  errors.rfc && "ring-2 ring-red-500"
                }`}
              />
              {errors.rfc && (
                <span className="text-red-600 text-sm font-bold">
                  {errors.rfc.message}
                </span>
              )}
            </article>
          </article>
          <article className="flex gap-2">
            <article className="flex-grow">
              <label className="font-semibold text-sm">Telefono fijo</label>
              <input
                type="text"
                {...register("telFJ")}
                className={`border h-10 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white ${
                  errors.telFJ && "ring-2 ring-red-500"
                }`}
              />
              {errors.telFJ && (
                <span className="text-red-600 text-sm font-bold">
                  {errors.telFJ.message}
                </span>
              )}
            </article>
            <article className="flex-grow">
              <label className="font-semibold text-sm">Telefono WhatsApp</label>
              <input
                type="text"
                {...register("telWP")}
                className={`border h-10 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white ${
                  errors.telWP && "ring-2 ring-red-500"
                }`}
              />
              {errors.telWP && (
                <span className="text-red-600 text-sm font-bold">
                  {errors.telWP.message}
                </span>
              )}
            </article>
            <article className="flex-grow">
              <label className="font-semibold text-sm">Correo</label>
              <input
                type="text"
                {...register("correo", {
                  required: "Campo obligatorio",
                })}
                className={`border h-10 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white ${
                  errors.correo && "ring-2 ring-red-500"
                }`}
              />
              {errors.correo && (
                <span className="text-red-600 text-sm font-bold">
                  {errors.correo.message}
                </span>
              )}
            </article>
          </article>
          <article>
            <label className="font-semibold text-sm">Constancia fiscal</label>
            <input
              type="text"
              {...register("rutaconstancia")}
              className={`border h-10 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white`}
            />
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
