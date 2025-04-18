import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../providers/ThemeProvider";
import { checkUserRole } from "../services/authService";
import api from "../lib/axiosMiddleware"

const AdminPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Проверка роли при монтировании
  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const role = await checkUserRole();
        const allowedRoles = ['admin', 'superadmin', 'moderator', 'support'];
        
        if (!role) {
          navigate("/");
          return;
        }
        
        setIsAuthorized(true);
      } catch (error) {
        console.error('Access verification failed:', error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    verifyAccess();
  }, [navigate]);

  // Список вкладок
  const tabs = [
    { id: "dashboard", name: "Дашборд", icon: "📊" },
    { id: "users", name: "Пользователи", icon: "👥" },
    { id: "products", name: "Товары", icon: "🛒" },
    { id: "orders", name: "Заказы", icon: "📦" },
    { id: "chat", name: "Чат", icon: "💬" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Проверка доступа...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Редирект уже произошел
  }

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