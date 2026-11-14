import DigitalReceiptCard from "../(components)/digital-receipt-card";

type ReceiptSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

const demoReceipt = {
  amount: "120.00",
  assessments: "October HOA dues, October parking · P-01",
  date: "2026-11-09T09:00:00.000Z",
  household: "A-101",
  homeowner: "Maya Bennett",
  method: "QR payment",
  receipt: "ST-00000000",
  status: "Completed · Simulation",
};

export default async function ReceiptPage({
  searchParams,
}: {
  searchParams: ReceiptSearchParams;
}) {
  const params = await searchParams;
  const getParam = (key: keyof typeof demoReceipt) => {
    const value = params[key];
    return (Array.isArray(value) ? value[0] : value) || demoReceipt[key];
  };

  return (
    <DigitalReceiptCard
      amount={getParam("amount")}
      assessments={getParam("assessments")}
      date={getParam("date")}
      household={getParam("household")}
      homeowner={getParam("homeowner")}
      method={getParam("method")}
      receipt={getParam("receipt")}
      status={getParam("status")}
    />
  );
}
