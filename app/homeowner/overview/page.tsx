import Link from "next/link";
import { ArrowRight, CalendarDays, FileText, House } from "lucide-react";

type Activity = {
  id: string;
  date: string;
  description: string;
  amount: number; // positive = charge, negative = payment
};

// Sample data. Replace with Supabase queries once the tables are agreed on.
const household = {
  unit: "A-101",
  court: "Maple Court",
  id: "HH-001",
  owner: "Adrian Lleva",
  greetingName: "Lleva",
  email: "maya.bennett@example.com",
  account: "Registered",
  cycle: "Monthly",
  period: "October 2026",
  asOf: "Before payment · 18 Oct 2026, 10:40",
};

const balance = {
  due: "31 Oct 2026",
  hoa: 100,
  parking: 20,
  prior: 0,
};

const parking = {
  slot: "P-01",
  status: "Vacant",
  paidThrough: "30 Sep 2026",
};

const activity: Activity[] = [
  {
    id: "a1",
    date: "01 Oct 2026",
    description: "October HOA dues assessed",
    amount: 100,
  },
  {
    id: "a2",
    date: "01 Oct 2026",
    description: "October parking assessed · P-01",
    amount: 20,
  },
  {
    id: "a3",
    date: "15 Sep 2026",
    description: "Payment · SIM-260915-0038",
    amount: -120,
  },
];

const nextAssessment = {
  date: "01 Nov",
  hoa: 100,
  parking: 20,
  due: "30 Nov 2026",
};

const peso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});
const signed = (n: number) =>
  n < 0 ? `− ${peso.format(Math.abs(n))}` : peso.format(n);

const badge =
  "rounded-full border border-orange-300 bg-orange-50 px-3 py-0.5 text-xs font-medium text-orange-700";
const card = "rounded-2xl border border-stone-200 bg-white p-5 shadow-md";

export default function HomeownerOverviewPage() {
  const outstanding = balance.hoa + balance.parking + balance.prior;

  const breakdown: [string, number][] = [
    ["October HOA dues", balance.hoa],
    ["October parking · P-01", balance.parking],
    ["Prior balance / fees", balance.prior],
  ];

  const householdRows: [string, string][] = [
    ["Household ID", household.id],
    ["Resident account", household.account],
    ["Assessment cycle", household.cycle],
  ];

  return (
    <main className="p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Household {household.unit} / {household.period}
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            Good morning, {household.greetingName}.
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Your household account, at a glance. Everything is connected to unit{" "}
            {household.unit}.
          </p>
        </div>
        <Link
          href="/homeowner/statement-of-account"
          className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-2 text-xs font-semibold shadow-sm"
        >
          <FileText size={14} />
          View statement
        </Link>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <p className="flex items-center gap-2 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          {household.asOf}
        </p>
        <p className="text-gray-500">PHP · Ledger</p>
      </div>

      <div className="mt-4 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          <section className={card}>
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-sm font-semibold">Outstanding balance</h2>
              <span className={badge}>Due {balance.due}</span>
            </div>
            <p className="mt-4 text-4xl font-bold">
              {peso.format(outstanding)}
            </p>
            <dl className="mt-4 grid gap-3 text-xs text-gray-500 sm:grid-cols-3">
              {breakdown.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd className="mt-1 text-sm font-bold text-black">
                    {peso.format(value)}
                  </dd>
                </div>
              ))}
            </dl>
            {outstanding > 0 && (
              <div className="mt-4 border-t border-stone-200 pt-4">
                <Link
                  href="/homeowner/payment"
                  className="flex w-fit items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow"
                >
                  <ArrowRight size={14} />
                  Payment
                </Link>
              </div>
            )}
          </section>

          <section className={card}>
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-sm font-semibold">Recent account activity</h2>
              <Link
                href="/homeowner/statement-of-account"
                className="text-xs font-semibold"
              >
                View full ledger →
              </Link>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[26rem] text-left text-sm">
                <thead>
                  <tr className="bg-gray-100 text-xs text-gray-600">
                    <th className="px-3 py-2">Date</th>
                    <th className="px-3 py-2">Description</th>
                    <th className="px-3 py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {activity.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-stone-200 last:border-0"
                    >
                      <td className="whitespace-nowrap px-3 py-3 font-semibold">
                        {row.date}
                      </td>
                      <td className="px-3 py-3">{row.description}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-right">
                        {signed(row.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              Latest payment was applied to September dues and parking.
            </p>
          </section>

          <section className={card}>
            <h2 className="text-sm font-semibold">Next assessment</h2>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold">
                  {nextAssessment.date}{" "}
                  <span className="ml-1">
                    {peso.format(nextAssessment.hoa + nextAssessment.parking)}
                  </span>
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  HOA ₱{nextAssessment.hoa} + parking ₱{nextAssessment.parking}{" "}
                  · Due {nextAssessment.due}
                </p>
              </div>
              <CalendarDays size={20} className="text-gray-600" />
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-6">
          <section className={card}>
            <h2 className="text-sm font-semibold">Your household</h2>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 bg-stone-50">
                <House size={18} />
              </div>
              <div>
                <p className="text-sm font-bold">
                  {household.unit} · {household.court}
                </p>
                <p className="text-xs text-gray-500">{household.owner}</p>
              </div>
            </div>
            <dl className="mt-4 space-y-2 text-xs">
              {householdRows.map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <dt className="text-gray-500">{label}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-gray-500">{household.email}</p>
          </section>

          <section className={card}>
            <h2 className="text-sm font-semibold">Parking compliance</h2>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-3xl font-bold">{parking.slot}</p>
              <span className={badge}>{parking.status}</span>
            </div>
            <div className="mt-3 flex justify-between text-xs">
              <span className="text-gray-500">Paid through</span>
              <span className="font-medium">{parking.paidThrough}</span>
            </div>
            <p className="mt-4 text-xs text-gray-600">
              Allocated to {household.unit}, but no active payer for October.
              The slot is not currently occupied in the payment ledger.
            </p>
            <p className="mt-3 text-xs font-bold">
              Pay October dues + parking to restore eligibility.
            </p>
          </section>

          <aside className="rounded-xl border border-stone-200 bg-white p-4 text-xs shadow-sm">
            <p className="font-semibold">Safe to explore</p>
            <p className="mt-1 text-gray-500">
              Checkout uses a mock method. A simulated receipt updates the
              ledger and parking status together.
            </p>
          </aside>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-500">
        SineGANG HOA · Private community records
      </p>
    </main>
  );
}
