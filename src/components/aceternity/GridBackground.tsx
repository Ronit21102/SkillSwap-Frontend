"use client";
import { cn } from "@/lib/cn";

export const DotBackground = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[20px_20px]",
        className
      )}
    />
  );
};

export const GridBackground = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]",
        className
      )}
    />
  );
};
