export type BillingPeriod = "Monthly" | "Quarterly" | "Annual" | "One-Time";
export type AssessmentStatus = "Active" | "Upcoming" | "Closed" | "Draft";

export type AssessmentSchedule = {
  id: string;
  title: string;
  period: BillingPeriod;
  amount: number;
  deadline: string;
  households: string;
  status: AssessmentStatus;
};
