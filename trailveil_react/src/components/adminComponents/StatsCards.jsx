const StatsCards = ({ orders, revenue }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3>Заказы</h3>
        <p className="text-2xl">{orders}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3>Доход</h3>
        <p className="text-2xl">${revenue}</p>
      </div>
    </div>
  );
};

export default StatsCards