import { Input } from "@/components/ui/input";

const formatter = new Intl.DurationFormat(undefined, {
  style: "digital",
  hoursDisplay: "auto",
});

interface PaceInputProps {
  label?: string;
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
}

// Convert time string (MM:SS or HH:MM:SS) to total seconds
function timeToSeconds(timeStr: string): number {
  if (!timeStr) return NaN;
  const parts = timeStr.split(":").map((p) => parseInt(p || "0", 10));
  if (parts.some(isNaN)) return NaN;

  if (parts.length === 2) {
    // MM:SS
    return parts[0] + parts[1] / 60;
  } else if (parts.length === 3) {
    // HH:MM:SS
    return parts[0] * 60 + parts[1] + parts[2] / 60;
  }
  return NaN;
}

export function PaceInput({
  label,
  value,
  onChange,
  placeholder,
}: PaceInputProps) {
  return (
    <div className="group relative">
      <Input
        type="text"
        value={
          value
            ? formatter.format({
                hours: Math.floor(value / 3600),
                minutes: Math.floor((value % 3600) / 60),
                seconds: Math.floor(value % 60),
              })
            : undefined
        }
        onChange={(e) => onChange?.(timeToSeconds(e.target.value))}
        placeholder={placeholder}
        className="h-20 rounded-xl border-2 px-4 pb-6 pt-4 text-center text-2xl font-mono transition-all focus:scale-[1.02]"
        inputMode={"text"}
      />
      <div className="pointer-events-none absolute bottom-2 right-3 text-xs font-medium text-muted-foreground/60">
        {label}
      </div>
    </div>
  );
}
