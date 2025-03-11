import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { toast } from "sonner";
const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"client" | "gestionnaire">("client");
  const [loading, setLoading] = useState(false);
  const {
    register
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password, role);
      navigate("/dashboard");
    } catch (error) {
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };
  return <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-800 p-6 space-y-6 animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            ISI BURGER
          </h1>
          <p className="text-sm font-medium text-orange-500">
            Créer un nouveau compte
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input type="text" id="name" name="name" label="Nom complet" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required />
          <Input type="email" id="email" name="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" required />
          <Input type="password" id="password" name="password" label="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          <div className="mb-4">
            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Rôle <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input type="radio" id="client" name="role" value="client" checked={role === "client"} onChange={() => setRole("client")} className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500" />
                <label htmlFor="client" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Client
                </label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="gestionnaire" name="role" value="gestionnaire" checked={role === "gestionnaire"} onChange={() => setRole("gestionnaire")} className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500" />
                <label htmlFor="gestionnaire" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Gestionnaire
                </label>
              </div>
            </div>
          </div>
          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? <div className="flex items-center justify-center">
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Inscription...
              </div> : "S'inscrire"}
          </Button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Vous avez déjà un compte?{" "}
            <Link to="/login" className="text-orange-500 hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>;
};
export default Register;