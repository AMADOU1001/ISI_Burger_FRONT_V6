import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import LoadingSpinner from "../components/ui/LoadingSpinner";
const Statistics: React.FC = () => {
  return <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Statistiques
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Visualisez vos statistiques de vente
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <p className="text-gray-500 dark:text-gray-400">
          Contenu des statistiques à venir...
        </p>
      </div>
    </DashboardLayout>;
};
export default Statistics;