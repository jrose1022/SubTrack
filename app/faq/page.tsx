

import Dashboard from "../(components)/Userdashboard";
import HelpPage from "../(components)/faq";
import React from "react";

export default function Home() {
  return (
    <div
      className="flex h-screen w-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/dashboardBackground.jpg')",
      }}
    >
      {/* Transparent overlay with blur */}
      <div className="absolute inset-0  backdrop-blur-md" />

      {/* Layout container */}
      <div className="relative flex h-full w-full">
        {/* Dashboard - 25vw */}
        <div className="flex-shrink-0 w-[25vw] h-full overflow-y-auto">
          <Dashboard />
        </div>

        {/* UserProfilePage - 75vw */}
        <div className="w-[75vw] h-full overflow-y-auto">
          <HelpPage />
        </div>  
      </div>
    </div>
  );
}
