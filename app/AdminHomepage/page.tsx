'use client';

import AdminDashboard from "../(components)/Admindashboard";
import AdminUserManagement from "../(components)/AdminUserManagement";
import React from "react";

export default function AdminHomePage() {
  return (
    <div
      className="flex h-screen w-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/BackgroundAuth.jpg')",
        backdropFilter: 'blur(5px)',
      }}
    >
      {/* Sidebar / Dashboard - 25vw */}
      <div className="flex-shrink-0 overflow-y-auto">
        <AdminDashboard />
      </div>

      {/* Main content - 75vw */}
      <div className="flex-1 h-full overflow-y-auto flex flex-col items-center p-6 space-y-6">
        <div className="w-full  max-w-6xl flex flex-col space-y-6">
          {/* User Management */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <AdminUserManagement />
          </div>
        </div>
      </div>
    </div>
  );
}
