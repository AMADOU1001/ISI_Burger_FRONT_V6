import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  withCredentials: true
});
// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// Gestion des erreurs globales
api.interceptors.response.use(response => response, error => {
  if (error.response) {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else if (error.response.status === 403) {
      alert("Vous n'avez pas les autorisations requises.");
    } else if (error.response.status === 404) {
      alert("Ressource non trouvée.");
    } else {
      alert("Une erreur est survenue.");
    }
  }
  return Promise.reject(error);
});
export default api;