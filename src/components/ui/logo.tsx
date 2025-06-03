import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "white";
  showText?: boolean;
}

export function Logo({
  className,
  size = "md",
  variant = "default",
  showText = true,
}: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  const textColorClass = variant === "white" ? "text-white" : "text-primary";
  const iconColorClass = variant === "white" ? "text-white" : "text-primary";

  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Leaf className={cn("h-4/6 w-4/6", iconColorClass)} />
        </div>
      </div>
      {showText && (
        <span
          className={cn(
            "font-bold tracking-tight",
            textSizeClasses[size],
            textColorClass,
          )}
        >
          AgroHub
        </span>
      )}
    </Link>
  );
}
