import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { toast } from "sonner";
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
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
            Connexion à votre compte
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input type="email" id="email" name="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" required />
          <Input type="password" id="password" name="password" label="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember" type="checkbox" className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Se souvenir de moi
              </label>
            </div>
            <a href="#" className="text-sm text-orange-500 hover:underline">
              Mot de passe oublié?
            </a>
          </div>
          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? <div className="flex items-center justify-center">
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Connexion...
              </div> : "Se connecter"}
          </Button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Pas encore de compte?{" "}
            <Link to="/register" className="text-orange-500 hover:underline font-medium">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>;
};
export default Login;