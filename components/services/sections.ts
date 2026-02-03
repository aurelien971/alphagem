export type ServicesSectionId = "top" | "engineering" | "balance" | "securitization";

export const SERVICES_NAV: { id: ServicesSectionId; label: string }[] = [
  { id: "top", label: "Overview" },
{ id: "securitization", label: "1. Securitization" },
  { id: "balance", label: "2. Balance Sheet" },
    { id: "engineering", label: "3. Engineering" },
];