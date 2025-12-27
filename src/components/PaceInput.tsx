import { Button } from "@/components/ui/button";
import { Infinity, Minus, Plus } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { clamp } from "@/lib/clamp";
import { InputDialog } from "./InputDialog";

const formatter = new Intl.DurationFormat(undefined, {
  style: "digital",
  hoursDisplay: "auto",
});

interface PaceInputProps {
  label?: string;
  value?: number;
  onChange?: (value: number) => void;
}

export function PaceInput({ label, value, onChange }: PaceInputProps) {
  const _value = Number.isFinite(value) ? (value ?? 0) : 0;

  const minutes = Math.floor((_value ?? 0) / 60);
  const seconds = Math.floor((_value ?? 0) % 60);

  const setMinutes = (newMinutes: number) => {
    onChange?.(clamp(newMinutes, 0, 59) * 60 + ((_value ?? 0) % 60));
  };

  const setSeconds = (newSeconds: number) => {
    onChange?.(minutes * 60 + (clamp(newSeconds, 0, 59) % 60));
  };

  const handleMinutesChange = (change: number) => {
    setMinutes(minutes + change);
  };

  const handleMinutesInput = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setMinutes(0);
    } else {
      const num = parseInt(val, 10);
      if (!isNaN(num)) {
        setMinutes(num);
      }
    }
  };

  const handleSecondsChange = (change: number) => {
    let final = seconds + change;
    if (final >= 60) {
      final -= 60;
      setMinutes(minutes + 1);
    }
    if (final < 0) {
      final += 60;
      setMinutes(minutes - 1);
    }
    setSeconds(final);
  };

  const handleSecondsInput = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setSeconds(0);
    } else {
      const num = parseInt(val, 10);
      if (!isNaN(num)) {
        setSeconds(num);
      }
    }
  };

  const time = !Number.isFinite(value) ? (
    <Infinity className="mx-auto" />
  ) : _value && _value > 0 ? (
    formatter.format({
      hours: Math.floor(_value / 3600),
      minutes: Math.floor((_value % 3600) / 60),
      seconds: Math.floor(_value % 60),
    })
  ) : (
    ""
  );

  const [open, setOpen] = useState(false);

  return (
    <InputDialog
      open={open}
      onOpenChange={setOpen}
      label={time}
      units={label}
      title="Pace Input"
    >
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={() => handleMinutesChange(1)}
          >
            <Plus className="h-5 w-5" />
          </Button>

          <div className="flex flex-col items-center">
            <input
              type="text"
              inputMode="numeric"
              tabIndex={1}
              value={minutes.toString().padStart(2, "0")}
              onChange={handleMinutesInput}
              onClick={(e) => e.currentTarget.select()}
              onKeyDown={(e) => e.key === "Enter" && setOpen(false)}
              className="w-24 text-center text-5xl font-mono font-bold tabular-nums bg-transparent border-0 focus:outline-none focus:ring-0"
            />
            <div className="text-xs text-muted-foreground mt-1">min</div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={() => handleMinutesChange(-1)}
          >
            <Minus className="h-5 w-5" />
          </Button>
        </div>

        <div className="text-5xl font-mono font-bold mb-8">:</div>

        <div className="flex flex-col items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={() => handleSecondsChange(1)}
          >
            <Plus className="h-5 w-5" />
          </Button>

          <div className="flex flex-col items-center">
            <input
              type="text"
              inputMode="numeric"
              tabIndex={2}
              value={seconds.toString().padStart(2, "0")}
              onChange={handleSecondsInput}
              onClick={(e) => e.currentTarget.select()}
              onKeyDown={(e) => e.key === "Enter" && setOpen(false)}
              className="w-24 text-center text-5xl font-mono font-bold tabular-nums bg-transparent border-0 focus:outline-none focus:ring-0"
            />
            <div className="text-xs text-muted-foreground mt-1">sec</div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={() => handleSecondsChange(-1)}
          >
            <Minus className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="text-sm text-muted-foreground text-center">{label}</div>
      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleMinutesChange(-5)}
        >
          -5m
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSecondsChange(-5)}
        >
          -5s
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSecondsChange(5)}
        >
          +5s
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleMinutesChange(5)}
        >
          +5m
        </Button>
      </div>
    </InputDialog>
  );
}
