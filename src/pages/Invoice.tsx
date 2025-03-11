import React from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import LoadingSpinner from "../components/ui/LoadingSpinner";
const Invoice: React.FC = () => {
  const {
    orderId
  } = useParams();
  return <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Facture #{orderId}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Détails de la facture
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <p className="text-gray-500 dark:text-gray-400">
          Contenu de la facture à venir...
        </p>
      </div>
    </DashboardLayout>;
};
export default Invoice;