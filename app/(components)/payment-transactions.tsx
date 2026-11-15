"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

type Payment = {
  reference: string;
  resident: string;
  unit: string;
  date: string;
  method: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
};

const payments: Payment[] = [
  { reference: "PAY-10482", resident: "Sophia Reyes", unit: "A-204", date: "Nov 14, 2025", method: "GCash", amount: 3500, status: "Completed" },
  { reference: "PAY-10481", resident: "Miguel Santos", unit: "B-108", date: "Nov 14, 2025", method: "Bank transfer", amount: 7000, status: "Completed" },
  { reference: "PAY-10480", resident: "Amara Cruz", unit: "C-302", date: "Nov 13, 2025", method: "Credit card", amount: 3500, status: "Pending" },
  { reference: "PAY-10479", resident: "Noah Garcia", unit: "A-110", date: "Nov 13, 2025", method: "GCash", amount: 1750, status: "Completed" },
  { reference: "PAY-10478", resident: "Isabella Lim", unit: "D-401", date: "Nov 12, 2025", method: "Bank transfer", amount: 3500, status: "Failed" },
  { reference: "PAY-10477", resident: "Ethan Tan", unit: "B-206", date: "Nov 12, 2025", method: "Credit card", amount: 7000, status: "Completed" },
];

const statusStyles: Record<Payment["status"], string> = {
  Completed: "bg-slate-100 text-slate-700",
  Pending: "bg-amber-50 text-amber-700",
  Failed: "bg-rose-50 text-rose-700",
};

export function PaymentTransactions() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase();
    return payments.filter((payment) => {
      const matchesSearch = !query || [payment.reference, payment.resident, payment.unit, payment.method].some((value) =>
        value.toLowerCase().includes(query),
      );
      return matchesSearch && (status === "All statuses" || payment.status === status);
    });
  }, [search, status]);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Recent payments</h2>
          <p className="mt-1 text-sm text-slate-500">Latest dues and fee transactions</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative">
            <span className="sr-only">Search payments</span>
            <Search aria-hidden="true" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search payments"
              className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 sm:w-48"
            />
          </label>
          <label>
            <span className="sr-only">Filter payment status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-orange-500 sm:w-auto"
            >
              <option>All statuses</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </label>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[690px] text-left text-sm">
          <thead className="bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-3">Resident</th>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-6 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredPayments.map((payment) => (
              <tr key={payment.reference} className="text-slate-600">
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="font-medium text-slate-800">{payment.resident}</span>
                  <span className="ml-2 text-xs text-slate-400">{payment.unit}</span>
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-slate-500">{payment.reference}</td>
                <td className="whitespace-nowrap px-4 py-4">{payment.date}</td>
                <td className="whitespace-nowrap px-4 py-4">{payment.method}</td>
                <td className="whitespace-nowrap px-4 py-4 text-right font-medium text-slate-800">
                  ₱{payment.amount.toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[payment.status]}`}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredPayments.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-500">
                  No payments match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="border-t border-slate-100 px-6 py-3 text-xs text-slate-400">
        Showing {filteredPayments.length} of {payments.length} transactions
      </div>
    </section>
  );
}
