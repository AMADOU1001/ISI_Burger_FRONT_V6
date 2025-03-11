import React, { useEffect, useState, createContext, useContext } from "react";
import api from "../utils/api";
import { toast } from "sonner";
interface User {
  id: number;
  name: string;
  email: string;
  role: "client" | "gestionnaire";
}
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: "client" | "gestionnaire") => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await api.get("/user");
          setUser(response.data);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/login", {
        email,
        password
      });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      toast.success("Connexion réussie!");
    } catch (error) {
      toast.error("Échec de la connexion. Vérifiez vos identifiants.");
      throw error;
    }
  };
  const register = async (name: string, email: string, password: string, role: "client" | "gestionnaire") => {
    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
        role
      });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      toast.success("Inscription réussie!");
    } catch (error) {
      toast.error("Échec de l'inscription. Veuillez réessayer.");
      throw error;
    }
  };
  const logout = async () => {
    try {
      await api.post("/logout");
      localStorage.removeItem("token");
      setUser(null);
      toast.success("Déconnexion réussie!");
    } catch (error) {
      toast.error("Erreur lors de la déconnexion.");
      throw error;
    }
  };
  return <AuthContext.Provider value={{
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};