import { Timer, Gauge, Zap, Github } from "lucide-react";
import { PaceInput } from "@/components/PaceInput";
import { Time } from "@/components/Time";
import { SpeedInput } from "./components/SpeedInput";
import { useState } from "react";
import { ThemeProvider } from "./theme-provider";

const MILES_PER_KM = 0.621371;

export function App() {
  const [speedKilometersPerHour, setSpeedKilometersPerHour] = useState(10);

  /** Speed in miles per hour */
  const speedMilesPerHour = speedKilometersPerHour * MILES_PER_KM;
  const setSpeedMilesPerHour = (mph: number) =>
    setSpeedKilometersPerHour(mph / MILES_PER_KM);

  const paceSecondsPerKilometer =
    speedKilometersPerHour === 0
      ? Number.POSITIVE_INFINITY
      : 3600 / speedKilometersPerHour;
  const setPaceSecondsPerKilometer = (seconds: number) =>
    setSpeedKilometersPerHour(3600 / seconds);

  const paceSecondsPerMile =
    speedMilesPerHour === 0
      ? Number.POSITIVE_INFINITY
      : 3600 / speedMilesPerHour;
  const setPaceSecondsPerMile = (seconds: number) =>
    setSpeedMilesPerHour(3600 / seconds);

  /** Time in seconds to run a 5k in seconds */
  const time5kSeconds = paceSecondsPerKilometer * 5;
  const time10kSeconds = paceSecondsPerKilometer * 10;
  const timeHalfMarathonSeconds = paceSecondsPerKilometer * 21.1;
  const timeMarathonSeconds = paceSecondsPerKilometer * 42.2;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background p-4 flex flex-col justify-between">
        <div className="mx-auto max-w-lg space-y-6">
          {/* Pace Section */}
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-sm uppercase tracking-wider font-semibold text-muted-foreground px-1">
              <Zap className="h-3.5 w-3.5" />
              <span>Pace</span>
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <PaceInput
                label="min/km"
                value={paceSecondsPerKilometer}
                onChange={(v) => setPaceSecondsPerKilometer(v)}
                placeholder="0:00"
              />
              <PaceInput
                label="min/mile"
                value={paceSecondsPerMile}
                onChange={(v) => setPaceSecondsPerMile(v)}
                placeholder="0:00"
              />
            </div>
          </div>
          {/* Speed Section */}
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-sm uppercase tracking-wider font-semibold text-muted-foreground px-1">
              <Gauge className="h-3.5 w-3.5" />
              <span>Speed</span>
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <SpeedInput
                label="km/h"
                value={speedKilometersPerHour}
                onChange={(v) => setSpeedKilometersPerHour(v)}
                placeholder="0"
              />
              <SpeedInput
                label="mph"
                value={speedMilesPerHour}
                onChange={(v) => setSpeedMilesPerHour(v)}
                placeholder="0"
              />
            </div>
          </div>
          {/* Race Times - Read-only info */}
          <div className="rounded-xl border bg-muted/20 p-5">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-muted-foreground">
              <Timer className="h-3.5 w-3.5" />
              <span>Race Times</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between rounded-lg border bg-background px-3 py-2.5">
                <span className="text-muted-foreground">5K</span>
                <Time className="font-mono text-lg font-semibold">
                  {time5kSeconds}
                </Time>
              </div>
              <div className="flex items-center justify-between rounded-lg border bg-background px-3 py-2.5">
                <span className="text-muted-foreground">10K</span>
                <Time className="font-mono text-lg font-semibold">
                  {time10kSeconds}
                </Time>
              </div>
              <div className="flex items-center justify-between rounded-lg border bg-background px-3 py-2.5">
                <span className="text-muted-foreground">Half Marathon</span>
                <Time className="font-mono text-lg font-semibold">
                  {timeHalfMarathonSeconds}
                </Time>
              </div>
              <div className="flex items-center justify-between rounded-lg border bg-background px-3 py-2.5">
                <span className="text-muted-foreground">Marathon</span>
                <Time className="font-mono text-lg font-semibold">
                  {timeMarathonSeconds}
                </Time>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-4 pb-0 text-center">
          <a
            href="https://github.com/Briggybros/runpace.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all shadow-sm"
          >
            <Github className="h-3.5 w-3.5" />
            <span>View on GitHub</span>
          </a>
        </footer>
      </div>
    </ThemeProvider>
  );
}
