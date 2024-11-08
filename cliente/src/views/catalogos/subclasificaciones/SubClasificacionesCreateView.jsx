import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function SubClasificacionesCreateView() {
  const [id, setId] = useState("*****");
  const [clasificaciones, setClasificaciones] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { nombre, descripcion, clasificacion_id } = data;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DEVICE_IP}/api/subclasificaciones`,
        {
          nombre,
          descripcion,
          clasificacion_id,
        }
      );
      setId(response.data.id);
      toast.success("Clasificacion registrada");
    } catch (error) {
      toast.error("Error al registrar clasificacion");
      console.error(error);
    }
  };

  const obtenerClasificaciones = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/clasificaciones`
      );
      setClasificaciones(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerClasificaciones();
  }, []);

  return (
    <>
      <section className="text-gray-800 bg-gray-50 dark:bg-gray-900 h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border shadow rounded w-full max-w-2xl flex flex-col gap-3 px-5 py-7"
        >
          <h2 className="text-4xl font-semibold">Registrar subclasificacion</h2>
          <article className="flex items-center gap-3">
            <article className="w-1/4">
              <label className="font-semibold text-sm">ID</label>
              <input
                type="text"
                value={id}
                disabled
                className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </article>
            <article className="flex-grow">
              <label className="font-semibold text-sm">Clasificacion</label>
              <select
                {...register("clasificacion_id")}
                className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {clasificaciones.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </select>
            </article>
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
            Registrar subclasificacion
          </button>
        </form>
      </section>
    </>
  );
}
export default SubClasificacionesCreateView;
