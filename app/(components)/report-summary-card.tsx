import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type ReportSummaryCardProps = {
  label: string;
  value: string;
  detail: ReactNode;
  detailLabel: string;
  icon: LucideIcon;
  tone: "orange";
};

const toneStyles = {
  orange: "bg-orange-50 text-orange-700",
};

export function ReportSummaryCard({
  label,
  value,
  detail,
  detailLabel,
  icon: Icon,
  tone,
}: ReportSummaryCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
        </div>
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${toneStyles[tone]}`}>
          <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
        </span>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs">
        <span className="font-semibold text-orange-700">{detail}</span>
        <span className="text-slate-400">{detailLabel}</span>
      </div>
    </article>
  );
}
