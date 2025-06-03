"use client";

import { cn } from "@/lib/utils";

interface ChartProps {
  className?: string;
}

export function BarChart({ className }: ChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex h-64 items-end gap-2">
        {Array.from({ length: 12 }).map((_, i) => {
          const height = Math.random() * 100;
          return (
            <div key={i} className="flex-1">
              <div
                className="bg-primary rounded-t-md w-full transition-all duration-500"
                style={{ height: `${height}%` }}
              ></div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <div>Jan</div>
        <div>Feb</div>
        <div>Mar</div>
        <div>Apr</div>
        <div>May</div>
        <div>Jun</div>
        <div>Jul</div>
        <div>Aug</div>
        <div>Sep</div>
        <div>Oct</div>
        <div>Nov</div>
        <div>Dec</div>
      </div>
    </div>
  );
}

export function LineChart({ className }: ChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <svg viewBox="0 0 100 50" className="h-full w-full overflow-visible">
        <path
          d="M0,50 L10,45 L20,40 L30,35 L40,30 L50,25 L60,30 L70,20 L80,15 L90,10 L100,5"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0,50 L10,45 L20,40 L30,35 L40,30 L50,25 L60,30 L70,20 L80,15 L90,10 L100,5 L100,50 L0,50"
          fill="hsl(var(--primary) / 0.2)"
          strokeWidth="0"
        />
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((x, i) => {
          const y = [50, 45, 40, 35, 30, 25, 30, 20, 15, 10, 5][i];
          return (
            <circle key={i} cx={x} cy={y} r="0.7" fill="hsl(var(--primary))" />
          );
        })}
      </svg>
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <div>Jan</div>
        <div>Feb</div>
        <div>Mar</div>
        <div>Apr</div>
        <div>May</div>
        <div>Jun</div>
        <div>Jul</div>
        <div>Aug</div>
        <div>Sep</div>
        <div>Oct</div>
        <div>Nov</div>
        <div>Dec</div>
      </div>
    </div>
  );
}

export function PieChart({ className }: ChartProps) {
  const data = [
    { value: 35, color: "hsl(var(--primary))" },
    { value: 25, color: "hsl(var(--primary) / 0.8)" },
    { value: 20, color: "hsl(var(--primary) / 0.6)" },
    { value: 15, color: "hsl(var(--primary) / 0.4)" },
    { value: 5, color: "hsl(var(--primary) / 0.2)" },
  ];

  let cumulativePercent = 0;

  function getCoordinatesForPercent(percent: number) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="relative h-64 w-64 mx-auto">
        <svg viewBox="-1 -1 2 2" className="h-full w-full">
          {data.map((segment, i) => {
            const startPercent = cumulativePercent;
            const endPercent = startPercent + segment.value / 100;

            const [startX, startY] = getCoordinatesForPercent(startPercent);
            const [endX, endY] = getCoordinatesForPercent(endPercent);

            const largeArcFlag = segment.value > 50 ? 1 : 0;

            const pathData = [
              `M ${startX} ${startY}`,
              `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `L 0 0`,
            ].join(" ");

            cumulativePercent = endPercent;

            return <path key={i} d={pathData} fill={segment.color} />;
          })}
        </svg>

        <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold">100%</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {data.map((segment, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <div className="text-sm">
              {i === 0 && "Category 1"}
              {i === 1 && "Category 2"}
              {i === 2 && "Category 3"}
              {i === 3 && "Category 4"}
              {i === 4 && "Other"}
            </div>
            <div className="ml-auto text-sm font-medium">{segment.value}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AreaChart({ className }: ChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <svg viewBox="0 0 100 50" className="h-full w-full overflow-visible">
        <path
          d="M0,50 L10,40 L20,45 L30,35 L40,45 L50,30 L60,35 L70,15 L80,20 L90,10 L100,15 L100,50 L0,50"
          fill="hsl(var(--primary) / 0.2)"
          stroke="hsl(var(--primary))"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((x, i) => {
          const y = [50, 40, 45, 35, 45, 30, 35, 15, 20, 10, 15][i];
          return (
            <circle key={i} cx={x} cy={y} r="0.7" fill="hsl(var(--primary))" />
          );
        })}
      </svg>
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <div>Jan</div>
        <div>Feb</div>
        <div>Mar</div>
        <div>Apr</div>
        <div>May</div>
        <div>Jun</div>
        <div>Jul</div>
        <div>Aug</div>
        <div>Sep</div>
        <div>Oct</div>
        <div>Nov</div>
        <div>Dec</div>
      </div>
    </div>
  );
}
