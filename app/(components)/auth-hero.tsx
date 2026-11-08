import React from 'react';
import { Building2, ArrowUpRight, Receipt, Car } from 'lucide-react';

export const AuthHero: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between w-full lg:w-1/2 bg-[#262626] text-white p-12 lg:p-16 xl:p-20 min-h-screen border-r border-neutral-800">
      {/* Brand Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-black font-bold shadow-sm">
          <Building2 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-sm leading-tight tracking-wide uppercase">SineGANG</h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">Homeowners Assn.</p>
        </div>
      </div>

      {/* Main Pitch & Graphic Container */}
      <div className="space-y-8 w-full my-auto py-6">
        <div>
          <p className="text-[11px] font-bold text-amber-500 tracking-wider uppercase mb-3">
            Resident Services / Alder Grove
          </p>
          <h2 className="text-3xl xl:text-4xl font-bold tracking-tight leading-tight text-white">
            A clearer view of your community.
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed max-w-lg">
            Household dues, transparent statements and parking that stays in step with your payments.
          </p>
        </div>

        {/* Feature Graphic / Wireframe Card */}
        <div className="bg-[#333333]/60 border border-neutral-700/40 rounded-2xl p-6 relative w-full">
          <div className="flex justify-between items-center text-[10px] font-medium text-gray-400 mb-6 uppercase tracking-wider">
            <span>A Connected Neighborhood</span>
            <ArrowUpRight className="w-4 h-4 text-amber-500" />
          </div>

          <div className="flex items-center justify-center gap-4 h-36 mb-4 px-2">
            <div className="flex items-center justify-center flex-1 h-full">
              <svg viewBox="0 0 100 120" className="w-full h-28 stroke-gray-400 fill-none stroke-[1.5]">
                <polygon points="50,10 5,50 95,50" />
                <rect x="15" y="50" width="70" height="60" />
                <path d="M 25,60 H 40 M 60,60 H 75" />
                <rect x="40" y="80" width="20" height="30" />
              </svg>
            </div>

            <div className="flex items-center justify-center flex-1 h-full">
              <svg viewBox="0 0 100 120" className="w-full h-28 stroke-gray-400 fill-none stroke-[1.5]">
                <rect x="10" y="25" width="80" height="85" />
                <rect x="22" y="37" width="22" height="20" />
                <rect x="56" y="37" width="22" height="20" />
                <rect x="22" y="67" width="22" height="20" />
                <rect x="56" y="67" width="22" height="20" />
                <rect x="44" y="80" width="12" height="30" />
              </svg>
            </div>

            <div className="flex items-center justify-center flex-1 h-full">
              <svg viewBox="0 0 100 120" className="w-full h-28 stroke-gray-400 fill-none stroke-[1.5]">
                <polygon points="50,10 5,50 95,50" />
                <rect x="15" y="50" width="70" height="60" />
                <path d="M 25,60 H 40 M 60,60 H 75" />
                <rect x="40" y="80" width="20" height="30" />
              </svg>
            </div>
          </div>

          <div className="flex justify-between text-[11px] text-gray-400 font-medium px-1">
            <span>Homes</span>
            <span className="text-amber-500 font-semibold">One shared ledger</span>
            <span>Community</span>
          </div>
        </div>

        {/* Feature List */}
        <div className="space-y-4 pt-2">
          <div className="flex gap-3.5 items-start">
            <div className="p-2 rounded-lg bg-neutral-800 text-amber-500 mt-0.5 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-200">Know what you owe</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Itemized statements and permanent receipt history.</p>
            </div>
          </div>

          <div className="flex gap-3.5 items-start">
            <div className="p-2 rounded-lg bg-neutral-800 text-amber-500 mt-0.5 flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-200">Understand your parking</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Clear eligibility, paid-through dates and availability.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Footer */}
      <div className="text-[11px] text-gray-500">
        SineGANG Homeowners Association · Est. 2026
      </div>
    </div>
  );
};