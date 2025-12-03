"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import Dashboard from "../(components)/Userdashboard";
import Settings from "../(components)/Settings";

export default function Home() {


  return (
    <div
      className="flex h-screen w-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/dashboardBackground.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-md" />

      <div className="relative flex h-full w-full">
        {/* Dashboard - 25vw */}
        <div className="flex-shrink-0 w-[25vw] h-full overflow-y-auto">
          <Dashboard />
        </div>

        {/* Profile - 75vw */}
        <div className="w-[75vw] h-full overflow-y-auto">
         <Settings />
        </div>
      </div>
    </div>
  );
}
