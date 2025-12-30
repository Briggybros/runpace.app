import type { ReactNode } from "react";
import { Time } from "./Time";

export interface TimeEntryProps {
  label: ReactNode;
  /** The time in seconds */
  time: number;
}

export function TimeEntry({ label, time }: TimeEntryProps) {
  return (
    <tr className="flex items-center justify-between flex-wrap-reverse rounded-lg border bg-background px-3 py-2.5">
      <td className="text-muted-foreground">{label}</td>
      <td>
        <Time className="font-mono text-lg font-semibold">{time}</Time>
      </td>
    </tr>
  );
}
