export interface WeatherSchema {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: Current;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  daily_units: DailyUnits;
  daily: Daily;
}

export interface Current {
  time: string;
  interval: number;
  temperature_2m: number;
  weathercode: number;
  /**
   * 0 is night, 1 is day
   */
  is_day: number;
}

export interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  weathercode: string;
}

export interface Daily {
  time: Date[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
}

export interface Hourly {
  time: string[];
  temperature_2m: number[];
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
}
