import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";

function ThemeButton() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <button
        className="bg-gray-50 p-1 rounded shadow border dark:text-white dark:bg-gray-800 dark:border-gray-700"
        onClick={handleTheme}
      >
        {theme === "light" ? <FaMoon /> : <MdSunny />}
      </button>
    </>
  );
}

export default ThemeButton;
