import { Link, Outlet } from "react-router-dom";
import { useTheme } from "../../providers/ThemeProvider";

const Layout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Шапка */}
      <header className="p-4 border-b flex justify-between items-center">
        <h1 className="text-xl font-bold">Админ-панель</h1>
        <button onClick={toggleTheme} className="w-auto">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>

      <div className="flex">
        {/* Саидбар */}
        <aside className="w-64 p-4 border-r">
          <nav>
            <Link to="/dashboard" className="block py-2 hover:text-blue-500">Дашборд</Link>
            <Link to="/users" className="block py-2 hover:text-blue-500">Пользователи</Link>
            <Link to="/products" className="block py-2 hover:text-blue-500">Товары</Link>
            <Link to="/chat" className="block py-2 hover:text-blue-500">Чат</Link>
          </nav>
        </aside>

        {/* Контент */}
        <main className="flex-1 p-4">
          <Outlet />  {/* Здесь рендерятся страницы */}
        </main>
      </div>
    </div>
  );
};

export default Layout