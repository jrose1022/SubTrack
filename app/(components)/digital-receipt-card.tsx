"use client";

import Link from "next/link";
import { ArrowLeft, Building2, Download, Printer, ReceiptText } from "lucide-react";

const peso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

const dateTime = new Intl.DateTimeFormat("en-PH", {
  dateStyle: "long",
  timeStyle: "short",
});

type DigitalReceiptCardProps = {
  amount?: string;
  assessments?: string;
  date?: string;
  household?: string;
  homeowner?: string;
  method?: string;
  receipt?: string;
  status?: string;
};

const paymentMethods = ["QR payment", "Credit or debit card", "Online banking"];

export default function DigitalReceiptCard({
  amount: amountParam,
  assessments: assessmentsParam,
  date: dateParam,
  household: householdParam,
  homeowner: homeownerParam,
  method: methodParam,
  receipt: receiptParam,
  status: statusParam,
}: DigitalReceiptCardProps) {
  const amountValue = Number(amountParam);
  const amount =
    Number.isFinite(amountValue) && amountValue >= 0 ? amountValue : null;
  const transactionDate = dateParam ? new Date(dateParam) : null;
  const reference =
    receiptParam && /^ST-\d{8}$/.test(receiptParam) ? receiptParam : null;
  const method = paymentMethods.includes(methodParam ?? "")
    ? methodParam
    : null;
  const homeowner = homeownerParam?.trim() || null;
  const household = householdParam?.trim() || null;
  const assessments =
    assessmentsParam
      ?.split(", ")
      .map((assessment) => assessment.trim())
      .filter(Boolean) ?? [];
  const isComplete =
    reference !== null &&
    amount !== null &&
    method !== null &&
    homeowner !== null &&
    household !== null &&
    assessments.length > 0 &&
    transactionDate !== null &&
    Number.isFinite(transactionDate.getTime());

  function printReceipt() {
    window.print();
  }

  if (!isComplete || !reference || amount === null || !transactionDate) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f7f6] px-5 py-10 text-[#292927]">
        <section className="w-full max-w-md rounded-2xl border border-neutral-100 bg-white p-7 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-700">
            <ReceiptText size={22} />
          </div>
          <h1 className="mt-4 text-lg font-semibold">Receipt unavailable</h1>
          <p className="mt-2 text-sm leading-relaxed text-neutral-500">
            This receipt needs a valid payment transaction reference. Open it from
            the payment confirmation page.
          </p>
          <Link
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-xs font-semibold text-neutral-950 transition hover:bg-amber-400"
            href="/"
          >
            <ArrowLeft size={14} />
            Return to checkout
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f6] px-5 py-8 text-[#292927] sm:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="print-hidden mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            className="inline-flex items-center gap-2 text-xs font-medium text-neutral-600 transition hover:text-neutral-950"
            href="/"
          >
            <ArrowLeft size={14} />
            Back to checkout
          </Link>
          <div className="flex gap-2">
            <button
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50"
              onClick={printReceipt}
              type="button"
            >
              <Printer size={15} />
              Print receipt
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-3 py-2.5 text-xs font-semibold text-neutral-950 transition hover:bg-amber-400"
              onClick={printReceipt}
              title="Choose Save as PDF in your browser's print dialog"
              type="button"
            >
              <Download size={15} />
              Save as PDF
            </button>
          </div>
        </div>

        <article className="receipt-paper rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
          <header className="flex flex-wrap items-start justify-between gap-5 border-b border-neutral-200 pb-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-neutral-950">
                <Building2 size={23} />
              </span>
              <div>
                <p className="text-sm font-bold tracking-wide">SineGANG</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-neutral-500">
                  Homeowners Association
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Digital receipt
              </p>
              <p className="mt-1 text-sm font-bold">{reference}</p>
            </div>
          </header>

          <div className="flex flex-wrap items-end justify-between gap-4 py-7">
            <div>
              <p className="text-xs text-neutral-500">Payment status</p>
              <p className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                {statusParam?.trim() || "Completed · Simulation"}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs text-neutral-500">Amount paid</p>
              <p className="mt-1 text-3xl font-bold tracking-tight">
                {peso.format(amount)}
              </p>
            </div>
          </div>

          <section className="border-t border-neutral-200 pt-6">
            <h1 className="text-sm font-semibold">Transaction details</h1>
            <dl className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              <div>
                <dt className="text-[10px] font-medium uppercase tracking-wide text-neutral-500">
                  Homeowner
                </dt>
                <dd className="mt-1 text-sm font-medium">{homeowner}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-medium uppercase tracking-wide text-neutral-500">
                  Household
                </dt>
                <dd className="mt-1 text-sm font-medium">{household}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-medium uppercase tracking-wide text-neutral-500">
                  Transaction reference
                </dt>
                <dd className="mt-1 text-sm font-medium">{reference}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-medium uppercase tracking-wide text-neutral-500">
                  Transaction date
                </dt>
                <dd className="mt-1 text-sm font-medium">
                  {dateTime.format(transactionDate)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-medium uppercase tracking-wide text-neutral-500">
                  Payment method
                </dt>
                <dd className="mt-1 text-sm font-medium">{method}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-medium uppercase tracking-wide text-neutral-500">
                  Payment status
                </dt>
                <dd className="mt-1 text-sm font-medium text-emerald-700">
                  {statusParam?.trim() || "Completed · Simulation"}
                </dd>
              </div>
            </dl>
          </section>

          <section className="mt-7 border-t border-neutral-200 pt-6">
            <h2 className="text-sm font-semibold">Assessment description</h2>
            <ul className="mt-3 divide-y divide-neutral-100 rounded-xl border border-neutral-100">
              {assessments.map((assessment) => (
                <li className="px-4 py-3 text-xs" key={assessment}>
                  {assessment}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 text-sm font-semibold">
              <span>Total paid</span>
              <span>{peso.format(amount)}</span>
            </div>
          </section>

          <footer className="mt-8 border-t border-neutral-200 pt-5 text-center text-[10px] leading-relaxed text-neutral-500">
            <p>This receipt confirms a simulated transaction for demonstration.</p>
            <p className="mt-1">No real currency was transferred or deducted.</p>
          </footer>
        </article>

        <p className="print-hidden mt-4 text-center text-[10px] text-neutral-500">
          To save a PDF, choose “Save as PDF” in the print dialog.
        </p>
      </div>
    </main>
  );
}