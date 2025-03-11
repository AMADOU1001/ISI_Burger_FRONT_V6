import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BurgerManagement from "./pages/BurgerManagement";
import OrderManagement from "./pages/OrderManagement";
import Statistics from "./pages/Statistics";
import Invoice from "./pages/Invoice";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "sonner";
export function App() {
  return <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>} />
            <Route path="/burgers" element={<ProtectedRoute>
                  <BurgerManagement />
                </ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute>
                  <OrderManagement />
                </ProtectedRoute>} />
            <Route path="/statistics" element={<ProtectedRoute>
                  <Statistics />
                </ProtectedRoute>} />
            <Route path="/invoice/:orderId" element={<ProtectedRoute>
                  <Invoice />
                </ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>;
}