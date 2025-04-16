import { useQuery } from "@tanstack/react-query";
import StatsCards from "./StatsCards";
import ApexChart from "react-apexcharts";

/*const fetchStats = async () => {
  const res = await fetch("/api/stats/orders?period=weekly");
  return res.json();
};*/

const Dashboard = () => {
  /*const { data, isLoading } = useQuery({ 
    queryKey: ["stats"],
    queryFn: fetchStats
  });*/

  /*if (isLoading) return <div>Загрузка...</div>;*/

  return (
    <div>
      {/*<h2 className="text-2xl mb-4">Дашборд</h2>
      <StatsCards orders={data.orders} revenue={data.revenue} />
      
      <div className="mt-8">
        <ApexChart
          options={{
            chart: { type: "line" },
            xaxis: { categories: data.weekly_stats.dates }
          }}
          series={[{ name: "Заказы", data: data.weekly_stats.counts }]}
          type="line"
          height={350}
        />
      </div>*/}
    </div>
  );
};

export default Dashboard
