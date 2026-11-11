"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  LockKeyhole,
  QrCode,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

type Assessment = {
  id: string;
  name: string;
  dueDate: string;
  amount: number;
  detail: string;
};

type PaymentMethod = "qr" | "card" | "bank";

const assessments: Assessment[] = [
  {
    id: "hoa-dues",
    name: "October HOA dues",
    dueDate: "31 Oct 2026",
    amount: 100,
    detail: "Monthly community assessment",
  },
  {
    id: "parking",
    name: "October parking · P-01",
    dueDate: "31 Oct 2026",
    amount: 20,
    detail: "Assigned resident parking",
  },
];

const paymentMethods: {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: typeof QrCode;
}[] = [
  {
    id: "qr",
    label: "QR payment",
    description: "Scan a demonstration code",
    icon: QrCode,
  },
  {
    id: "card",
    label: "Credit or debit card",
    description: "Simulated card transaction",
    icon: CreditCard,
  },
  {
    id: "bank",
    label: "Online banking",
    description: "Simulated bank transfer",
    icon: Banknote,
  },
];

const peso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

function DemoQrCode() {
  const size = 21;
  const finders = [
    [0, 0],
    [0, 14],
    [14, 0],
  ];

  function isFinderCell(row: number, column: number) {
    for (const [top, left] of finders) {
      if (row < top || row >= top + 7 || column < left || column >= left + 7) {
        continue;
      }

      const localRow = row - top;
      const localColumn = column - left;
      return (
        localRow === 0 ||
        localRow === 6 ||
        localColumn === 0 ||
        localColumn === 6 ||
        (localRow >= 2 &&
          localRow <= 4 &&
          localColumn >= 2 &&
          localColumn <= 4)
      );
    }

    return null;
  }

  return (
    <svg
      aria-label="Decorative demonstration QR code; it cannot be used to make a payment"
      className="h-40 w-40 rounded-xl bg-white p-2"
      role="img"
      viewBox={`-1 -1 ${size + 2} ${size + 2}`}
    >
      {Array.from({ length: size }, (_, row) =>
        Array.from({ length: size }, (_, column) => {
          const finder = isFinderCell(row, column);
          const isDark =
            finder === null
              ? (row * 11 + column * 7 + row * column * 3) % 7 < 3
              : finder;

          return isDark ? (
            <rect
              key={`${row}-${column}`}
              fill="#20201f"
              height="1"
              width="1"
              x={column}
              y={row}
            />
          ) : null;
        }),
      )}
    </svg>
  );
}

export default function PaymentCheckoutCard() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState(
    assessments.map((assessment) => assessment.id),
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("qr");
  const [hasReviewed, setHasReviewed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedAssessments = useMemo(
    () => assessments.filter((assessment) => selectedIds.includes(assessment.id)),
    [selectedIds],
  );
  const total = useMemo(
    () => selectedAssessments.reduce((sum, assessment) => sum + assessment.amount, 0),
    [selectedAssessments],
  );
  const canSubmit = selectedAssessments.length > 0 && hasReviewed && !isSubmitting;

  function toggleAssessment(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    );
    setHasReviewed(false);
  }

  function confirmPayment() {
    if (!canSubmit) return;

    setIsSubmitting(true);
    const receipt = `ST-${Date.now().toString().slice(-8)}`;
    const transactionDate = new Date().toISOString();
    const query = new URLSearchParams({
      amount: total.toFixed(2),
      method: paymentMethods.find((method) => method.id === paymentMethod)?.label ?? "QR payment",
      receipt,
      assessments: selectedAssessments.map((assessment) => assessment.name).join(", "),
      date: transactionDate,
    });

    window.setTimeout(() => {
      router.push(`/?${query.toString()}`);
    }, 700);
  }

  return (
    <div className="min-h-screen bg-[#f7f7f6] text-[#292927]">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col bg-[#292a29] px-4 py-6 text-white lg:flex">
        <Link className="mb-10 flex items-center gap-3 px-1" href="/">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-[#252525]">
            <Building2 size={22} />
          </span>
          <span>
            <span className="block text-sm font-bold tracking-wide">SineGANG</span>
            <span className="block text-[10px] uppercase tracking-wider text-neutral-400">
              Homeowners Assn.
            </span>
          </span>
        </Link>

        <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
          Homeowner portal
        </p>
        <nav aria-label="Homeowner portal" className="space-y-1">
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-neutral-400 transition hover:bg-white/5 hover:text-white"
            href="/"
          >
            <WalletCards size={17} />
            Overview
          </Link>
          <Link
            aria-current="page"
            className="flex items-center gap-3 rounded-lg border-l-2 border-amber-500 bg-white/5 px-3 py-3 text-sm text-white"
            href="/"
          >
            <CreditCard size={17} className="text-amber-500" />
            Payments
          </Link>
        </nav>

        <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <ShieldCheck className="mb-3 text-amber-500" size={18} />
          <p className="text-xs font-semibold">Your household only</p>
          <p className="mt-1 text-[11px] leading-relaxed text-neutral-400">
            Statements and payments for household A-101.
          </p>
        </div>

        <div className="mt-auto border-t border-white/10 pt-4">
          <p className="text-xs font-medium">Adrian Lleva</p>
          <p className="mt-1 text-[11px] text-neutral-400">A-101 · Homeowner</p>
        </div>
      </aside>

      <div className="lg:pl-60">
        <header className="flex h-[60px] items-center justify-between border-b border-neutral-200 bg-white px-5 sm:px-8">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span className="font-medium text-neutral-700">SineGANG</span>
            <span aria-hidden="true">›</span>
            <span>Resident services</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-neutral-500">
            <span className="rounded-full bg-amber-50 px-3 py-1 font-medium text-amber-800">
              Demonstration data
            </span>
            <LockKeyhole className="ml-1" size={13} />
            <span className="hidden sm:inline">Secure session</span>
          </div>
        </header>

        <main className="mx-auto max-w-[1180px] px-5 py-8 sm:px-8 sm:py-10">
          <Link
            className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-neutral-500 transition hover:text-neutral-900"
            href="/"
          >
            <ArrowLeft size={14} />
            Back to portal
          </Link>

          <div className="mb-7">
            <p className="text-[10px] font-medium uppercase tracking-wide text-neutral-500">
              Household A-101 / October 2026
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-[30px]">
              Review your payment
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              Review your outstanding assessments before confirming a simulated payment.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
              <span className="inline-flex items-center gap-2 font-medium text-neutral-700">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Before payment · 09 Nov 2026
              </span>
              <span>PHP · Ledger SOA-A101-202610</span>
            </div>
          </div>

          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(290px,0.9fr)]">
            <div className="space-y-5">
              <section className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold">Payable assessments</h2>
                    <p className="mt-1 text-xs text-neutral-500">
                      Select the items you want to settle.
                    </p>
                  </div>
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-medium text-neutral-600">
                    {selectedAssessments.length} selected
                  </span>
                </div>

                <div className="hidden grid-cols-[32px_minmax(0,1fr)_100px_90px] rounded-lg bg-neutral-50 px-3 py-3 text-[10px] font-semibold uppercase tracking-wide text-neutral-500 sm:grid">
                  <span>Select</span>
                  <span>Assessment</span>
                  <span>Due date</span>
                  <span className="text-right">Amount</span>
                </div>
                <div className="divide-y divide-neutral-100">
                  {assessments.map((assessment) => {
                    const isSelected = selectedIds.includes(assessment.id);

                    return (
                      <label
                        key={assessment.id}
                        className="grid cursor-pointer grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-2 px-2 py-4 transition hover:bg-neutral-50/80 sm:grid-cols-[32px_minmax(0,1fr)_100px_90px] sm:px-3"
                      >
                        <input
                          checked={isSelected}
                          className="h-4 w-4 accent-amber-500"
                          onChange={() => toggleAssessment(assessment.id)}
                          type="checkbox"
                        />
                        <span className="min-w-0">
                          <span className="block text-xs font-medium text-neutral-800">
                            {assessment.name}
                          </span>
                          <span className="mt-1 block text-[10px] text-neutral-500 sm:hidden">
                            Due {assessment.dueDate}
                          </span>
                          <span className="mt-1 hidden text-[10px] text-neutral-500 sm:block">
                            {assessment.detail}
                          </span>
                        </span>
                        <span className="hidden text-xs text-neutral-600 sm:block">
                          {assessment.dueDate}
                        </span>
                        <span className="text-right text-xs font-medium">
                          {peso.format(assessment.amount)}
                        </span>
                      </label>
                    );
                  })}
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-neutral-100 pt-4 text-xs">
                  <span className="text-neutral-500">Selected amount</span>
                  <span className="font-semibold">{peso.format(total)}</span>
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-neutral-500">
                  Parking eligibility is renewed when the parking assessment is paid.
                </p>
              </section>

              <section className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-4">
                  <h2 className="text-sm font-semibold">Choose a simulated payment method</h2>
                  <p className="mt-1 text-xs text-neutral-500">
                    No bank or payment provider is connected.
                  </p>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;

                    return (
                      <button
                        aria-pressed={isSelected}
                        className={`flex min-h-[86px] items-start gap-3 rounded-xl border p-3 text-left transition ${
                          isSelected
                            ? "border-amber-500 bg-amber-50/70 ring-1 ring-amber-500"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        type="button"
                      >
                        <Icon
                          className={isSelected ? "text-amber-700" : "text-neutral-500"}
                          size={18}
                        />
                        <span>
                          <span className="block text-[11px] font-semibold">
                            {method.label}
                          </span>
                          <span className="mt-1 block text-[10px] leading-relaxed text-neutral-500">
                            {method.description}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-xl border border-dashed border-neutral-200 bg-neutral-50/70 p-4">
                  {paymentMethod === "qr" ? (
                    <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
                      <DemoQrCode />
                      <div>
                        <p className="text-xs font-semibold">Demonstration QR code</p>
                        <p className="mt-1 max-w-xs text-[11px] leading-relaxed text-neutral-500">
                          This decorative code is not scannable and will not initiate a
                          payment. Confirm below to complete the simulation.
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-neutral-600">
                          <Clock3 size={12} />
                          Ready for demonstration
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      {paymentMethod === "card" ? (
                        <CreditCard className="mt-0.5 text-neutral-500" size={18} />
                      ) : (
                        <Banknote className="mt-0.5 text-neutral-500" size={18} />
                      )}
                      <div>
                        <p className="text-xs font-semibold">
                          {paymentMethod === "card"
                            ? "Card payment simulation"
                            : "Online banking simulation"}
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
                          No card or banking details are needed. Confirm the transaction
                          below to record this demonstration payment.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <div className="flex flex-wrap gap-x-5 gap-y-2 rounded-xl border border-neutral-100 bg-white px-4 py-3 text-[11px] text-neutral-600 shadow-sm">
                {["Account verified", "Balance confirmed", "No duplicate payment"].map(
                  (item) => (
                    <span className="inline-flex items-center gap-1.5" key={item}>
                      <Check size={14} className="text-emerald-700" />
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            <aside className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-5">
              <h2 className="text-sm font-semibold">Transaction summary</h2>
              <p className="mt-5 text-[10px] font-medium uppercase tracking-wide text-neutral-500">
                Paying for
              </p>
              <p className="mt-1 text-sm font-semibold">Maya Bennett · A-101</p>
              <p className="mt-1 text-[11px] text-neutral-500">SOA-A101-202610</p>

              <div className="my-5 border-t border-neutral-100" />
              <dl className="space-y-4 text-xs">
                <div className="flex justify-between gap-3 text-neutral-500">
                  <dt>Prior balance</dt>
                  <dd className="font-medium text-neutral-800">{peso.format(120)}</dd>
                </div>
                <div className="flex justify-between gap-3 text-neutral-500">
                  <dt>Selected assessments</dt>
                  <dd className="font-medium text-neutral-800">{peso.format(total)}</dd>
                </div>
                <div className="flex justify-between gap-3 text-neutral-500">
                  <dt>Processing fee</dt>
                  <dd className="font-medium text-neutral-800">{peso.format(0)}</dd>
                </div>
              </dl>

              <div className="my-5 border-t border-neutral-100" />
              <div className="flex items-end justify-between gap-2">
                <span className="text-sm font-semibold">Payment</span>
                <span className="text-xl font-bold tracking-tight">{peso.format(total)}</span>
              </div>
              <div className="mt-3 flex justify-between text-[11px] text-neutral-500">
                <span>Balance after payment</span>
                <span className="font-medium text-neutral-700">
                  {peso.format(Math.max(0, 120 - total))}
                </span>
              </div>

              <div className="mt-5 rounded-xl bg-amber-50 p-3 text-[11px] leading-relaxed text-amber-950">
                <p className="font-semibold">Demonstration transaction</p>
                <p className="mt-1 text-amber-900/80">
                  No real currency will be transferred or deducted.
                </p>
              </div>

              <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-[11px] leading-relaxed text-neutral-600">
                <input
                  checked={hasReviewed}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-amber-500"
                  onChange={(event) => setHasReviewed(event.target.checked)}
                  type="checkbox"
                />
                I have reviewed the selected assessments and payment amount.
              </label>

              <button
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-3 text-xs font-semibold text-neutral-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500"
                disabled={!canSubmit}
                onClick={confirmPayment}
                type="button"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-neutral-500 border-t-transparent" />
                    Processing simulation…
                  </>
                ) : (
                  <>
                    Confirm simulated payment
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
              <Link
                className="mt-2 flex w-full items-center justify-center rounded-lg border border-neutral-200 px-4 py-3 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50"
                href="/"
              >
                Cancel · Back to portal
              </Link>
              <p className="mt-4 text-[10px] leading-relaxed text-neutral-500">
                Confirming creates a demonstration receipt and opens the payment success
                page. No live payment is processed.
              </p>
            </aside>
          </div>

          <footer className="mt-10 flex items-center gap-2 text-[10px] text-neutral-500">
            <CheckCircle2 size={13} />
            SineGANG HOA · Private community records
          </footer>
        </main>
      </div>
    </div>
  );
}
