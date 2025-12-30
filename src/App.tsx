import {
  Timer as IconTimer,
  Gauge as IconGauge,
  Zap as IconZap,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "./context/theme";
import { TimeEntry } from "@/components/TimeEntry";
import { Footer } from "@/components/Footer";

import { PaceInput } from "@/components/PaceInput";
import { SpeedInput } from "@/components/SpeedInput";

const MILES_PER_KM = 0.621371;

export function App() {
  const { t } = useTranslation();

  const [speedKilometersPerHour, setSpeedKilometersPerHour] = useState(10);

  /** Speed in miles per hour */
  const speedMilesPerHour = speedKilometersPerHour * MILES_PER_KM;
  const setSpeedMilesPerHour = (mph: number) =>
    setSpeedKilometersPerHour(mph / MILES_PER_KM);

  const paceSecondsPerKilometer =
    speedKilometersPerHour === 0
      ? Number.POSITIVE_INFINITY
      : Math.round(3600 / speedKilometersPerHour);
  const setPaceSecondsPerKilometer = (seconds: number) =>
    setSpeedKilometersPerHour(3600 / seconds);

  const paceSecondsPerMile =
    speedMilesPerHour === 0
      ? Number.POSITIVE_INFINITY
      : Math.round(3600 / speedMilesPerHour);
  const setPaceSecondsPerMile = (seconds: number) =>
    setSpeedMilesPerHour(3600 / seconds);

  /** Time in seconds to run a 5k */
  const time5kSeconds = paceSecondsPerKilometer * 5;
  /** Time in seconds to run a 10k */
  const time10kSeconds = paceSecondsPerKilometer * 10;
  /** Time in seconds to run a half marathon */
  const timeHalfMarathonSeconds = paceSecondsPerKilometer * 21.1;
  /** Time in seconds to run a marathon */
  const timeMarathonSeconds = paceSecondsPerKilometer * 42.2;

  return (
    <ThemeProvider>
      <div className="min-h-dvh w-full bg-background p-4 flex flex-col justify-between items-center">
        <div className="w-xl max-w-full space-y-6">
          {/* Pace Section */}
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-sm uppercase tracking-wider font-semibold text-muted-foreground px-1">
              <IconZap className="h-3.5 w-3.5" />
              <span>{t("Pace")}</span>
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <PaceInput
                units={t("min/km")}
                value={paceSecondsPerKilometer}
                onChange={(v) => setPaceSecondsPerKilometer(v)}
              />
              <PaceInput
                units={t("min/mi")}
                value={paceSecondsPerMile}
                onChange={(v) => setPaceSecondsPerMile(v)}
              />
            </div>
          </div>

          {/* Speed Section */}
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-sm uppercase tracking-wider font-semibold text-muted-foreground px-1">
              <IconGauge className="h-3.5 w-3.5" />
              <span>{t("Speed")}</span>
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <SpeedInput
                units={t("km/h")}
                value={speedKilometersPerHour}
                onChange={(v) => setSpeedKilometersPerHour(v)}
              />
              <SpeedInput
                units={t("mph")}
                value={speedMilesPerHour}
                onChange={(v) => setSpeedMilesPerHour(v)}
              />
            </div>
          </div>

          {/* Race Times - Read-only info */}
          <div className="rounded-xl border bg-muted/20 p-5">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-muted-foreground">
              <IconTimer className="h-3.5 w-3.5" />
              <span>{t("Race Times")}</span>
            </div>
            <div className="space-y-1.5">
              <TimeEntry label={t("5K")} time={time5kSeconds} />
              <TimeEntry label={t("10K")} time={time10kSeconds} />
              <TimeEntry
                label={t("Half Marathon")}
                time={timeHalfMarathonSeconds}
              />
              <TimeEntry label={t("Marathon")} time={timeMarathonSeconds} />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
