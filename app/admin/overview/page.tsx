import React from 'react';
import { 
  LayoutGrid, Home, FileText, Car, BarChart2, 
  ShieldCheck, LogOut, Lock, Calendar, Copy, 
  Home as HomeIcon, Car as CarIcon, ChevronRight
} from 'lucide-react';

export default function AdministratorOverview() {
  // TEMPORARY PLACEHOLDER DATA
  // Backend team: Replace this object with your Supabase data fetch
  const mockDashboardData = {
    collectedThisMonth: 440.00,
    assessedTotal: 680.00,
    outstandingAssessments: 240.00,
    outstandingHouseholdsCount: 2,
    registeredCurrent: 4,
    registeredPending: 2,
    parkingVacant: 2,
    parkingUnassigned: 2,
    hoaDuesCollected: 400.00,
    hoaDuesTotal: 600.00,
    parkingChargesCollected: 40.00,
    parkingChargesTotal: 80.00,
    netCollections: 440.00,
    paymentExceptionsCount: 2,
    recentCollections: [
      { id: '1', date: '18 Oct · 10:42', receipt: 'SIM-261018-0042', resident: 'A-101 · Adrian Lleva', method: 'GCash', amount: 120.00 },
      { id: '2', date: '12 Oct · 14:20', receipt: 'SIM-261012-0041', resident: 'B-203 · Nina Shah', method: 'GCash', amount: 100.00 },
      { id: '3', date: '08 Oct · 11:05', receipt: 'SIM-261008-0040', resident: 'B-201 · Leo Santos', method: 'GCash', amount: 100.00 },
      { id: '4', date: '05 Oct · 09:30', receipt: 'SIM-261005-0039', resident: 'A-102 · Owen Clarke', method: 'GCash', amount: 120.00 },
    ]
  };

  // Helper calculations for UI percentages
  const collectionPercentage = ((mockDashboardData.collectedThisMonth / mockDashboardData.assessedTotal) * 100).toFixed(1);
  const totalHouseholds = mockDashboardData.registeredCurrent + mockDashboardData.registeredPending;
  const totalParkingOccupied = mockDashboardData.parkingVacant + mockDashboardData.parkingUnassigned; // Adjust logic based on exact parking rules
  const totalParkingSlots = 6; 

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex font-[Arial]">
      
      {/* SIDEBAR (30% Color - #2d2d2d) */}
      <div className="w-64 bg-[#2d2d2d] text-[#f9f9f9] flex flex-col justify-between h-screen sticky top-0">
        <div>
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-[#ff8c00] rounded flex items-center justify-center">
              <span className="text-[#2d2d2d] font-bold text-base">S</span>
            </div>
            <div>
              <div className="text-base font-bold">SineGANG</div>
              <div className="text-sm text-gray-400">HOMEOWNERS ASSN.</div>
            </div>
          </div>

          <div className="px-6 py-2 text-sm text-gray-400 mt-2">ADMINISTRATOR PORTAL</div>
          
          <nav className="mt-2 flex flex-col gap-1 px-4">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#1e1e1e] rounded-lg border-l-4 border-[#ff8c00] text-[#ff8c00]">
              <LayoutGrid size={18} />
              <span className="text-base font-bold">Overview</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#1e1e1e] rounded-lg transition-colors">
              <Home size={18} />
              <span className="text-base">Households</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#1e1e1e] rounded-lg transition-colors">
              <Calendar size={18} />
              <span className="text-base">Assessments</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#1e1e1e] rounded-lg transition-colors">
              <Car size={18} />
              <span className="text-base">Parking inventory</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#1e1e1e] rounded-lg transition-colors">
              <BarChart2 size={18} />
              <span className="text-base">Reports</span>
            </a>
          </nav>
        </div>

        <div className="p-4">
          <div className="bg-[#1e1e1e] p-4 rounded-lg mb-4 border border-[#3d3d3d]">
            <ShieldCheck size={20} className="text-[#ff8c00] mb-2" />
            <div className="text-base font-bold text-[#f9f9f9]">Assigned administrator</div>
            <div className="text-sm text-gray-400 mt-1">Board-authorized access to community records.</div>
          </div>
          
          <div className="flex items-center justify-between border-t border-[#3d3d3d] pt-4 px-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#3d3d3d] rounded-full flex items-center justify-center text-sm">JL</div>
              <div>
                <div className="text-sm font-bold">Vince Adrian</div>
                <div className="text-sm text-gray-400">Administrator</div>
              </div>
            </div>
          </div>
          <button type="button" className="flex items-center gap-2 text-sm text-gray-400 px-2 pt-4 hover:text-white transition-colors">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </div>

      {/* MAIN CONTENT (60% Color - #f9f9f9) */}
      <div className="flex-1 text-[#2d2d2d] overflow-y-auto">
        
        {/* Topbar */}
        <div className="flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">SineGANG</span>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="font-bold">Administration</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">Demonstration data</span>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Lock size={14} /> Secure session
            </div>
          </div>
        </div>

        <div className="p-8 max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="text-sm text-gray-500 uppercase mb-1">COMMUNITY OPERATIONS / OCTOBER 2026</div>
              <h1 className="text-2xl font-bold mb-2">Community overview</h1>
              <p className="text-base text-gray-600">October collections and payment-driven parking, reconciled at one snapshot.</p>
            </div>
            <button type="button" className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg text-base font-bold shadow-sm transition-colors cursor-pointer">
              <BarChart2 size={16} /> View board reports
            </button>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ff8c00]"></div>
              After payment · 18 Oct 2026, 10:42
            </div>
            <div>PHP · Ledger</div>
          </div>

          {/* 4 Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm text-gray-500">Collected this month</div>
                <Calendar size={16} className="text-gray-400" />
              </div>
              <div className="text-2xl font-bold mb-2">₱{mockDashboardData.collectedThisMonth.toFixed(2)}</div>
              <div className="text-sm text-gray-500">{collectionPercentage}% of ₱{mockDashboardData.assessedTotal.toFixed(2)} assessed</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm text-gray-500">Outstanding assessments</div>
                <Copy size={16} className="text-gray-400" />
              </div>
              <div className="text-2xl font-bold mb-2">₱{mockDashboardData.outstandingAssessments.toFixed(2)}</div>
              <div className="text-sm text-gray-500">{mockDashboardData.outstandingHouseholdsCount} households · Due 31 Oct</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm text-gray-500">Registered households</div>
                <HomeIcon size={16} className="text-gray-400" />
              </div>
              <div className="text-2xl font-bold mb-2">{totalHouseholds} / {totalHouseholds}</div>
              <div className="text-sm text-gray-500">{mockDashboardData.registeredCurrent} current · {mockDashboardData.registeredPending} payment pending</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm text-gray-500">Parking occupied</div>
                <CarIcon size={16} className="text-gray-400" />
              </div>
              <div className="text-2xl font-bold mb-2">{totalParkingOccupied} / {totalParkingSlots}</div>
              <div className="text-sm text-gray-500">{mockDashboardData.parkingVacant} vacant · {mockDashboardData.parkingUnassigned} unassigned</div>
            </div>
          </div>

          {/* Progress and Review Section */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="text-base font-bold">October collection progress</div>
                <div className="text-sm font-bold">01–18 Oct 2026</div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span>HOA dues</span>
                  <span>₱{mockDashboardData.hoaDuesCollected.toFixed(2)} / ₱{mockDashboardData.hoaDuesTotal.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-[#ff8c00] h-2 rounded-full" style={{ width: `${(mockDashboardData.hoaDuesCollected / mockDashboardData.hoaDuesTotal) * 100}%` }}></div>
                </div>
              </div>

              <div className="mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span>Parking charges</span>
                  <span>₱{mockDashboardData.parkingChargesCollected.toFixed(2)} / ₱{mockDashboardData.parkingChargesTotal.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-[#ff8c00] h-2 rounded-full" style={{ width: `${(mockDashboardData.parkingChargesCollected / mockDashboardData.parkingChargesTotal) * 100}%` }}></div>
                </div>
              </div>

              <div className="flex justify-between text-sm mt-4">
                <span className="text-gray-500">Net collections · No fees or adjustments</span>
                <span className="font-bold">₱{mockDashboardData.netCollections.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-base font-bold mb-4">Needs review</div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-base font-bold">{mockDashboardData.paymentExceptionsCount} payment exceptions</div>
                  <button type="button" className="px-4 py-1 text-sm font-bold border border-[#ff8c00] text-[#ff8c00] rounded-full hover:bg-[#fff4e5] transition-colors cursor-pointer">Review</button>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  A-103 and B-202 each owe ₱ 120.00 for October. Their allocated parking slots are classified vacant.
                </p>
                <p className="text-sm text-gray-500">
                  Not overdue: due 31 Oct 2026. No manual occupancy override is applied.
                </p>
              </div>
              <button type="button" className="text-sm font-bold flex items-center mt-4 hover:text-[#ff8c00] transition-colors cursor-pointer">
                Review parking inventory <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div className="text-base font-bold">Recent simulated collections</div>
              <button type="button" className="text-sm font-bold flex items-center hover:text-[#ff8c00] transition-colors cursor-pointer">
                View reports <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Posted</th>
                  <th className="px-6 py-4">Audit receipt</th>
                  <th className="px-6 py-4">Household / resident</th>
                  <th className="px-6 py-4">Method</th>
                  <th className="px-6 py-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {mockDashboardData.recentCollections.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-50">
                    <td className="px-6 py-4 font-bold">{transaction.date}</td>
                    <td className="px-6 py-4 text-gray-600">{transaction.receipt}</td>
                    <td className="px-6 py-4">{transaction.resident}</td>
                    <td className="px-6 py-4">{transaction.method}</td>
                    <td className="px-6 py-4 font-bold">₱{transaction.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 text-sm text-gray-500 border-t border-gray-100">
              {mockDashboardData.recentCollections.length} posted receipts · ₱{mockDashboardData.netCollections.toFixed(2)} total · No live banking transactions
            </div>
          </div>

          {/* Footer Cards */}
          <div className="grid grid-cols-3 gap-6 pb-10">
            <div className="col-span-2 bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-bold mb-1">Parking follows payment, not manual occupancy.</div>
              <div className="text-sm text-gray-500">Occupied = allocated + current dues and parking paid. Vacant = allocated with no active payer. Unassigned = no allocation.</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-bold mb-1">Board review ready</div>
              <div className="text-sm text-gray-500">Financial and parking audits share this 18 Oct, 10:42 snapshot.</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-400 pb-8">
            SineGANG HOA · Private community records
          </div>

        </div>
      </div>
    </div>
  );
}