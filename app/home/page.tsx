import Dashboard from "../(components)/Userdashboard";
import UserProfilePage from "../(components)/UserProfilePage";
import React from "react";

export default function Home() {
  return (
    <div
      className="flex h-screen w-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/dashboardBackground.jpg')",
        backgroundColor: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(5px)',
      }}
    >
      {/* Dashboard - 25vw */}
      <div className="flex-shrink-0 w-[25vw] h-full overflow-y-auto">
        <Dashboard />
      </div>

      {/* UserProfilePage - 75vw */}
      <div className="w-[75vw] h-full overflow-y-auto">
        <UserProfilePage />
      </div>
    </div>
  );
}
