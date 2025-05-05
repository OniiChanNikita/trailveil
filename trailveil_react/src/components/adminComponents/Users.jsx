import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, updateUser } from "../../lib/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useOutletContext } from "react-router-dom";


const Users = () => {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const { userPermissions } = useOutletContext()

  const roleMap = {
    superadmin: 1,
    admin: 2,
    moderator: 3,
    support: 4
  };

  // Загрузка пользователей
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers
  });
  console.log(users)

  const canEditUsers = userPermissions?.includes("manage_users")
  const canEditAdmin = userPermissions?.includes("manage_admins")

  const { mutate } = useMutation({
    mutationFn: (data) => updateUser(data.userId, data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setSelectedUser(null);
    },
    onError: (error) => {
      console.error('Ошибка при обновлении:', error);
    }
  });

  const onSubmit = (data) => {
    const roleId = roleMap[data.role];
    mutate({ userId: selectedUser.id, data: { role: roleId } });
  };


  return (
    <div>
      <h2 className="text-2xl mb-4">Пользователи</h2>
      
      {/* Таблица */}
      <table className="w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="p-3">ID</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.id}</td>
              <td>{user.email}</td>
              <td>{user.role_info?.name}</td>
              
              {(canEditAdmin || (canEditUsers && user.role_info?.name != "superadmin")) &&
                <td>
                  <button 
                    onClick={() => setSelectedUser(user)}
                    className="w-auto bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Редактировать
                  </button>
                </td> 
              }

            </tr>
          ))}
        </tbody>
      </table>

      {/* Модальное окно */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-xl mb-4">Редактировать {selectedUser.email}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="block mb-2">
                Роль:
                <select
                  {...register("role")}
                  defaultValue={selectedUser.role_info.name}
                  className="w-full p-2 border rounded"
                >
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                  <option value="support">Support</option>
                </select>
              </label>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="w-auto bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="w-auto bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users