import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../providers/ThemeProvider";
import { checkUserAccess } from "../services/authService"; // заменили функцию

const AdminPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userPermissions, setUserPermissions] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Таб с нужным permission
  const tabs = [
    { id: "dashboard", name: "Дашборд", icon: "📊", permission: null },
    { id: "users", name: "Пользователи", icon: "👥", permission: "manage_users" },
    { id: "products", name: "Товары", icon: "🛒", permission: "manage_products" },
    { id: "orders", name: "Заказы", icon: "📦", permission: "manage_orders" },
    { id: "chat", name: "Чат", icon: "💬", permission: "reply_messages" },
  ];

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const { role, permissions } = await checkUserAccess();
        console.log(role, permissions)  
        const allowedRoles = ["superadmin", "admin", "moderator", "support"];

        if (!allowedRoles.includes(role.name)) {
          navigate("/");
          return;
        }
        
        setUserPermissions(permissions.map(item => item.code));
        setIsAuthorized(true);
      } catch (error) {
        console.error("Access verification failed:", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    verifyAccess();
  }, [navigate]);

  const hasPermission = (permission) => {
    return !permission || userPermissions.includes(permission);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Проверка доступа...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Боковая панель */}
      <aside className="w-64 p-4 border-r bg-white dark:bg-gray-800">
        <h1 className="text-xl font-bold mb-6">Админ-панель</h1>

        <nav>
          {tabs.filter(tab => hasPermission(tab.permission)).map((tab) => (
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
        <Outlet context={{ userPermissions }} /> {/* пробрасываем дальше */}
      </main>
    </div>
  );
};

export default AdminPage;
