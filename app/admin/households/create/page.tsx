"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  LayoutGrid, Home, Calendar, Car, BarChart2, 
  ShieldCheck, LogOut, Lock, ChevronRight,
  ChevronLeft, Check, Trash2, Edit2, ChevronDown, ShieldAlert
} from 'lucide-react';

export default function CreateHouseholdBlank() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract data from the URL passed by the Directory page
  const urlUnit = searchParams.get('unit') || 'New Unit';
  const urlBuilding = searchParams.get('building') || 'New Building';
  const urlName = searchParams.get('name') || 'Pending Resident';
  const urlEmail = searchParams.get('email') || 'No email provided';

  // Format today's date dynamically
  const [currentDate, setCurrentDate] = useState('...');
  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
    setCurrentDate(formatted);
  }, []);

  // 1. LEDGER DATA (Completely Empty)
  const mockLedgerData: any[] = [];
  const availableMonths = ['November 2026'];
  const [selectedMonth, setSelectedMonth] = useState('November 2026');

  // 2. UNIT RECORD FORM STATE
  const [savedData, setSavedData] = useState({
    unitNumber: urlUnit,
    building: urlBuilding,
    status: 'Active',
    parkingStatus: 'Unassigned',
    parkingSlot: ''
  });

  const [formData, setFormData] = useState({ ...savedData });
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const isDirty = JSON.stringify(savedData) !== JSON.stringify(formData);

  // 3. RESIDENT EDIT STATE
  const [resident, setResident] = useState({ name: urlName, email: urlEmail });
  const [residentForm, setResidentForm] = useState({ ...resident });
  const [isEditingResident, setIsEditingResident] = useState(false);

  // 4. ACTION HANDLERS
  const handleUpdateHousehold = () => {
    setSavedData({ ...formData });
  };

  const handleCancelEdits = () => {
    setFormData({ ...savedData });
  };

  const handleSaveResident = () => {
    setResident({ ...residentForm });
    setIsEditingResident(false);
  };

  const handleCancelResidentEdit = () => {
    setResidentForm({ ...resident });
    setIsEditingResident(false);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex font-[Arial]">
      
      {/* REMOVE CONFIRMATION MODAL */}
      {showRemoveModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-[#2d2d2d]">Remove household</h3>
            <p className="text-base text-gray-600 mb-8">
              Are you sure you want to remove this household? This action will deactivate the unit and it will no longer exist in the directory.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => router.push('/admin/households')}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg text-base font-bold hover:bg-red-600 transition-colors cursor-pointer"
              >
                Yes, remove it
              </button>
              <button 
                onClick={() => setShowRemoveModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg text-base font-bold hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
            <a href="/admin/overview" className="flex items-center gap-3 px-4 py-3 text-gray-300 border-l-4 border-transparent hover:text-[#ff8c00] rounded-lg transition-colors">
              <LayoutGrid size={18} />
              <span className="text-base">Overview</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#1e1e1e] rounded-lg border-l-4 border-[#ff8c00] text-[#ff8c00]">
              <Home size={18} />
              <span className="text-base font-bold">Households</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-300 border-l-4 border-transparent hover:text-[#ff8c00] rounded-lg transition-colors">
              <Calendar size={18} />
              <span className="text-base">Assessments</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-300 border-l-4 border-transparent hover:text-[#ff8c00] rounded-lg transition-colors">
              <Car size={18} />
              <span className="text-base">Parking inventory</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-300 border-l-4 border-transparent hover:text-[#ff8c00] rounded-lg transition-colors">
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
          <button 
            onClick={() => router.push('/')}
            type="button" 
            className="group flex items-center gap-2 text-sm text-gray-400 px-2 pt-4 transition-colors cursor-pointer"
          >
            <LogOut size={16} className="group-hover:text-[#ff8c00] transition-colors" /> 
            <span className="group-hover:text-white transition-colors">Sign out</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 text-[#2d2d2d] overflow-y-auto">
        <div className="flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">SineGANG</span>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="font-bold">Administration</span>
          </div>
        </div>

        <div className="p-8 max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-sm text-gray-500 uppercase mb-1">COMMUNITY OPERATIONS / NOVEMBER 2026</div>
              <h1 className="text-2xl font-bold mb-2">{savedData.unitNumber} · {resident.name}</h1>
              <p className="text-sm text-gray-500">Household HH-NEW · {savedData.building} · Created Just Now</p>
            </div>
            <button 
              onClick={() => router.push('/admin/households')}
              type="button" 
              className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} /> Back to directory
            </button>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              Pending first payment
            </div>
            <div>PHP · Ledger</div>
          </div>

          <div className="border-b border-gray-200 mb-6">
            <div className="inline-block pb-3 border-b-2 border-[#2d2d2d] text-base font-bold">
              Profile & ledger
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
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
                    <input 
                      type="text" 
                      value={formData.unitNumber}
                      onChange={(e) => setFormData({ ...formData, unitNumber: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-[#ff8c00] focus:bg-white transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Court / building</label>
                    <input 
                      type="text" 
                      value={formData.building}
                      onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-[#ff8c00] focus:bg-white transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Household status</label>
                    <div className="relative">
                      <select 
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full p-3 border border-gray-200 rounded-lg text-sm appearance-none bg-gray-50 focus:outline-none focus:border-[#ff8c00] focus:bg-white cursor-pointer transition-colors"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Parking allocation</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <select 
                          value={formData.parkingStatus}
                          onChange={(e) => setFormData({ ...formData, parkingStatus: e.target.value })}
                          className="w-full p-3 border border-gray-200 rounded-lg text-sm appearance-none bg-gray-50 focus:outline-none focus:border-[#ff8c00] focus:bg-white cursor-pointer transition-colors"
                        >
                          <option value="Occupied">Occupied</option>
                          <option value="Vacant">Vacant</option>
                          <option value="Unassigned">Unassigned</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-500 pointer-events-none" />
                      </div>
                      {formData.parkingStatus !== 'Unassigned' && (
                        <input 
                          type="text" 
                          value={formData.parkingSlot}
                          onChange={(e) => setFormData({ ...formData, parkingSlot: e.target.value })}
                          placeholder="e.g. P-01"
                          className="w-1/3 p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-[#ff8c00] focus:bg-white transition-colors" 
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center py-4 border-t border-gray-100 mb-6">
                  <span className="text-sm text-gray-600">Current balance</span>
                  <span className="text-base font-bold">₱0.00</span>
                </div>

                <div className="flex gap-3 mb-6 border-b border-gray-100 pb-6">
                  <button 
                    onClick={handleUpdateHousehold}
                    type="button" 
                    className="flex items-center gap-2 px-6 py-2 bg-[#ff8c00] text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors cursor-pointer"
                  >
                    <Check size={16} /> Update household
                  </button>
                  <button 
                    onClick={handleCancelEdits}
                    disabled={!isDirty}
                    type="button" 
                    className={`px-6 py-2 border rounded-lg text-sm font-bold transition-colors ${isDirty ? 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer' : 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'}`}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setShowRemoveModal(true)}
                    type="button" 
                    className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors cursor-pointer ml-auto"
                  >
                    <Trash2 size={16} /> Remove household
                  </button>
                </div>
              </div>

              {/* EMPTY Posted Ledger History Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                  <h2 className="text-base font-bold">Posted ledger history</h2>
                  <div className="relative">
                    <select 
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-sm font-bold text-gray-700 cursor-pointer focus:outline-none focus:border-[#ff8c00]"
                    >
                      {availableMonths.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-2.5 text-gray-500 pointer-events-none" />
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
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        No financial history exists for this new household yet.
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="px-6 py-4 bg-gray-50 text-sm text-gray-500 border-t border-gray-100">
                  Opening ₱0.00 · Debits ₱0.00 · Credits ₱0.00 · Closing ₱0.00
                </div>
              </div>

            </div>

            {/* Right Column - Narrower */}
            <div className="flex flex-col gap-6">
              
              {/* Linked Resident Card */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-base font-bold mb-6">Linked resident</h2>
                
                {isEditingResident ? (
                  <div className="mb-6 space-y-4">
                    <div>
                      <label className="block text-sm font-bold mb-1">Name</label>
                      <input 
                        type="text"
                        value={residentForm.name}
                        onChange={(e) => setResidentForm({...residentForm, name: e.target.value})}
                        className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#ff8c00]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-1">Email</label>
                      <input 
                        type="email"
                        value={residentForm.email}
                        onChange={(e) => setResidentForm({...residentForm, email: e.target.value})}
                        className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#ff8c00]"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button onClick={handleSaveResident} className="px-3 py-1.5 bg-[#ff8c00] text-white text-sm font-bold rounded-lg hover:bg-orange-600">Save</button>
                      <button onClick={handleCancelResidentEdit} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-200">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-base font-bold">{resident.name}</div>
                      <span className="bg-orange-50 text-[#ff8c00] text-sm font-bold px-3 py-1 rounded-full border border-orange-200">New / Pending</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-6">{resident.email}</div>
                  </>
                )}
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Invited</span>
                    {/* dynamically updated current date */}
                    <span>{currentDate}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Accepted</span>
                    <span>Pending</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Assigned role</span>
                    <span>Homeowner</span>
                  </div>
                </div>

                {!isEditingResident && (
                  <div className="flex gap-3 mb-6 border-b border-gray-100 pb-6">
                    <button 
                      onClick={() => setIsEditingResident(true)}
                      type="button" 
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <Edit2 size={14} /> Edit resident
                    </button>
                  </div>
                )}
              </div>

              {/* Periodic Assessment Links Card */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-base font-bold mb-6">Periodic assessment links</h2>
                
                <div className="mb-6">
                  <div className="text-sm font-bold mb-2 text-gray-400">HOA-M01 · Monthly dues</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Amount / frequency</span>
                    <span className="text-gray-400">Not linked</span>
                  </div>
                </div>

                <div className="mb-6 border-b border-gray-100 pb-6">
                  <div className="text-sm font-bold mb-2 text-gray-400">PRK-M01 · Parking charge</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Amount / frequency</span>
                    <span className="text-gray-400">Not linked</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}