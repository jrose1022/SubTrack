"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  CarFront,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Download,
  FileBarChart2,
  LayoutDashboard,
  MapPin,
  ReceiptText,
  UsersRound,
} from "lucide-react";
import { CollectionsChart } from "../(components)/collections-chart";
import { ParkingUtilization } from "../(components)/parking-utilization";
import { PaymentTransactions } from "../(components)/payment-transactions";
import { ReportSummaryCard } from "../(components)/report-summary-card";

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Payments", icon: CreditCard },
  { label: "Residents", icon: UsersRound },
  { label: "Parking", icon: CarFront },
];

export default function BoardReportsPage() {
  return (
    <main className="min-h-screen bg-[#f6f6f6] text-slate-900">
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col bg-[#2c2c2c] text-white lg:flex">
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-7">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f28c00] text-white">
            <FileBarChart2 size={21} strokeWidth={2.2} />
          </span>
          <div>
            <p className="text-lg font-semibold tracking-tight">SubTrack</p>
            <p className="text-[10px] font-medium uppercase tracking-[.18em] text-slate-400">Community portal</p>
          </div>
        </div>
        <div className="px-4 pt-8">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[.16em] text-slate-500">Workspace</p>
          <nav className="mt-3 space-y-1" aria-label="Main navigation">
            {navigation.map(({ label, icon: Icon }, index) => (
              <a
                key={label}
                href="#"
                aria-current={index === 0 ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                  index === 0
                    ? "border-l-2 border-[#f28c00] bg-white/10 text-white"
                    : "text-slate-400 transition hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-auto border-t border-white/10 p-5">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f28c00] text-xs font-bold text-white">JD</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Jordan Davis</p>
              <p className="text-xs text-slate-400">Board administrator</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="flex h-20 items-center justify-between border-b border-white/10 bg-[#2c2c2c] px-5 text-white sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f28c00] text-white lg:hidden">
              <FileBarChart2 size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Administrator / Reports</p>
              <p className="mt-0.5 text-sm font-semibold text-white">Board reports</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 sm:gap-3">
            <span className="hidden items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-slate-300 sm:flex">
              <Clock3 size={15} />
              Reporting period: Nov 2025
            </span>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-[#f28c00] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#db7e00] sm:px-4 sm:text-sm"
              onClick={() => window.print()}
            >
              <Download size={15} />
              <span className="hidden sm:inline">Export report</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
          <section className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#d97700]">November 2025 · Board overview</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Community at a glance</h1>
              <p className="mt-2 text-sm text-slate-500">Financial health and day-to-day operations for your association.</p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
              <span className="h-2 w-2 rounded-full bg-[#f28c00]" />
              Data updated today, 9:41 AM
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Key performance indicators">
            <ReportSummaryCard
              label="Total collections"
              value="₱842,650"
              detail={<ArrowUpRight size={14} className="inline" />}
              detailLabel="8.4% vs last month"
              icon={CircleDollarSign}
              tone="orange"
            />
            <ReportSummaryCard
              label="Outstanding dues"
              value="₱126,400"
              detail={<ArrowDownRight size={14} className="inline" />}
              detailLabel="5.2% vs last month"
              icon={ReceiptText}
              tone="orange"
            />
            <ReportSummaryCard
              label="Payment transactions"
              value="248"
              detail={<ArrowUpRight size={14} className="inline" />}
              detailLabel="18 this week"
              icon={CreditCard}
              tone="orange"
            />
            <ReportSummaryCard
              label="Parking utilization"
              value="76%"
              detail={<MapPin size={14} className="inline" />}
              detailLabel="38 of 50 slots reserved / paid"
              icon={CarFront}
              tone="orange"
            />
          </section>

          <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,.85fr)]">
            <CollectionsChart />
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Parking allocation</h2>
                  <p className="mt-1 text-sm text-slate-500">Slot reservation &amp; payment status</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                  <CarFront size={19} />
                </span>
              </div>
              <div className="mt-6 flex items-center gap-5">
                <div
                  className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "conic-gradient(#f28c00 0% 76%, #e5e7eb 76% 100%)" }}
                  role="img"
                  aria-label="38 of 50 parking slots are reserved or paid"
                >
                  <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
                    <span className="text-2xl font-semibold text-slate-900">76%</span>
                    <span className="text-[11px] text-slate-400">reserved</span>
                  </div>
                </div>
                <div className="min-w-0 flex-1 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="h-2 w-2 rounded-full bg-[#f28c00]" /> Reserved / Paid
                    </span>
                    <span className="text-sm font-semibold text-slate-800">38 spaces</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="h-2 w-2 rounded-full bg-slate-200" /> Unallocated
                    </span>
                    <span className="text-sm font-semibold text-slate-800">12 slots</span>
                  </div>
                  <div className="border-t border-slate-100 pt-3">
                    <p className="text-xs text-slate-400">Reservation status</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">Paid active: 35 <span className="font-normal text-slate-400">· Pending renewal: 3</span></p>
                  </div>
                </div>
              </div>
            </section>
          </section>

          <div className="mt-6">
            <PaymentTransactions />
          </div>
          <div className="mt-6">
            <ParkingUtilization />
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-2 py-6 text-xs text-slate-400">
            <span>SubTrack · Board reports</span>
            <span>Figures shown are illustrative HOA reporting data.</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
