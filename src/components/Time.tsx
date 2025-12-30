import { Infinity as IconInfinity } from "lucide-react";

const formatter = new Intl.DurationFormat(undefined, {
  style: "digital",
});

export function Time({
  children,
  ...rest
}: { children: number } & React.HTMLAttributes<HTMLTimeElement>) {
  return (
    <time {...rest}>
      {Number.isFinite(children) ? (
        formatter.format({
          hours: Math.floor(children / 3600),
          minutes: Math.floor((children % 3600) / 60),
          seconds: Math.floor(children) % 60,
        })
      ) : (
        <IconInfinity />
      )}
    </time>
  );
}
