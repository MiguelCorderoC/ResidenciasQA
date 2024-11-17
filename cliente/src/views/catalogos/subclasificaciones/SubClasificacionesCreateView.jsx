import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function SubClasificacionesCreateView() {
  const [clasificaciones, setClasificaciones] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues: { clasificacion_id: "1" } });

  const onSubmit = async (data) => {
    const { nom_subclasificacion, des_subclasificacion, clasificacion_id } =
      data;
    try {
      await axios.post(
        `${import.meta.env.VITE_DEVICE_IP}/api/subclasificaciones`,
        {
          nom_subclasificacion,
          des_subclasificacion,
          clasificacion_id,
        }
      );
      toast.success("Subclasificacion registrada");
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
      <section className="text-gray-800 bg-gray-50 dark:text-darkMode-font dark:bg-darkMode-fondo h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border dark:bg-darkMode-form dark:border-darkMode-border shadow rounded w-full max-w-2xl flex flex-col gap-3 px-5 py-7"
        >
          <h2 className="text-4xl font-semibold">Registrar subclasificacion</h2>
          <article>
            <label className="font-semibold text-sm">Clasificacion</label>
            <select
              {...register("clasificacion_id")}
              className={`border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white`}
            >
              {clasificaciones.map((item, i) => (
                <option key={i} value={item.id_clasificacion}>
                  {item.nom_clasificacion}
                </option>
              ))}
            </select>
          </article>
          <article>
            <label className="font-semibold text-sm">Nombre</label>
            <input
              type="text"
              {...register("nom_subclasificacion", {
                required: "Campo obligatorio",
              })}
              className={`border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white ${
                errors.nom_subclasificacion && "ring-2 ring-red-500"
              }`}
            />
            {errors.nom_subclasificacion && (
              <span className="text-red-600 text-sm font-bold">
                {errors.nom_subclasificacion.message}
              </span>
            )}
          </article>
          <article>
            <label className="font-semibold text-sm">Descripcion</label>
            <textarea
              {...register("des_subclasificacion")}
              className={`border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white`}
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
