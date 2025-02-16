const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  
    useEffect(() => {
      document.body.classList.toggle("light", theme === "light");
      localStorage.setItem("theme", theme);
    }, [theme]);
  
    return (
      <button
        className="px-4 py-2 bg-primary text-white rounded-md shadow-md hover:scale-105 transition"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>
    );
  };
  
  export default ThemeToggle;