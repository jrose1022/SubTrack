import type { Metadata } from "next";
import ReceiptView from "./receipt-view";

export const metadata: Metadata = {
  title: "Digital Receipt | SubTrack",
  description: "Review and print your simulated HOA payment receipt.",
};

type DigitalReceiptPageProps = {
  searchParams: Promise<{
    amount?: string;
    method?: string;
    receipt?: string;
    assessments?: string;
    date?: string;
    homeowner?: string;
    household?: string;
    status?: string;
  }>;
};

export default async function DigitalReceiptPage({
  searchParams,
}: DigitalReceiptPageProps) {
  const params = await searchParams;

  return (
    <ReceiptView
      amount={params.amount}
      assessments={params.assessments}
      date={params.date}
      household={params.household}
      homeowner={params.homeowner}
      method={params.method}
      receipt={params.receipt}
      status={params.status}
    />
  );
}