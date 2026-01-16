export type ServicesSectionId = "top" | "engineering" | "balance" | "securitization";

export const SERVICES_NAV: { id: ServicesSectionId; label: string }[] = [
  { id: "top", label: "Overview" },
  { id: "engineering", label: "1. Engineering" },
  { id: "balance", label: "2. Balance Sheet" },
  { id: "securitization", label: "3. Securitization" },
];