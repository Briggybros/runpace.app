import { Infinity as IconInfinity } from "lucide-react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { InputDialog } from "./InputDialog";
import { Dial } from "./Dial";
import { Button } from "@/components/ui/button";
import { clamp } from "@/lib/clamp";

const formatter = new Intl.DurationFormat(undefined, {
  style: "digital",
  hoursDisplay: "auto",
});

interface PaceInputProps {
  units?: string;
  value?: number;
  onChange?: (value: number) => void;
}

export function PaceInput({ units, value, onChange }: PaceInputProps) {
  const { t } = useTranslation();

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

  const handleSecondsChange = (change: number) => {
    onChange?.(clamp(_value + change, 0, 3599));
  };

  const label = !Number.isFinite(value) ? (
    <IconInfinity className="mx-auto" />
  ) : _value >= 0 ? (
    formatter.format({
      hours: Math.floor(_value / 3600),
      minutes: Math.floor((_value % 3600) / 60),
      seconds: Math.floor(_value % 60),
    })
  ) : (
    ""
  );

  const [open, setOpen] = useState(false);

  const doSelectInput = useCallback(
    (input: HTMLInputElement | null) => {
      if (open && input) {
        input.focus();
        input.select();
      }
    },
    [open],
  );

  return (
    <InputDialog
      open={open}
      onOpenChange={setOpen}
      label={label}
      units={units}
      title="Pace Input"
    >
      {/* Input */}
      <span className="flex items-center justify-center gap-4">
        <Dial
          ref={doSelectInput}
          value={minutes}
          label={t("minutes_short")}
          digits={2}
          onChange={setMinutes}
          onIncrement={handleMinutesChange.bind(null, 1)}
          onDecrement={handleMinutesChange.bind(null, -1)}
          onKeyDown={(e) => e.key === "Enter" && setOpen(false)}
        />

        <span className="text-5xl font-mono font-bold mb-8 pointer-events-none select-none">
          :
        </span>

        <Dial
          value={seconds}
          label={t("seconds_short")}
          digits={2}
          onChange={setSeconds}
          onIncrement={handleSecondsChange.bind(null, 1)}
          onDecrement={handleSecondsChange.bind(null, -1)}
          onKeyDown={(e) => e.key === "Enter" && setOpen(false)}
        />
      </span>

      {/* Units */}
      <span className="text-sm text-muted-foreground text-center pointer-events-none select-none">
        {units}
      </span>

      {/* Increment buttons */}
      <span className="flex justify-center gap-2">
        <Button
          className="cursor-pointer"
          variant="outline"
          size="sm"
          onClick={() => handleMinutesChange(-5)}
        >
          -5{t("minutes_suffix")}
        </Button>
        <Button
          className="cursor-pointer"
          variant="outline"
          size="sm"
          onClick={() => handleSecondsChange(-5)}
        >
          -5{t("seconds_suffix")}
        </Button>
        <Button
          className="cursor-pointer"
          variant="outline"
          size="sm"
          onClick={() => handleSecondsChange(5)}
        >
          +5{t("seconds_suffix")}
        </Button>
        <Button
          className="cursor-pointer"
          variant="outline"
          size="sm"
          onClick={() => handleMinutesChange(5)}
        >
          +5{t("minutes_suffix")}
        </Button>
      </span>
    </InputDialog>
  );
}
