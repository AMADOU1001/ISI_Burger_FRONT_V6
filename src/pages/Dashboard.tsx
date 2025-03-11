import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { ShoppingCartIcon, UsersIcon } from "lucide-react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import api from "../utils/api";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);
const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSales: 0,
    dailyOrders: 0,
    activeCustomers: 0
  });
  // Simulated data for charts
  const salesData = {
    labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
    datasets: [{
      label: "Ventes (€)",
      data: [300, 450, 320, 500, 420, 650, 700],
      borderColor: "rgb(249, 115, 22)",
      backgroundColor: "rgba(249, 115, 22, 0.5)",
      tension: 0.3
    }]
  };
  const monthlySalesData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
    datasets: [{
      label: "Ventes (€)",
      data: [4200, 3800, 5100, 5400, 4800, 5200, 6100, 5700, 6300, 5900, 6500, 7200],
      backgroundColor: "rgba(249, 115, 22, 0.8)"
    }]
  };
  const burgerPopularityData = {
    labels: ["Classic", "Cheese", "Bacon", "Vegan", "Spicy"],
    datasets: [{
      label: "Commandes",
      data: [120, 190, 140, 80, 110],
      backgroundColor: ["rgba(255, 99, 132, 0.7)", "rgba(54, 162, 235, 0.7)", "rgba(255, 206, 86, 0.7)", "rgba(75, 192, 192, 0.7)", "rgba(153, 102, 255, 0.7)"],
      borderWidth: 1
    }]
  };
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await api.get('/statistics');
        // setStats(response.data);
        // Simulated data
        setStats({
          totalSales: 12450,
          dailyOrders: 32,
          activeCustomers: 178
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  if (loading) {
    return <LoadingSpinner />;
  }
  return <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tableau de bord
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Bienvenue sur le tableau de bord ISI BURGER
        </p>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center transition-transform hover:scale-[1.02]">
          <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900 mr-4">
            <div size={24} className="text-orange-600 dark:text-orange-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total des ventes
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalSales} €
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center transition-transform hover:scale-[1.02]">
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
            <ShoppingCartIcon size={24} className="text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Commandes du jour
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.dailyOrders}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center transition-transform hover:scale-[1.02]">
          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 mr-4">
            <UsersIcon size={24} className="text-green-600 dark:text-green-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Clients actifs
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.activeCustomers}
            </p>
          </div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Ventes par jour
          </h2>
          <div className="h-64">
            <Line data={salesData} options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: "rgba(156, 163, 175, 0.1)"
                }
              },
              x: {
                grid: {
                  display: false
                }
              }
            }
          }} />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Ventes par mois
          </h2>
          <div className="h-64">
            <Bar data={monthlySalesData} options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: "rgba(156, 163, 175, 0.1)"
                }
              },
              x: {
                grid: {
                  display: false
                }
              }
            }
          }} />
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Burgers les plus populaires
        </h2>
        <div className="h-64 flex justify-center">
          <div style={{
          width: "50%",
          maxWidth: "400px"
        }}>
            <Pie data={burgerPopularityData} options={{
            responsive: true,
            maintainAspectRatio: false
          }} />
          </div>
        </div>
      </div>
    </DashboardLayout>;
};
export default Dashboard;