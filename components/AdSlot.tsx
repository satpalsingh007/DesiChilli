type AdSlotProps = {
  slot: string;
  label?: string;
  className?: string;
};

export function AdSlot({
  slot,
  label = "Advertisement",
  className,
}: AdSlotProps) {
  return (
    <aside
      className={className ? `ad-slot ${className}` : "ad-slot"}
      data-ad-slot={slot}
      aria-label={label}
    >
      {label}
    </aside>
  );
}
