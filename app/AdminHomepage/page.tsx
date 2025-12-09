import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

import AdminDashboard from "../(components)/Admindashboard";
import AdminUserManagement from "../(components)/AdminUserManagement";

export default async function AdminHomePage() {
  // FIX: Add await
  

  // --- IF ADMIN, RENDER THE PAGE ---
  return (
    <div
      className="flex h-screen w-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/dashboardBackground.jpg')",
        backdropFilter: "blur(5px)",
      }}
    >
      <div className="flex-shrink-0 overflow-y-auto">
        <AdminDashboard />
      </div>

      <div className="flex-1 h-full overflow-y-auto flex flex-col items-center p-6 space-y-6">
        <div className="w-full max-w-6xl flex flex-col space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <AdminUserManagement />
          </div>
        </div>
      </div>
    </div>
  );
}
