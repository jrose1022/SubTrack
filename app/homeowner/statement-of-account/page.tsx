"use client";

import { useState } from "react";

type Charge = {
  id: string;
  date: string; // due date, YYYY-MM-DD
  description: string;
  type: "dues" | "assessment";
  amount: number;
  status: "paid" | "unpaid";
};

type Payment = {
  id: string;
  date: string;
  description: string;
  amount: number;
  method: string;
  reference: string;
};

// Sample data. Replace with Supabase queries once the tables are agreed on.
const charges: Charge[] = [
  {
    id: "c1",
    date: "2026-09-01",
    description: "Monthly dues",
    type: "dues",
    amount: 1500,
    status: "paid",
  },
  {
    id: "c2",
    date: "2026-10-01",
    description: "Monthly dues",
    type: "dues",
    amount: 1500,
    status: "paid",
  },
  {
    id: "c3",
    date: "2026-10-15",
    description: "Road repair assessment",
    type: "assessment",
    amount: 2500,
    status: "unpaid",
  },
  {
    id: "c4",
    date: "2026-11-01",
    description: "Monthly dues",
    type: "dues",
    amount: 1500,
    status: "unpaid",
  },
];

const payments: Payment[] = [
  {
    id: "p1",
    date: "2026-09-05",
    description: "September dues",
    amount: 1500,
    method: "GCash",
    reference: "GC-100231",
  },
  {
    id: "p2",
    date: "2026-10-04",
    description: "October dues",
    amount: 1500,
    method: "Bank transfer",
    reference: "BT-558120",
  },
];

const peso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

const total = (items: { amount: number }[]) =>
  items.reduce((sum, item) => sum + item.amount, 0);

const inRange = (date: string, from: string, to: string) =>
  (!from || date >= from) && (!to || date <= to);

function ChargeTable({
  items,
  onSelect,
}: {
  items: Charge[];
  onSelect: (id: string) => void;
}) {
  if (items.length === 0) {
    return (
      <p className="mt-3 text-sm text-gray-500">No charges in this range.</p>
    );
  }
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b text-gray-500">
            <th className="py-2 pr-4">Due date</th>
            <th className="py-2 pr-4">Description</th>
            <th className="py-2 pr-4 text-right">Amount</th>
            <th className="py-2 pr-4">Status</th>
            <th className="py-2 print:hidden"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.id} className="border-b last:border-0">
              <td className="py-2 pr-4">{c.date}</td>
              <td className="py-2 pr-4">{c.description}</td>
              <td className="py-2 pr-4 text-right">{peso.format(c.amount)}</td>
              <td
                className={`py-2 pr-4 ${c.status === "unpaid" ? "text-red-600" : ""}`}
              >
                {c.status === "unpaid" ? "Unpaid" : "Paid"}
              </td>
              <td className="py-2 print:hidden">
                <button className="underline" onClick={() => onSelect(c.id)}>
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function HomeownerStatementOfAccountPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredCharges = charges.filter((c) => inRange(c.date, from, to));
  const filteredPayments = payments.filter((p) => inRange(p.date, from, to));
  const unpaid = filteredCharges.filter((c) => c.status === "unpaid");
  const outstanding = total(unpaid);

  const cards = [
    {
      label: "Total charges",
      value: peso.format(total(filteredCharges)),
      alert: false,
    },
    {
      label: "Total paid",
      value: peso.format(total(filteredPayments)),
      alert: false,
    },
    {
      label: "Outstanding balance",
      value: peso.format(outstanding),
      alert: outstanding > 0,
    },
    {
      label: "Unpaid items",
      value: String(unpaid.length),
      alert: unpaid.length > 0,
    },
  ];

  const breakdown = [
    {
      label: "Monthly dues",
      items: filteredCharges.filter((c) => c.type === "dues"),
    },
    {
      label: "Assessments",
      items: filteredCharges.filter((c) => c.type === "assessment"),
    },
  ];

  const selectedCharge = charges.find((c) => c.id === selectedId);
  const selectedPayment = payments.find((p) => p.id === selectedId);
  const details: [string, string][] = selectedCharge
    ? [
        [
          "Type",
          selectedCharge.type === "dues" ? "Monthly dues" : "Assessment",
        ],
        ["Description", selectedCharge.description],
        ["Due date", selectedCharge.date],
        ["Amount", peso.format(selectedCharge.amount)],
        ["Status", selectedCharge.status === "unpaid" ? "Unpaid" : "Paid"],
      ]
    : selectedPayment
      ? [
          ["Description", selectedPayment.description],
          ["Date paid", selectedPayment.date],
          ["Method", selectedPayment.method],
          ["Reference no.", selectedPayment.reference],
          ["Amount", peso.format(selectedPayment.amount)],
        ]
      : [];

  return (
    <main className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Statement of Account</h1>
        <button
          className="rounded border px-3 py-1 text-sm print:hidden"
          onClick={() => window.print()}
        >
          Print statement
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-3 print:hidden">
        <label className="text-sm">
          From
          <input
            type="date"
            className="mt-1 block rounded border p-1"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </label>
        <label className="text-sm">
          To
          <input
            type="date"
            className="mt-1 block rounded border p-1"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </label>
        <button
          className="rounded border px-3 py-1 text-sm"
          onClick={() => {
            setFrom("");
            setTo("");
          }}
        >
          Clear
        </button>
      </div>
      {(from || to) && (
        <p className="mt-2 hidden text-sm print:block">
          Showing {from || "the start"} to {to || "the latest date"}
        </p>
      )}

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">{card.label}</p>
            <p
              className={`mt-1 text-2xl font-semibold ${card.alert ? "text-red-600" : ""}`}
            >
              {card.value}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-lg border p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold">Outstanding balances</h2>
          <p className="text-sm text-red-600">{peso.format(outstanding)} due</p>
        </div>
        <ChargeTable items={unpaid} onSelect={setSelectedId} />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        {breakdown.map((group) => (
          <div key={group.label} className="rounded-lg border p-4">
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold">{group.label}</h2>
              <p className="text-sm text-gray-500">
                {peso.format(total(group.items))} total
              </p>
            </div>
            <ChargeTable items={group.items} onSelect={setSelectedId} />
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-lg border p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold">Payment history</h2>
          <p className="text-sm text-gray-500">
            {peso.format(total(filteredPayments))} paid
          </p>
        </div>
        {filteredPayments.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">
            No payments in this range.
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Description</th>
                  <th className="py-2 pr-4">Method</th>
                  <th className="py-2 pr-4 text-right">Amount</th>
                  <th className="py-2 print:hidden"></th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((p) => (
                  <tr key={p.id} className="border-b last:border-0">
                    <td className="py-2 pr-4">{p.date}</td>
                    <td className="py-2 pr-4">{p.description}</td>
                    <td className="py-2 pr-4">{p.method}</td>
                    <td className="py-2 pr-4 text-right">
                      {peso.format(p.amount)}
                    </td>
                    <td className="py-2 print:hidden">
                      <button
                        className="underline"
                        onClick={() => setSelectedId(p.id)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {details.length > 0 && (
        <section className="mt-8 rounded-lg border p-4 print:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Transaction details</h2>
            <button
              className="text-sm underline"
              onClick={() => setSelectedId(null)}
            >
              Close
            </button>
          </div>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
            {details.map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="text-gray-500">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </main>
  );
}
