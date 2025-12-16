declare namespace Intl {
  interface Duration {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
    microseconds?: number;
    nanoseconds?: number;
  }

  interface DurationFormatPart {
    type: string;
    value: string;
    unit?: string;
  }

  interface DurationFormat {
    format(duration: Duration): string;
    formatToParts(duration: Duration): Intl.DurationFormatPart[];
  }

  interface DurationFormatOptions {
    localeMatcher?: "best fit" | "lookup" | undefined;
    numberingSystem?: string | undefined;
    style?: "long" | "short" | "narrow" | "digital" | undefined;
    years?: "long" | "short" | "narrow" | undefined;
    yearsDisplay?: "always" | "auto" | undefined;
    months?: "long" | "short" | "narrow" | undefined;
    monthsDisplay?: "always" | "auto" | undefined;
    weeks?: "long" | "short" | "narrow" | undefined;
    weeksDisplay?: "always" | "auto" | undefined;
    days?: "long" | "short" | "narrow" | undefined;
    daysDisplay?: "always" | "auto" | undefined;
    hours?: "long" | "short" | "narrow" | "numeric" | "2-digit" | undefined;
    hoursDisplay?: "always" | "auto" | undefined;
    minutes?: "long" | "short" | "narrow" | "numeric" | "2-digit" | undefined;
    minutesDisplay?: "always" | "auto" | undefined;
    seconds?: "long" | "short" | "narrow" | "numeric" | "2-digit" | undefined;
    secondsDisplay?: "always" | "auto" | undefined;
    milliseconds?:
      | "long"
      | "short"
      | "narrow"
      | "numeric"
      | "2-digit"
      | undefined;
    millisecondsDisplay?: "always" | "auto" | undefined;
    microseconds?:
      | "long"
      | "short"
      | "narrow"
      | "numeric"
      | "2-digit"
      | undefined;
    microsecondsDisplay?: "always" | "auto" | undefined;
    nanoseconds?:
      | "long"
      | "short"
      | "narrow"
      | "numeric"
      | "2-digit"
      | undefined;
    nanosecondsDisplay?: "always" | "auto" | undefined;
    fractionalDigits?: number | undefined;
  }

  interface DurationFormatConstructor {
    new (
      locales?: string | Intl.Locale | (Intl.Locale | string)[],
      options?: DurationFormatOptions,
    ): DurationFormat;

    (
      locales?: string | Intl.Locale | (Intl.Locale | string)[],
      options?: DurationFormatOptions,
    ): DurationFormat;

    supportedLocalesOf(
      locales: string | string[],
      options?: { localeMatcher?: DurationFormatOptions["localeMatcher"] },
    ): string[];

    readonly prototype: DurationFormat;
  }

  const DurationFormat: DurationFormatConstructor;
}
