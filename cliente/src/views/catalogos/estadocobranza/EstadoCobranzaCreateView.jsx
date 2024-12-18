import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function EstadosCobranzaCreateView() {
  const [id, setId] = useState("*****");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { nombre, descripcion } = data;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DEVICE_IP}/api/estatuscobranza`,
        {
          nom_estatus: nombre,
          des_estatus: descripcion,
        }
      );
      setId(response.data.id);
      toast.success("Estado de cobranza registrado");
    } catch (error) {
      toast.error("Error al registrar estado de cobranza");
      console.error(error);
    }
  };

  return (
    <>
      <section className="text-gray-800 bg-gray-50 dark:bg-darkMode-fondo h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border dark:bg-darkMode-form dark:border-darkMode-border dark:text-darkMode-font shadow rounded w-full max-w-2xl flex flex-col gap-3 px-5 py-7"
        >
          <h2 className="text-4xl font-semibold">
            Registrar estado de cobranza
          </h2>
          <article>
            <label className="font-semibold text-sm">ID</label>
            <input
              type="text"
              value={id}
              disabled
              className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </article>
          <article>
            <label className="font-semibold text-sm">Nombre</label>
            <input
              type="text"
              {...register("nombre")}
              className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </article>
          <article>
            <label className="font-semibold text-sm">Descripcion</label>
            <textarea
              {...register("descripcion")}
              className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </article>
          <button className="w-full transition duration-300 text-white bg-black font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800">
            Registrar estado de cobranza
          </button>
        </form>
      </section>
    </>
  );
}
export default EstadosCobranzaCreateView;
