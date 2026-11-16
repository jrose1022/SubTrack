import { CalendarDays, Pencil, Search, UsersRound } from "lucide-react";
import type { AssessmentSchedule, AssessmentStatus, BillingPeriod } from "./assessment-schedule-types";

type AssessmentScheduleTableProps = {
  schedules: AssessmentSchedule[];
  search: string;
  statusFilter: AssessmentStatus | "All statuses";
  periodFilter: BillingPeriod | "All periods";
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: AssessmentStatus | "All statuses") => void;
  onPeriodFilterChange: (value: BillingPeriod | "All periods") => void;
  onEdit: (schedule: AssessmentSchedule) => void;
};

const pesoFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 2,
});

function formatDeadline(deadline: string) {
  return new Date(`${deadline}T00:00:00`).toLocaleDateString("en-PH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusStyle(status: AssessmentStatus) {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
    case "Upcoming":
      return "bg-amber-50 text-amber-700 ring-amber-600/20";
    case "Closed":
      return "bg-slate-100 text-slate-600 ring-slate-500/20";
    case "Draft":
      return "bg-violet-50 text-violet-700 ring-violet-600/20";
  }
}

const selectStyle =
  "h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100";

export function AssessmentScheduleTable({
  schedules,
  search,
  statusFilter,
  periodFilter,
  onSearchChange,
  onStatusFilterChange,
  onPeriodFilterChange,
  onEdit,
}: AssessmentScheduleTableProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50">
      <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Assessment schedules</h2>
          <p className="mt-1 text-sm text-slate-500">Manage recurring dues and one-time community assessments.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative block sm:min-w-56">
            <span className="sr-only">Search schedules</span>
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search schedules"
              className={`${selectStyle} w-full pl-9`}
            />
          </label>
          <label>
            <span className="sr-only">Filter by status</span>
            <select
              value={statusFilter}
              onChange={(event) => onStatusFilterChange(event.target.value as AssessmentStatus | "All statuses")}
              className={selectStyle}
            >
              <option>All statuses</option>
              <option>Active</option>
              <option>Upcoming</option>
              <option>Closed</option>
              <option>Draft</option>
            </select>
          </label>
          <label>
            <span className="sr-only">Filter by billing period</span>
            <select
              value={periodFilter}
              onChange={(event) => onPeriodFilterChange(event.target.value as BillingPeriod | "All periods")}
              className={selectStyle}
            >
              <option>All periods</option>
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Annual</option>
              <option>One-Time</option>
            </select>
          </label>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-3">Schedule</th>
              <th className="px-4 py-3">Billing period</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Payment deadline</th>
              <th className="px-4 py-3">Households / zones</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-6 py-3 text-right">Manage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {schedules.map((schedule) => (
              <tr key={schedule.id} className="align-middle text-slate-600 transition hover:bg-slate-50/70">
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-800">{schedule.title}</p>
                  <p className="mt-1 text-xs text-slate-400">{schedule.id}</p>
                </td>
                <td className="whitespace-nowrap px-4 py-4">
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{schedule.period}</span>
                </td>
                <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-800">{pesoFormatter.format(schedule.amount)}</td>
                <td className="whitespace-nowrap px-4 py-4">
                  <span className="inline-flex items-center gap-2 text-slate-600">
                    <CalendarDays size={15} className="text-slate-400" aria-hidden="true" />
                    {formatDeadline(schedule.deadline)}
                  </span>
                </td>
                <td className="max-w-56 px-4 py-4">
                  <span className="inline-flex items-start gap-2 text-xs leading-5 text-slate-600">
                    <UsersRound size={15} className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                    {schedule.households}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyle(schedule.status)}`}>
                    {schedule.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => onEdit(schedule)}
                    aria-label={`Edit ${schedule.title}`}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-orange-50 hover:text-orange-700"
                  >
                    <Pencil size={14} aria-hidden="true" />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {schedules.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-14 text-center">
                  <p className="font-medium text-slate-700">No schedules found</p>
                  <p className="mt-1 text-sm text-slate-400">Try a different search or filter.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="border-t border-slate-100 px-6 py-3 text-xs text-slate-400">
        Showing {schedules.length} {schedules.length === 1 ? "schedule" : "schedules"}
      </div>
    </section>
  );
}
