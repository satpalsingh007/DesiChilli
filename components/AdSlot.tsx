import type { FC } from "react";

type AdSlotProps = {
  slot: string;
  label?: string;
  className?: string;
};

/**
 * Renders nothing: AdSense Auto ads inject their own units, so the reserved
 * placeholders would only show empty boxes labelled "Advertisement". The props
 * are kept so the existing call sites in MDX posts stay valid, and so manual
 * ad units can be reintroduced here later without touching every article.
 */
export const AdSlot: FC<AdSlotProps> = () => null;
