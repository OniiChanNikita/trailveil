import { useSelector } from "react-redux";

export const useAuth = () => {
  const user = useSelector(state => state.auth.user); // Предполагаем, что роль хранится в Redux
  
  const isAdmin = user?.role === "admin" || user?.role === "superadmin";
  const canEditProducts = isAdmin || user?.role === "moderator";

  return { isAdmin, canEditProducts };
};