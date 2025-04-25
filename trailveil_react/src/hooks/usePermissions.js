import { useState, useEffect } from 'react';
import { checkUserAccess } from '../services/authService';

export const usePermissions = () => {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyRole = async () => {
      setIsLoading(true);
      const currentRole = await checkUserAccess();
      setRole(currentRole);
      setIsLoading(false);
    };

    verifyRole();
  }, []);

  const isAdmin = () => role === 'admin' || role === 'superadmin';
  const isSupport = () => role === 'support';
  const isModerator = () => role === 'moderator';

  return { 
    role,
    isLoading,
    isAdmin,
    isSupport,
    isModerator,
    hasAccess: (requiredRole) => {
      if (isLoading) return false;
      if (requiredRole === 'admin')  return isAdmin;
      if (requiredRole === 'support') return isSupport();
      return false;
    }
  };
};