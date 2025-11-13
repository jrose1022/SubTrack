'use client';

import React from 'react';

export default function AdminFinancialReport() {
  return (
    <div className="w-full sm:w-[90%] lg:w-[75%] min-h-[80vh] bg-white/90 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 overflow-y-auto text-gray-900 mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
        Financial Report Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Total Income */}
        <div className="p-4 sm:p-6 bg-green-100 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-lg sm:text-xl font-semibold text-green-700">Total Income</h2>
          <p className="text-xl sm:text-2xl font-bold text-green-900 mt-2">₱120,000</p>
        </div>

        {/* Total Expenses */}
        <div className="p-4 sm:p-6 bg-red-100 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-lg sm:text-xl font-semibold text-red-700">Total Expenses</h2>
          <p className="text-xl sm:text-2xl font-bold text-red-900 mt-2">₱75,000</p>
        </div>

        {/* Net Balance */}
        <div className="p-4 sm:p-6 bg-blue-100 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-700">Net Balance</h2>
          <p className="text-xl sm:text-2xl font-bold text-blue-900 mt-2">₱45,000</p>
        </div>
      </div>

      {/* Transaction Summary Table */}
      <div className="mt-6 sm:mt-10 overflow-x-auto">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">Monthly Breakdown</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-xl overflow-hidden text-sm sm:text-base">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="py-2 px-3 sm:px-4 border-b text-left">Month</th>
              <th className="py-2 px-3 sm:px-4 border-b text-left">Income</th>
              <th className="py-2 px-3 sm:px-4 border-b text-left">Expenses</th>
              <th className="py-2 px-3 sm:px-4 border-b text-left">Net</th>
            </tr>
          </thead>
          <tbody>
            {[
              { month: 'January', income: 40000, expenses: 25000, net: 15000 },
              { month: 'February', income: 30000, expenses: 20000, net: 10000 },
              { month: 'March', income: 50000, expenses: 30000, net: 20000 },
            ].map((row) => (
              <tr key={row.month} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3 sm:px-4">{row.month}</td>
                <td className="py-2 px-3 sm:px-4 text-green-700">₱{row.income.toLocaleString()}</td>
                <td className="py-2 px-3 sm:px-4 text-red-700">₱{row.expenses.toLocaleString()}</td>
                <td className="py-2 px-3 sm:px-4 text-blue-700">₱{row.net.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
