import { CalendarClock, CircleDollarSign, Clock3, Layers3 } from "lucide-react";

type SummaryCard = {
  label: string;
  value: string;
  description: string;
  icon: typeof Layers3;
  iconStyle: string;
};

type AssessmentScheduleSummaryProps = {
  totalSchedules: number;
  activeCycles: number;
  upcomingDeadlines: number;
  scheduledAmount: number;
};

const pesoFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 2,
});

export function AssessmentScheduleSummary({
  totalSchedules,
  activeCycles,
  upcomingDeadlines,
  scheduledAmount,
}: AssessmentScheduleSummaryProps) {
  const cards: SummaryCard[] = [
    {
      label: "Scheduled assessments",
      value: totalSchedules.toString(),
      description: "All assessment schedules",
      icon: Layers3,
      iconStyle: "bg-orange-50 text-orange-700",
    },
    {
      label: "Active billing cycles",
      value: activeCycles.toString(),
      description: "Currently collecting",
      icon: CalendarClock,
      iconStyle: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Upcoming deadlines",
      value: upcomingDeadlines.toString(),
      description: "Payment dates ahead",
      icon: Clock3,
      iconStyle: "bg-amber-50 text-amber-700",
    },
    {
      label: "Scheduled dues",
      value: pesoFormatter.format(scheduledAmount),
      description: "Active and upcoming",
      icon: CircleDollarSign,
      iconStyle: "bg-sky-50 text-sky-700",
    },
  ];

  return (
    <section aria-label="Assessment schedule summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ label, value, description, icon: Icon, iconStyle }) => (
        <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
              <p className="mt-1 text-xs text-slate-400">{description}</p>
            </div>
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconStyle}`}>
              <Icon size={19} aria-hidden="true" />
            </span>
          </div>
        </article>
      ))}
    </section>
  );
}
