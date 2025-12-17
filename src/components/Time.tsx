import { Infinity } from "lucide-react";

const formatter = new Intl.DurationFormat(undefined, {
  style: "digital",
});

export function Time({
  children,
  ...rest
}: { children: number } & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span {...rest}>
      {Number.isFinite(children) ? (
        formatter.format({
          hours: Math.round(children / 3600),
          minutes: Math.round((children % 3600) / 60),
          seconds: Math.round(children) % 60,
        })
      ) : (
        <Infinity />
      )}
    </span>
  );
}
