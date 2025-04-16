import { useState } from 'react';

const UserSearch = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`/api/users/?search=${searchTerm}`);
    const data = await response.json();
    setUsers(data);
  };

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex mb-2">
        <input
          type="text"
          placeholder="Поиск пользователей..."
          className="w-auto flex-1 p-2 border rounded-l"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          onClick={handleSearch}
          className="w-auto bg-blue-500 text-white px-4 py-2 rounded-r"
        >
          Найти
        </button>
      </div>
      <div className="max-h-40 overflow-y-auto">
        {users.map(user => (
          <div 
            key={user.id}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => onSelect({
              id: `support_${user.id}`,
              participant: user
            })}
          >
            {user.username} (ID: {user.id})
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;