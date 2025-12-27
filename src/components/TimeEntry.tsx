import type { ReactNode } from "react";
import { Time } from "./Time";

export interface TimeEntryProps {
  label: ReactNode;
  /** The time in seconds */
  time: number;
}

export function TimeEntry({ label, time }: TimeEntryProps) {
  return (
    <div className="flex items-center justify-between flex-wrap-reverse rounded-lg border bg-background px-3 py-2.5">
      <span className="text-muted-foreground">{label}</span>
      <Time className="font-mono text-lg font-semibold">{time}</Time>
    </div>
  );
}
