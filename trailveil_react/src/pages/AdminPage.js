import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../providers/ThemeProvider";

const AdminPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Список вкладок
  const tabs = [
    { id: "dashboard", name: "Дашборд", icon: "📊" },
    { id: "users", name: "Пользователи", icon: "👥" },
    { id: "products", name: "Товары", icon: "🛒" },
    { id: "orders", name: "Заказы", icon: "📦" },
    { id: "chat", name: "Чат", icon: "💬" },
  ];

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Боковая панель */}
      <aside className="w-64 p-4 border-r bg-white dark:bg-gray-800">
        <h1 className="text-xl font-bold mb-6">Админ-панель</h1>
        
        <nav>
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={`/admin/${tab.id}`}
              className={`flex items-center p-3 rounded-lg mb-2 ${activeTab === tab.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={toggleTheme}
          className="mt-6 p-2 rounded-full bg-gray-200 dark:bg-gray-700 w-auto"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </aside>

      {/* Основной контент */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPage;