import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";

function UpdateProfileView() {
  const auth = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { email, displayName, photoURL } = auth.user || {};

  const onSubmit = async (data) => {
    const { name, photo } = data;
    try {
      await auth.updateUserProfile(name, photo);
      toast.success("Informacion actualizada");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar informacion");
    }
  };

  return (
    <>
      <section className="text-gray-800 bg-gray-50 dark:bg-darkMode-fondo h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border dark:border-darkMode-border dark:bg-darkMode-form dark:text-darkMode-font shadow rounded w-full max-w-2xl flex flex-col gap-3 px-5 py-7"
        >
          <h2 className="text-4xl font-semibold">Configurar perfil</h2>
          <article className="flex items-center gap-2">
            <img
              src={photoURL}
              alt="Foto de usuario"
              className="size-20 rounded-full"
            />
            <article className="flex flex-col">
              <span className="font-semibold text-sm">{displayName}</span>
              <span className="font-semibold text-sm">{email}</span>
            </article>
          </article>
          <article>
            <label className="font-semibold text-sm">Nombre de usuario</label>
            <input
              type="text"
              {...register("name", {
                required: "Campo obligatorio",
              })}
              defaultValue={displayName}
              className={`border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white ${
                errors.name && "ring-2 ring-red-500"
              }`}
            />
            {errors.name && (
              <span className="text-red-600 text-sm font-bold">
                {errors.name.message}
              </span>
            )}
          </article>
          <article>
            <label className="font-semibold text-sm">Foto de usuario</label>
            <input
              type="text"
              {...register("photo", {
                required: "Campo obligatorio",
              })}
              defaultValue={photoURL}
              className={`border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white ${
                errors.photo && "ring-2 ring-red-500"
              }`}
            />
            {errors.photo && (
              <span className="text-red-600 text-sm font-bold">
                {errors.photo.message}
              </span>
            )}
          </article>
          <button className="w-full transition duration-300 text-white font-medium rounded text-sm px-5 py-2.5 text-center bg-blue-700 hover:bg-blue-800">
            Actualizar informacion
          </button>
        </form>
      </section>
    </>
  );
}
export default UpdateProfileView;
