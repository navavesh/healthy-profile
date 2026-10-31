import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import ChatPage from "./pages/ChatPage";

import DashboardPage from "./pages/DashboardPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProfileSetupPage from "./pages/ProfileSetupPage";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Публичные страницы */}
        <Route path="/" element={<App />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Личный кабинет */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile/setup" element={<ProfileSetupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);