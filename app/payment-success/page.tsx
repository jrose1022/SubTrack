import PaymentSuccessNotice from "../(components)/payment-success-notice";

type PaymentSuccessSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: PaymentSuccessSearchParams;
}) {
  const params = await searchParams;
  const getParam = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return (
    <PaymentSuccessNotice
      amount={getParam("amount")}
      assessments={getParam("assessments")}
      date={getParam("date")}
      method={getParam("method")}
      receipt={getParam("receipt")}
    />
  );
}
