import { Minus as IconMinus, Plus as IconPlus } from "lucide-react";
import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DialProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  value: number;
  label?: string;
  onChange?: (value: number) => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  digits?: number;
  buttonClassName?: string;
}

export const Dial = forwardRef<HTMLInputElement, DialProps>(function Dial(
  {
    value,
    label,
    onChange,
    onIncrement,
    onDecrement,
    digits,
    className,
    buttonClassName,
    ...props
  }: DialProps,
  ref,
) {
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      onChange?.(0);
    } else {
      const num = parseInt(val, 10);
      if (!isNaN(num)) {
        onChange?.(num);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        className={cn(buttonClassName, "h-12 w-12 rounded-full cursor-pointer")}
        onClick={onIncrement}
      >
        <IconPlus className="h-5 w-5" />
      </Button>

      <div className="flex flex-col items-center">
        <input
          ref={ref}
          type="text"
          inputMode="numeric"
          tabIndex={1}
          value={value.toString().padStart(digits ?? 2, "0")}
          onChange={_onChange}
          onClick={(e) => e.currentTarget.select()}
          className={cn(
            className,
            "w-24 text-center text-5xl font-mono font-bold tabular-nums bg-transparent border-0 focus:outline-none focus:ring-0",
          )}
          {...props}
        />
        {label ? (
          <div className="text-xs text-muted-foreground mt-1 pointer-events-none select-none">
            {label}
          </div>
        ) : null}
      </div>

      <Button
        variant="outline"
        size="icon"
        className={cn(buttonClassName, "h-12 w-12 rounded-full cursor-pointer")}
        onClick={onDecrement}
      >
        <IconMinus className="h-5 w-5" />
      </Button>
    </div>
  );
});
