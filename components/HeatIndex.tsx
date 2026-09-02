const CHILI_PATH =
  "M8 2c1.5 1 2 2.5 1.5 4 3-1 6 .5 7 3.5 1.3 4-1.5 9-6 11.5C7 23 3 21 2.2 16.8 1.5 13 3.5 9.5 7 7.5 6 6 6.2 3.5 8 2z";

const CHILI_COLOR = "#D6293A";
const SLOTS = 5;

type HeatIndexProps = {
  rating: number;
};

export function HeatIndex({ rating }: HeatIndexProps) {
  const filled = Math.min(SLOTS, Math.max(0, Math.round(rating)));

  return (
    <span
      className="heat-chilies"
      aria-label={`${filled} out of 5 chilies`}
      role="img"
    >
      {Array.from({ length: SLOTS }, (_, index) => {
        const isFilled = index < filled;
        return (
          <svg
            key={index}
            className="chili"
            viewBox="0 0 24 24"
            fill={isFilled ? CHILI_COLOR : "none"}
            stroke={isFilled ? undefined : CHILI_COLOR}
            strokeWidth={isFilled ? undefined : 1.4}
            aria-hidden="true"
          >
            <path d={CHILI_PATH} />
          </svg>
        );
      })}
    </span>
  );
}
