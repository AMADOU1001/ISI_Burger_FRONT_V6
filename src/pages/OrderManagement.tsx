import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import LoadingSpinner from "../components/ui/LoadingSpinner";
const OrderManagement: React.FC = () => {
  return <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Gestion des Commandes
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Gérez vos commandes en cours
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <p className="text-gray-500 dark:text-gray-400">
          Contenu de la gestion des commandes à venir...
        </p>
      </div>
    </DashboardLayout>;
};
export default OrderManagement;