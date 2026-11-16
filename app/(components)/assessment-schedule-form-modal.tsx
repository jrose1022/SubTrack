"use client";

import { useEffect, useState } from "react";
import { CalendarDays, X } from "lucide-react";
import type { AssessmentSchedule, AssessmentStatus, BillingPeriod } from "./assessment-schedule-types";

type ScheduleFormValues = Omit<AssessmentSchedule, "id">;

type AssessmentScheduleFormModalProps = {
  schedule: AssessmentSchedule | null;
  onClose: () => void;
  onSave: (values: ScheduleFormValues) => void;
};

const periods: BillingPeriod[] = ["Monthly", "Quarterly", "Annual", "One-Time"];
const statuses: AssessmentStatus[] = ["Active", "Upcoming", "Closed", "Draft"];
const fieldStyle =
  "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100";

export function AssessmentScheduleFormModal({ schedule, onClose, onSave }: AssessmentScheduleFormModalProps) {
  const [title, setTitle] = useState(schedule?.title ?? "");
  const [period, setPeriod] = useState<BillingPeriod>(schedule?.period ?? "Monthly");
  const [amount, setAmount] = useState(schedule?.amount.toString() ?? "");
  const [deadline, setDeadline] = useState(schedule?.deadline ?? "");
  const [households, setHouseholds] = useState(schedule?.households ?? "");
  const [status, setStatus] = useState<AssessmentStatus>(schedule?.status ?? "Draft");
  const [error, setError] = useState("");

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsedAmount = Number(amount);

    if (!title.trim() || !households.trim() || !deadline || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("Enter a title, a valid amount, a payment deadline, and applicable households or zones.");
      return;
    }

    onSave({ title: title.trim(), period, amount: parsedAmount, deadline, households: households.trim(), status });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/45 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-form-title"
        className="my-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/20"
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">Assessment management</p>
            <h2 id="schedule-form-title" className="mt-1 text-xl font-semibold text-slate-900">
              {schedule ? "Update assessment schedule" : "Create a new assessment schedule"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">Set the billing cycle, amount, and collection deadline.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close dialog" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <X size={19} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 px-6 py-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700 sm:col-span-2">
              Assessment title / type
              <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Monthly HOA Dues" className={fieldStyle} autoFocus />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Billing period
              <select value={period} onChange={(event) => setPeriod(event.target.value as BillingPeriod)} className={fieldStyle}>
                {periods.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium text-slate-700">
              Assessment amount (PHP)
              <div className="relative">
                <span className="absolute left-3 top-1/2 mt-0.5 -translate-y-1/2 text-sm text-slate-400">₱</span>
                <input type="number" min="0.01" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.00" className={`${fieldStyle} pl-8`} />
              </div>
            </label>
            <label className="text-sm font-medium text-slate-700">
              Payment deadline
              <div className="relative">
                <input type="date" value={deadline} onChange={(event) => setDeadline(event.target.value)} className={`${fieldStyle} pr-10`} />
                <CalendarDays size={16} aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 mt-0.5 -translate-y-1/2 text-slate-400" />
              </div>
            </label>
            <label className="text-sm font-medium text-slate-700">
              Status
              <select value={status} onChange={(event) => setStatus(event.target.value as AssessmentStatus)} className={fieldStyle}>
                {statuses.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium text-slate-700 sm:col-span-2">
              Applicable households / zones
              <input
                value={households}
                onChange={(event) => setHouseholds(event.target.value)}
                placeholder="e.g. All households · Zone A · A-101, A-102"
                className={fieldStyle}
              />
            </label>
            {error && <p role="alert" className="text-sm font-medium text-rose-600 sm:col-span-2">{error}</p>}
          </div>
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" className="h-10 rounded-xl bg-orange-500 px-5 text-sm font-semibold text-white shadow-sm shadow-orange-500/25 transition hover:bg-orange-600">
              {schedule ? "Save changes" : "Create schedule"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
