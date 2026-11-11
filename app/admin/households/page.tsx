import React from 'react';
import { 
  LayoutGrid, Home, Calendar, Car, BarChart2, 
  ShieldCheck, LogOut, Lock, ChevronRight,
  ChevronLeft, Check, Trash2, Edit2, ChevronDown, ShieldAlert
} from 'lucide-react';

export default function HouseholdDetailSetup() {
  // TEMPORARY PLACEHOLDER DATA
  const mockLedgerData = [
    { id: '1', date: '01 Oct 2026', description: 'October HOA dues', debit: 100.00, credit: null, balance: 100.00 },
    { id: '2', date: '01 Oct 2026', description: 'October parking · P-01', debit: 20.00, credit: null, balance: 120.00 },
    { id: '3', date: '18 Oct 2026', description: 'SIM-261018-0042 →', debit: null, credit: 120.00, balance: 0.00 },
  ];

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex font-[Arial]">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-[#2d2d2d] text-[#f9f9f9] flex flex-col justify-between h-screen sticky top-0 shrink-0">
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
            <a href="/admin/overview" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#1e1e1e] rounded-lg transition-colors">
              <LayoutGrid size={18} />
              <span className="text-base">Overview</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#1e1e1e] rounded-lg border-l-4 border-[#ff8c00] text-[#ff8c00]">
              <Home size={18} />
              <span className="text-base font-bold">Households</span>
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

      {/* MAIN CONTENT */}
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

        <div className="p-8 max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-sm text-gray-500 uppercase mb-1">COMMUNITY OPERATIONS / OCTOBER 2026</div>
              <h1 className="text-2xl font-bold mb-2">A-101 · Adrian Lleva</h1>
              <p className="text-sm text-gray-500">Household HH-001 · Maple Court · Created 01 Sep 2026</p>
            </div>
            <button type="button" className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors">
              <ChevronLeft size={16} /> Back to directory
            </button>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ff8c00]"></div>
              After payment · 18 Oct 2026, 10:42
            </div>
            <div>PHP · Ledger</div>
          </div>

          <div className="border-b border-gray-200 mb-6">
            <div className="inline-block pb-3 border-b-2 border-[#2d2d2d] text-base font-bold">
              Profile & ledger
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            
            {/* Left Column - Wider */}
            <div className="col-span-2 flex flex-col gap-6">
              
              {/* Unit Record Card */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-base font-bold">Unit record</h2>
                  <span className="text-sm font-bold">Edit mode</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Unit number</label>
                    <input type="text" defaultValue="A-101" className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-[#ff8c00] focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Court / building</label>
                    <input type="text" defaultValue="Maple Court" className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-[#ff8c00] focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Household status</label>
                    <div className="relative">
                      <select className="w-full p-3 border border-gray-200 rounded-lg text-sm appearance-none bg-gray-50 focus:outline-none focus:border-[#ff8c00] focus:bg-white">
                        <option>Active</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Parking allocation</label>
                    <div className="relative">
                      <select className="w-full p-3 border border-gray-200 rounded-lg text-sm appearance-none bg-gray-50 focus:outline-none focus:border-[#ff8c00] focus:bg-white">
                        <option>P-01 · Occupied</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center py-4 border-t border-gray-100 mb-6">
                  <span className="text-sm text-gray-600">Current balance</span>
                  <span className="text-base font-bold">₱0.00</span>
                </div>

                <div className="flex gap-3 mb-6 border-b border-gray-100 pb-6">
                  <button type="button" className="flex items-center gap-2 px-6 py-2 bg-[#ff8c00] text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors">
                    <Check size={16} /> Update household
                  </button>
                  <button type="button" className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button type="button" className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                    <Trash2 size={16} /> Remove household...
                  </button>
                </div>

                <div className="text-sm text-gray-500">
                  New household records are created from the directory. Unit IDs are unique and never reused in the financial audit.
                </div>
              </div>

              {/* Posted Ledger History Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                  <h2 className="text-base font-bold">Posted ledger history</h2>
                  <div className="flex items-center gap-1 text-sm font-bold cursor-pointer">
                    October 2026 <ChevronDown size={14} />
                  </div>
                </div>
                
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Description / reference</th>
                      <th className="px-6 py-4">Debit</th>
                      <th className="px-6 py-4">Credit</th>
                      <th className="px-6 py-4">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockLedgerData.map((row) => (
                      <tr key={row.id} className="border-b border-gray-50">
                        <td className="px-6 py-4 font-bold">{row.date}</td>
                        <td className="px-6 py-4 text-gray-600">{row.description}</td>
                        <td className="px-6 py-4">{row.debit ? `₱${row.debit.toFixed(2)}` : '—'}</td>
                        <td className="px-6 py-4">{row.credit ? `₱${row.credit.toFixed(2)}` : '—'}</td>
                        <td className="px-6 py-4">{row.balance ? `₱${row.balance.toFixed(2)}` : '₱0.00'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-6 py-4 bg-gray-50 text-sm text-gray-500 border-t border-gray-100">
                  Opening ₱0.00 · Debits ₱120.00 · Credits ₱120.00 · Closing ₱0.00
                </div>
                <div className="p-6 text-sm text-gray-500">
                  Posted entries are immutable. Correct errors using an audited adjustment, not by deleting a receipt.
                </div>
              </div>

              {/* Warning Banner */}
              <div className="bg-[#fef7ef] border border-[#f5e1c8] border-l-4 border-l-[#ff8c00] rounded-r-lg p-6 flex gap-4">
                <ShieldAlert size={20} className="text-[#2d2d2d] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-[#2d2d2d] mb-1">Removal is safeguarded; audit history is not deleted.</div>
                  <div className="text-sm text-[#2d2d2d]">
                    Remove household opens a confirmation requiring HH-001. Removal deactivates the unit, unlinks access and stops future assessments; posted ledgers and receipts remain read-only. Outstanding balances must be reviewed first.
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column - Narrower */}
            <div className="flex flex-col gap-6">
              
              {/* Linked Resident Card */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-base font-bold mb-6">Linked resident</h2>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-base font-bold">Adrian Lleva</div>
                  <span className="bg-gray-100 text-gray-700 text-sm font-bold px-3 py-1 rounded-full border border-gray-200">Registered</span>
                </div>
                
                <div className="text-sm text-gray-600 mb-6">maya.bennett@example.com</div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Invited</span>
                    <span>01 Sep 2026</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Accepted</span>
                    <span>02 Sep 2026</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Assigned role</span>
                    <span>Homeowner</span>
                  </div>
                </div>

                <div className="flex gap-3 mb-6 border-b border-gray-100 pb-6">
                  <button type="button" className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                    <Edit2 size={14} /> Edit resident
                  </button>
                  <button type="button" className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                    Unlink...
                  </button>
                </div>

                <button type="button" className="text-sm font-bold flex items-center mb-4 hover:text-[#ff8c00] transition-colors">
                  Invite / link another resident <ChevronRight size={14} className="ml-1" />
                </button>
                
                <div className="text-sm text-gray-500">
                  Invitations provision household-scoped access only. Administrator roles are assigned separately.
                </div>
              </div>

              {/* Periodic Assessment Links Card */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-base font-bold mb-6">Periodic assessment links</h2>
                
                <div className="mb-6">
                  <div className="text-sm font-bold mb-2">HOA-M01 · Monthly dues</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Amount / frequency</span>
                    <span>₱100.00 / month</span>
                  </div>
                </div>

                <div className="mb-6 border-b border-gray-100 pb-6">
                  <div className="text-sm font-bold mb-2">PRK-M01 · Parking charge</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Amount / frequency</span>
                    <span>₱20.00 / month</span>
                  </div>
                </div>

                <div className="flex justify-between text-sm mb-6">
                  <span className="text-gray-500">Next posting</span>
                  <span>01 Nov 2026</span>
                </div>

                <button type="button" className="text-sm font-bold flex items-center hover:text-[#ff8c00] transition-colors">
                  Manage assessment linkage <ChevronRight size={14} className="ml-1" />
                </button>
              </div>

            </div>
          </div>
          
          <div className="text-sm text-gray-400 py-4">
            SineGANG HOA · Private community records
          </div>

        </div>
      </div>
    </div>
  );
}