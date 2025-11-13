import Dashboard from "../(components)/dashboard";
import React from "react";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/dashboardBackground.jpg')",
        backgroundColor: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(5px)'
      }}>
      <Dashboard />
    </div>
  );
}
