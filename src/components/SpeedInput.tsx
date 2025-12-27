import { Minus as IconMinus, Plus as IconPlus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { InputDialog } from "./InputDialog";
import { Button } from "@/components/ui/button";

interface SpeedInputProps {
  units?: string;
  value?: number;
  onChange?: (value: number) => void;
}

export function SpeedInput({ units, value, onChange }: SpeedInputProps) {
  const [speed, setSpeed] = useState((value ?? 0).toFixed(2));

  // Keep speed up to date if value changes
  useEffect(() => {
    if (value != null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSpeed(value.toFixed(2));
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Allow invalid while typing
    setSpeed(val);
  };

  const handleBlur = () => {
    const num = parseFloat(speed);
    const safe = !isNaN(num) && num >= 0 ? num : 0;

    setSpeed(safe.toFixed(2));
    onChange?.(safe);
  };

  const handleChange = (delta: number) => {
    const newSpeed = Math.max(0, (value ?? 0) + delta);
    onChange?.(newSpeed);
  };

  const [open, _setOpen] = useState(false);

  const setOpen = (open: boolean) => {
    if (!open) {
      handleBlur();
    }
    _setOpen(open);
  };

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
      label={value?.toFixed(2)}
      units={units}
      title="Speed Input"
    >
      <div className="flex flex-col items-center gap-4">
        <input
          ref={doSelectInput}
          type="text"
          inputMode="decimal"
          value={speed}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onClick={(e) => e.currentTarget.select()}
          onKeyDown={(e) => e.key === "Enter" && setOpen(false)}
          className="text-6xl font-mono font-bold text-center w-full bg-transparent border-0 focus:outline-none focus:ring-0 tabular-nums"
          placeholder="0.00"
        />
        <div className="text-sm text-muted-foreground">{units}</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={() => handleChange(-1)}
          className="h-16"
        >
          <IconMinus className="h-5 w-5 mr-2" />
          1.0
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => handleChange(1)}
          className="h-16"
        >
          <IconPlus className="h-5 w-5 mr-2" />
          1.0
        </Button>
      </div>

      {/* Small increment buttons */}
      <div className="grid grid-cols-4 gap-2">
        <Button variant="outline" size="sm" onClick={() => handleChange(-0.5)}>
          -0.5
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleChange(-0.1)}>
          -0.1
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleChange(0.1)}>
          +0.1
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleChange(0.5)}>
          +0.5
        </Button>
      </div>
    </InputDialog>
  );
}
