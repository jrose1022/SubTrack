import { Lock } from "lucide-react";
import HomeownerSidebar from "../(components)/homeowner-sidebar";

export default function HomeownerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#FAF9F6]">
      <HomeownerSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-stone-200 bg-white px-6 py-3 text-xs">
          <p>
            <span className="text-gray-500">SineGANG</span>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="font-semibold">Resident services</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="rounded-full border border-stone-300 bg-stone-50 px-3 py-1 font-semibold">
              Demonstration data
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              <Lock size={12} />
              Secure session
            </span>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
