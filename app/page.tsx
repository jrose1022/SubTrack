import DigitalReceiptCard from "./(components)/digital-receipt-card";
import PaymentSuccessNotice from "./(components)/payment-success-notice";
import PaymentCheckoutCard from "./(components)/payment-checkout-card";

type DashboardPageProps = {
  searchParams: Promise<{
    view?: string;
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

export default async function Page({ searchParams }: DashboardPageProps) {
  const params = await searchParams;

  if (params.view === "receipt") {
    return (
      <DigitalReceiptCard
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

  if (params.receipt) {
    return (
      <PaymentSuccessNotice
        amount={params.amount}
        assessments={params.assessments}
        date={params.date}
        method={params.method}
        receipt={params.receipt}
      />
    );
  }

  return <PaymentCheckoutCard />;
}