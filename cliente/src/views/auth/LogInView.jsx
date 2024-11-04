import { toast } from "sonner";
import ThemeButton from "../../components/ThemeButton";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function LogInView() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const auth = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await auth.logIn(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Usuario no registrado", {
        description: "Ingrese con un usuario valido ",
      });
    }
  };

  return (
    <>
      <article className="absolute top-5 right-5">
        <ThemeButton />
      </article>
      <section className="bg-gray-50 dark:bg-gray-900 flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 flex flex-col gap-3 border shadow rounded w-full max-w-md px-5 py-7"
        >
          <h2 className="font-semibold text-3xl pb-5">Inicia sesion</h2>
          <article className="space-y-1">
            <label className="font-semibold text-sm">Correo electronico</label>
            <input
              type="email"
              {...register("email", {
                required: "Campo obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                  message: "Ingresa un correo Gmail",
                },
              })}
              className={`border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.email && "ring-2 ring-red-500"
              }`}
            />
            {errors.email && (
              <span className="text-red-600 text-sm font-bold">
                {errors.email.message}
              </span>
            )}
          </article>
          <article className="space-y-1">
            <label className="font-semibold text-sm">Contraseña</label>
            <input
              type="password"
              {...register("password", { required: "Campo obligatorio" })}
              className={`border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.password && "ring-2 ring-red-500"
              }`}
            />
            {errors.password && (
              <span className="text-red-600 text-sm font-bold">
                {errors.password.message}
              </span>
            )}
          </article>
          <article className="w-full text-end">
            <Link className="font-semibold text-sm">Recuperar contraseña</Link>
          </article>
          <button className="w-full transition duration-300 text-white bg-black font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800">
            Iniciar sesion
          </button>
        </form>
      </section>
    </>
  );
}
export default LogInView;
