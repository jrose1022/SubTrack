"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Car,
  CreditCard,
  FileText,
  LayoutGrid,
  LogOut,
  ShieldCheck,
} from "lucide-react";

const links = [
  { href: "/homeowner/overview", label: "Overview", icon: LayoutGrid },
  {
    href: "/homeowner/statement-of-account",
    label: "Statement of account",
    icon: FileText,
  },
  { href: "/homeowner/payment", label: "Payment", icon: CreditCard },
  { href: "/homeowner/parking", label: "My parking", icon: Car },
];

export default function HomeownerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-neutral-800 p-4 text-neutral-200 md:flex">
      <div className="flex items-center gap-3 px-2 py-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-white">
          <Building2 size={20} />
        </div>
        <div>
          <p className="text-sm font-bold text-white">SineGANG</p>
          <p className="text-[10px] uppercase tracking-wide text-neutral-400">
            Homeowners Assn.
          </p>
        </div>
      </div>

      <p className="mt-8 px-2 text-[11px] uppercase tracking-wide text-neutral-400">
        Homeowner portal
      </p>
      <nav className="mt-3 flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm ${
                active
                  ? "border-orange-500 bg-neutral-900 text-white"
                  : "border-transparent text-neutral-400 hover:text-white"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-lg border border-neutral-700 bg-neutral-900 p-3 text-xs">
        <ShieldCheck size={16} className="text-orange-500" />
        <p className="mt-2 font-semibold text-white">Your household only</p>
        <p className="mt-1 text-neutral-400">
          Statements, payments and parking for A-101.
        </p>
      </div>

      <div className="mt-auto border-t border-neutral-700 pt-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-600 text-xs font-semibold text-white">
            AL
          </div>
          <div className="text-xs">
            <p className="font-semibold text-white">Adrian Lleva</p>
            <p className="text-neutral-400">A-101 · Homeowner</p>
          </div>
        </div>
        <Link
          href="/"
          className="mt-4 flex items-center gap-2 px-2 text-xs text-neutral-400 hover:text-white"
        >
          <LogOut size={14} />
          Sign out
        </Link>
      </div>
    </aside>
  );
}
