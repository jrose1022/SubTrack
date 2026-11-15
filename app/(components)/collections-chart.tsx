"use client";

import { useState } from "react";

const chartData = {
  "6 months": [
    { month: "Jun", value: 38 },
    { month: "Jul", value: 48 },
    { month: "Aug", value: 44 },
    { month: "Sep", value: 62 },
    { month: "Oct", value: 56 },
    { month: "Nov", value: 78 },
  ],
  "12 months": [
    { month: "Dec", value: 31 },
    { month: "Jan", value: 39 },
    { month: "Feb", value: 35 },
    { month: "Mar", value: 48 },
    { month: "Apr", value: 44 },
    { month: "May", value: 51 },
    { month: "Jun", value: 38 },
    { month: "Jul", value: 48 },
    { month: "Aug", value: 44 },
    { month: "Sep", value: 62 },
    { month: "Oct", value: 56 },
    { month: "Nov", value: 78 },
  ],
};

const chartWidth = 680;
const chartHeight = 210;
const chartPadding = { left: 8, right: 12, top: 16, bottom: 30 };

export function CollectionsChart() {
  const [period, setPeriod] = useState<keyof typeof chartData>("6 months");
  const data = chartData[period];
  const innerWidth = chartWidth - chartPadding.left - chartPadding.right;
  const innerHeight = chartHeight - chartPadding.top - chartPadding.bottom;
  const points = data.map((item, index) => ({
    x: chartPadding.left + (index * innerWidth) / (data.length - 1),
    y: chartPadding.top + innerHeight - (item.value / 100) * innerHeight,
    ...item,
  }));
  const line = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const area = `${line} L ${points[points.length - 1].x} ${chartHeight - chartPadding.bottom} L ${points[0].x} ${chartHeight - chartPadding.bottom} Z`;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Collection trends</h2>
          <p className="mt-1 text-sm text-slate-500">Monthly dues collected</p>
        </div>
        <div className="flex rounded-lg bg-slate-100 p-1" aria-label="Chart time period">
          {(Object.keys(chartData) as Array<keyof typeof chartData>).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setPeriod(option)}
              aria-pressed={period === option}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                period === option ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          Collected (₱ thousands)
        </div>
        <div className="w-full overflow-hidden">
          <svg
            className="h-56 w-full overflow-visible"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            role="img"
            aria-label={`Monthly collection trend for the last ${period}`}
            preserveAspectRatio="none"
          >
            {[0, 1, 2, 3].map((lineIndex) => {
              const y = chartPadding.top + (innerHeight * lineIndex) / 3;
              return (
                <g key={lineIndex}>
                  <line x1={0} x2={chartWidth} y1={y} y2={y} stroke="#e8edf2" strokeDasharray="4 5" />
                  <text x={0} y={y - 5} fill="#94a3b8" fontSize="10">
                    {100 - lineIndex * 33}
                  </text>
                </g>
              );
            })}
            <path d={area} fill="url(#collection-fill)" />
            <path d={line} fill="none" stroke="#f28c00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="collection-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#f28c00" stopOpacity=".2" />
                <stop offset="100%" stopColor="#f28c00" stopOpacity="0" />
              </linearGradient>
            </defs>
            {points.map((point) => (
              <g key={point.month}>
                <circle cx={point.x} cy={point.y} r="4" fill="white" stroke="#f28c00" strokeWidth="2.5">
                  <title>{`${point.month}: ₱${(point.value * 1000).toLocaleString()}`}</title>
                </circle>
                <text x={point.x} y={chartHeight - 5} textAnchor="middle" fill="#64748b" fontSize="11">
                  {point.month}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
