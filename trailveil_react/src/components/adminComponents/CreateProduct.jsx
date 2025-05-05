import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../lib/api"; // допустим, у тебя есть такой API-метод

const CreateProduct = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createProduct({
        title,
        price: parseFloat(price),
        availability,
      });
      navigate("/admin/products"); // после создания перекидываем на список товаров
    } catch (err) {
      setError(err.message || "Ошибка при создании товара");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Создать товар</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Название</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-2 border rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Цена</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="p-2 border rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={availability}
            onChange={(e) => setAvailability(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="font-semibold">В наличии</label>
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
        >
          {loading ? "Создание..." : "Создать товар"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
