import { Car } from "lucide-react";

type SlotStatus = "Occupied" | "Vacant" | "Unassigned";

type Slot = {
  id: string;
  status: SlotStatus;
  mine?: boolean;
};

type HistoryEntry = {
  id: string;
  updated: string;
  event: string;
  classification: SlotStatus;
  reference: string;
};

// Sample data. Replace with Supabase queries once the tables are agreed on.
const household = {
  unit: "A-101",
  period: "October 2026",
  activePayer: "Adrian Lleva",
  paidThrough: "31 Oct 2026",
  lastUpdated: "18 Oct 2026, 10:42",
  receipt: "SIM-261018-0042",
};

const lotName = "Maple Court";

const slots: Slot[] = [
  { id: "P-01", status: "Occupied", mine: true },
  { id: "P-02", status: "Occupied" },
  { id: "P-03", status: "Vacant" },
  { id: "P-04", status: "Vacant" },
  { id: "P-05", status: "Unassigned" },
  { id: "P-06", status: "Unassigned" },
];

const history: HistoryEntry[] = [
  {
    id: "h1",
    updated: "18 Oct 2026, 10:42",
    event: "October dues + parking paid",
    classification: "Occupied",
    reference: "SIM-261018-0042",
  },
  {
    id: "h2",
    updated: "01 Oct 2026, 00:00",
    event: "Prior paid-through period ended",
    classification: "Vacant",
    reference: "AUTO-OCT-001",
  },
  {
    id: "h3",
    updated: "15 Sep 2026, 09:12",
    event: "September dues + parking paid",
    classification: "Occupied",
    reference: "SIM-260915-0038",
  },
];

const legend: { status: SlotStatus; description: string }[] = [
  {
    status: "Occupied",
    description:
      "Allocated to a household with an active payer for current HOA dues and parking.",
  },
  {
    status: "Vacant",
    description:
      "An allocation exists, but nobody is actively paying for the current period.",
  },
  {
    status: "Unassigned",
    description:
      "No household allocation and no active payer. Available for administrator review.",
  },
];

const mySlot = slots.find((s) => s.mine);
const countOf = (status: SlotStatus) =>
  slots.filter((s) => s.status === status).length;

export default function HomeownerParkingPage() {
  return (
    <main className="p-6">
      <p className="text-xs uppercase tracking-wide text-gray-500">
        Household {household.unit} / {household.period}
      </p>
      <h1 className="mt-2 text-3xl font-bold">
        Your parking, in good standing.
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Payment-driven eligibility and a clear view of community availability.
      </p>

      <div className="mt-4 flex items-center justify-between text-xs">
        <p className="flex items-center gap-2 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          After payment · {household.lastUpdated}
        </p>
        <p className="text-gray-500">PHP · Ledger</p>
      </div>

      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold">Your allocated slot</h2>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-3xl font-bold">{mySlot?.id ?? "None"}</p>
            {mySlot && (
              <span className="rounded-full border border-orange-300 bg-orange-50 px-3 py-0.5 text-xs font-medium text-orange-700">
                {mySlot.status}
              </span>
            )}
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            {[
              ["Household", household.unit],
              ["Active payer", household.activePayer],
              ["Paid through", household.paidThrough],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-gray-500">{label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 border-t pt-4 text-sm text-gray-600">
            October HOA dues and parking are fully paid. Your allocation is
            eligible for the current period.
          </p>
          <p className="mt-4 text-xs text-gray-500">
            Last updated {household.lastUpdated}. Linked receipt:{" "}
            {household.receipt}.
          </p>
        </section>

        <section className="rounded-2xl border bg-white p-5 shadow-sm lg:col-span-2">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="text-sm font-semibold">
              {lotName} · Parking availability
            </h2>
            <p className="text-xs font-medium">{slots.length} total slots</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className={`flex flex-col items-center gap-1 rounded-xl border p-4 text-center ${
                  slot.mine ? "border-orange-400 bg-orange-50" : "bg-white"
                }`}
              >
                <p className="flex items-center gap-2 font-semibold">
                  {slot.status === "Occupied" && <Car size={16} />}
                  {slot.id}
                </p>
                <p className="text-xs">{slot.status}</p>
                {slot.mine && (
                  <p className="text-xs text-gray-600">Your allocation</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {legend.map((item) => (
          <div
            key={item.status}
            className="rounded-xl border bg-white p-4 shadow-sm"
          >
            <p className="text-xs font-semibold">
              {item.status} · {countOf(item.status)}{" "}
              {countOf(item.status) === 1 ? "slot" : "slots"}
            </p>
            <p className="mt-1 text-xs text-gray-500">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-sm font-semibold">Your parking history</h2>
          <p className="text-xs font-medium">Household {household.unit} only</p>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-100 text-xs text-gray-600">
                <th className="px-3 py-2">Updated</th>
                <th className="px-3 py-2">Event</th>
                <th className="px-3 py-2">Classification</th>
                <th className="px-3 py-2">Reference</th>
              </tr>
            </thead>
            <tbody>
              {history.map((row) => (
                <tr key={row.id} className="border-b last:border-0">
                  <td className="whitespace-nowrap px-3 py-3 font-semibold">
                    {row.updated}
                  </td>
                  <td className="px-3 py-3">{row.event}</td>
                  <td className="px-3 py-3">{row.classification}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {row.reference}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="mt-6 text-xs text-gray-500">
        SineGANG HOA · Private community records
      </p>
    </main>
  );
}
