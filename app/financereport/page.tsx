'use client';

import AdminDashboard from "../(components)/Admindashboard";
import AdminFinancialReport from "../(components)/AdminFinancialReport";
import React from "react";  

export default function AdminHomePage() {
  return (
    <div
      className="flex h-screen w-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/dashboardBackground.jpg')",
        backdropFilter: 'blur(5px)',
      }}
    >

      <div className="flex-shrink-0  overflow-y-auto">
        <AdminDashboard />
      </div>

      {/* Main content - 75vw */}
      <div className="flex-1 h-full overflow-y-auto flex flex-col items-center p-6 space-y-6">
        <div className="w-full sm:w-[75vw] max-w-6xl flex flex-col space-y-6">
          {/* User Management */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <AdminFinancialReport />
          </div>
        </div>
      </div>
    </div>
  );
}
