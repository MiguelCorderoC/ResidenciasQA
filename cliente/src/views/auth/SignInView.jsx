import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

function SignInView() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const auth = useAuth();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await auth.register(email, password);
    } catch (error) {
      toast.error("Error al crear el nuevo usuario");
      console.error(error);
    }
  };

  return (
    <>
      <section className="text-gray-800 bg-gray-50 dark:bg-gray-900 h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border shadow rounded w-full max-w-2xl flex flex-col gap-3 px-5 py-7"
        >
          <h2 className="text-4xl font-semibold">Crear nuevo usuario</h2>
          <article>
            <label className="font-semibold text-sm">Correo electronico</label>
            <input
              type="email"
              {...register("email")}
              className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </article>
          <article>
            <label className="font-semibold text-sm">Contraseña</label>
            <input
              type="text"
              {...register("password")}
              className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </article>
          <button className="w-full transition duration-300 text-white bg-black font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800">
            Crear usuario
          </button>
        </form>
      </section>
    </>
  );
}
export default SignInView;
