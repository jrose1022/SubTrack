"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

type ParkingLog = {
  resident: string;
  unit: string;
  slot: string;
  period: string;
  monthlyFee: number;
  status: "Paid" | "Pending" | "Overdue";
};

const parkingLogs: ParkingLog[] = [
  { resident: "Sophia Reyes", unit: "A-204", slot: "P-12", period: "Nov 1–30, 2025", monthlyFee: 2500, status: "Paid" },
  { resident: "Miguel Santos", unit: "B-108", slot: "P-07", period: "Nov 1–30, 2025", monthlyFee: 2500, status: "Paid" },
  { resident: "Amara Cruz", unit: "C-302", slot: "P-21", period: "Nov 1–30, 2025", monthlyFee: 2500, status: "Pending" },
  { resident: "Noah Garcia", unit: "A-110", slot: "P-03", period: "Nov 1–30, 2025", monthlyFee: 2500, status: "Paid" },
  { resident: "Isabella Lim", unit: "D-401", slot: "P-16", period: "Oct 1–31, 2025", monthlyFee: 2500, status: "Overdue" },
  { resident: "Ethan Tan", unit: "B-206", slot: "P-18", period: "Nov 1–30, 2025", monthlyFee: 3000, status: "Pending" },
];

const parkingStatusStyles: Record<ParkingLog["status"], string> = {
  Paid: "bg-slate-100 text-slate-700",
  Pending: "bg-orange-50 text-orange-800",
  Overdue: "bg-rose-50 text-rose-700",
};

export function ParkingUtilization() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase();
    return parkingLogs.filter((log) => {
      const searchableFields = [
        log.resident,
        log.unit,
        log.slot,
        log.period,
        log.status,
        String(log.monthlyFee),
      ];
      const matchesSearch = !query || searchableFields.some((value) => value.toLowerCase().includes(query));
      return matchesSearch && (status === "All statuses" || log.status === status);
    });
  }, [search, status]);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Parking slot assignments</h2>
          <p className="mt-1 text-sm text-slate-500">Resident reservations and monthly assessment status</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative">
            <span className="sr-only">Search parking assignments</span>
            <Search aria-hidden="true" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search residents or slots"
              className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 sm:w-44"
            />
          </label>
          <label>
            <span className="sr-only">Filter parking payment status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-orange-500 sm:w-auto"
            >
              <option>All statuses</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
          </label>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-3">Resident / unit</th>
              <th className="px-4 py-3">Assigned slot</th>
              <th className="px-4 py-3">Reservation period</th>
              <th className="px-4 py-3 text-right">Monthly fee</th>
              <th className="px-6 py-3 text-right">Payment status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLogs.map((log) => (
              <tr key={`${log.unit}-${log.slot}`} className="text-slate-600">
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="font-medium text-slate-800">{log.resident}</span>
                  <span className="ml-2 text-xs text-slate-400">{log.unit}</span>
                </td>
                <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-700">{log.slot}</td>
                <td className="whitespace-nowrap px-4 py-4">{log.period}</td>
                <td className="whitespace-nowrap px-4 py-4 text-right font-medium text-slate-800">
                  ₱{log.monthlyFee.toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${parkingStatusStyles[log.status]}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredLogs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-500">
                  No parking assignments match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="border-t border-slate-100 px-6 py-3 text-xs text-slate-400">
        Showing {filteredLogs.length} of {parkingLogs.length} sample assignments
      </div>
    </section>
  );
}
