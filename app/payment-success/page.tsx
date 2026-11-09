import { CheckCircle2, Home, Receipt } from "lucide-react";

type PaymentSuccessPageProps = {
  searchParams: Promise<{
    amount?: string;
    method?: string;
    receipt?: string;
    assessments?: string;
  }>;
};

const peso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const params = await searchParams;
  const amountValue = Number(params.amount);
  const amount = Number.isFinite(amountValue) && amountValue >= 0 ? amountValue : 120;
  const receipt =
    params.receipt && /^ST-\d{8}$/.test(params.receipt) ? params.receipt : "ST-DEMO";
  const method = ["QR payment", "Credit or debit card", "Online banking"].includes(
    params.method ?? "",
  )
    ? params.method
    : "QR payment";
  const assessments =
    params.assessments?.split(", ").filter(Boolean).join(", ") ||
    "October HOA dues, October parking · P-01";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f7f6] px-5 py-10 text-[#292927]">
      <section className="w-full max-w-xl rounded-3xl border border-neutral-100 bg-white p-7 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <CheckCircle2 size={34} strokeWidth={1.8} />
        </div>
        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Simulation complete
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Payment successful
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-neutral-500">
          Your simulated payment has been recorded for demonstration. No real money was
          transferred.
        </p>

        <div className="mt-8 rounded-2xl bg-neutral-50 p-5 text-left sm:p-6">
          <div className="flex items-center justify-between gap-4 border-b border-neutral-200 pb-4">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-600">
              <Receipt size={15} />
              Demonstration receipt
            </span>
            <span className="text-xs font-semibold">{receipt}</span>
          </div>
          <div className="py-5 text-center">
            <p className="text-[10px] font-medium uppercase tracking-wide text-neutral-500">
              Amount paid
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight">{peso.format(amount)}</p>
          </div>
          <dl className="space-y-3 border-t border-neutral-200 pt-4 text-xs">
            <div className="flex justify-between gap-3">
              <dt className="text-neutral-500">Homeowner</dt>
              <dd className="font-medium">Maya Bennett · A-101</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-neutral-500">Payment method</dt>
              <dd className="font-medium">{method}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-neutral-500">Assessments</dt>
              <dd className="max-w-[65%] text-right font-medium">{assessments}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-neutral-500">Status</dt>
              <dd className="font-semibold text-emerald-700">Completed · Simulation</dd>
            </div>
          </dl>
        </div>

        <a
          className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-3 text-xs font-semibold text-neutral-950 transition hover:bg-amber-400"
          href="/payment-checkout"
        >
          <Home size={15} />
          Return to payments
        </a>
        <p className="mt-4 text-[10px] text-neutral-500">
          SineGANG HOA · Household A-101
        </p>
      </section>
    </main>
  );
}
