import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Button from "../components/ui/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import api from "../utils/api";
interface Burger {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
}
const BurgerManagement: React.FC = () => {
  const [burgers, setBurgers] = useState<Burger[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBurger, setCurrentBurger] = useState<Burger | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    stock: ""
  });
  useEffect(() => {
    const fetchBurgers = async () => {
      try {
        setBurgers([{
          id: 1,
          name: "Classic Burger",
          price: 8.99,
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
          description: "Un délicieux burger avec steak de bœuf, salade, tomate et sauce maison",
          stock: 25
        }, {
          id: 2,
          name: "Cheese Burger",
          price: 9.99,
          image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1522&q=80",
          description: "Burger avec steak de bœuf, double cheddar, oignons et sauce spéciale",
          stock: 18
        }, {
          id: 3,
          name: "Veggie Burger",
          price: 10.99,
          image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
          description: "Burger végétarien avec galette de légumes, avocat, tomate et sauce yaourt",
          stock: 12
        }]);
      } catch (error) {
        console.error("Error fetching burgers:", error);
        toast.error("Impossible de charger les burgers");
      } finally {
        setLoading(false);
      }
    };
    fetchBurgers();
  }, []);
  const openModal = (burger: Burger | null = null) => {
    if (burger) {
      setCurrentBurger(burger);
      setFormData({
        name: burger.name,
        price: burger.price.toString(),
        image: burger.image,
        description: burger.description,
        stock: burger.stock.toString()
      });
    } else {
      setCurrentBurger(null);
      setFormData({
        name: "",
        price: "",
        image: "",
        description: "",
        stock: ""
      });
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const burgerData = {
        name: formData.name,
        price: parseFloat(formData.price),
        image: formData.image,
        description: formData.description,
        stock: parseInt(formData.stock)
      };
      if (currentBurger) {
        const updatedBurgers = burgers.map(burger => burger.id === currentBurger.id ? {
          ...burger,
          ...burgerData
        } : burger);
        setBurgers(updatedBurgers);
        toast.success("Burger mis à jour avec succès!");
      } else {
        const newBurger = {
          ...burgerData,
          id: Math.max(...burgers.map(b => b.id), 0) + 1
        };
        setBurgers([...burgers, newBurger as Burger]);
        toast.success("Burger ajouté avec succès!");
      }
      closeModal();
    } catch (error) {
      console.error("Error saving burger:", error);
      toast.error("Erreur lors de l'enregistrement du burger");
    }
  };
  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce burger?")) {
      try {
        setBurgers(burgers.filter(burger => burger.id !== id));
        toast.success("Burger supprimé avec succès!");
      } catch (error) {
        console.error("Error deleting burger:", error);
        toast.error("Erreur lors de la suppression du burger");
      }
    }
  };
  if (loading) {
    return <LoadingSpinner />;
  }
  return <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestion des Burgers
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gérez votre menu de burgers
          </p>
        </div>
        <Button onClick={() => openModal()} variant="primary">
          <PlusIcon size={16} className="mr-2" />
          Ajouter un burger
        </Button>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Nom
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Prix
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {burgers.map(burger => <tr key={burger.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={burger.image} alt={burger.name} className="h-16 w-16 rounded-md object-cover" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {burger.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {burger.price.toFixed(2)} €
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {burger.stock}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {burger.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button variant="secondary" size="sm" onClick={() => openModal(burger)} className="mr-2">
                      <PencilIcon size={16} className="mr-1" />
                      Modifier
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(burger.id)}>
                      <TrashIcon size={16} className="mr-1" />
                      Supprimer
                    </Button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {currentBurger ? "Modifier le burger" : "Ajouter un burger"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nom
                    </label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Prix (€)
                    </label>
                    <input type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Image URL
                    </label>
                    <input type="url" name="image" value={formData.image} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Stock
                    </label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <Button variant="secondary" onClick={closeModal}>
                    Annuler
                  </Button>
                  <Button type="submit" variant="primary">
                    {currentBurger ? "Mettre à jour" : "Ajouter"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>}
    </DashboardLayout>;
};
export default BurgerManagement;