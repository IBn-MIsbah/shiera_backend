import React, { useEffect } from "react";
import { logout } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const navigate = useNavigate();

  useEffect(() => {
    async function performLogout() {
      try {
        await logout();
        localStorage.removeItem("token");
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
        navigate("/");
      }
    }

    performLogout();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800">Logging out...</h2>
        <p className="text-gray-600 mt-2">
          Please wait while we securely sign you out
        </p>
      </div>
    </div>
  );
}
