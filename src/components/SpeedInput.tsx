import { Input } from "@/components/ui/input";

interface SpeedInputProps {
  label?: string;
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string | number;
}

export function SpeedInput({
  label,
  value,
  onChange,
  placeholder,
}: SpeedInputProps) {
  return (
    <div className="group relative">
      <Input
        type="number"
        value={value?.toFixed(2)}
        onChange={(e) => onChange?.(Number(e.target.value))}
        placeholder={String(placeholder)}
        className="h-20 rounded-xl border-2 px-4 pb-6 pt-4 text-center text-2xl font-mono transition-all focus:scale-[1.02]"
        step={"0.01"}
        inputMode={"decimal"}
      />
      <div className="pointer-events-none absolute bottom-2 right-3 text-xs font-medium text-muted-foreground/60">
        {label}
      </div>
    </div>
  );
}
