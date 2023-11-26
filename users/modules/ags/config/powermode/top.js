import { 
  Window,
  Hyprland,
  CenterBox,
  Button,
  Box,
  Label,
  Utils,
  SystemTray,
  Icon,
  Variable,
  ProgressBar,
} from "../imports.js";
import { SetupRevealer } from "./index.js";

const StartModule = () => {
  const baseClasses = "rounded-full text-0 ma-2 py-0 px-[5px]"

  return Box({
    class_name: 'bg-surface_background/60 rounded-full ma-2',
    children: Array
      .from({ length: 10 }, (_, i) => i + 1)
      .map(i => Button({
        on_clicked: () => Utils.execAsync(`hyprctl dispatch workspace ${i}`).catch(print),
        child: Label({
            label: `${i}`,
            class_name: baseClasses,
            vpack: 'center',
        }),
        connections: [[Hyprland, btn => {
            const active = Hyprland.active.workspace.id === i;
            // @ts-ignore
            const occupied = Hyprland.getWorkspace(i)?.windows > 0 && !active;

            const colour  = active ? 'bg-primary_foreground/100' 
            : occupied ? 'bg-subtle_background/100' : 'bg-overlay_background/100';

            btn.class_name = `${baseClasses} ${colour}`;
        }]],
    })),
  })
}

const CenterModule = () => {
  return Label({
    class_name: "text-surface_foreground/100 text-2xl rounded-full ma-2 bg-surface_background/60 px-3 py-1",
    label: "Sample text",
    vpack: 'center',
  })
}

const longitude = 28.0436
const latitude = -26.2023
const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode,is_day&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`

const WeatherInfo = Variable({}, {
  poll: [1000 * 60 * 60, `curl -s ${url}`, (out) => JSON.parse(out)],
})

const Weather = () => {
  const currentTemperature = Label({
    connections: [[WeatherInfo, label => {
      const { current, current_units } = WeatherInfo.value
        label.label = `${current.temperature_2m}${current_units.temperature_2m}`;
    }]]
  })

  const temperatureSlider = ProgressBar({
    value: 0,
    class_name: "min-w-24 mx-2",
    vpack: 'center',
    connections: [[WeatherInfo, slider => {
      const { current, daily } = WeatherInfo.value

      // get a 0-1 range between min and max (who said we would'nt be using this?)
      const min = daily.temperature_2m_min;
      const max = daily.temperature_2m_max;
      const value = (current.temperature_2m - min) / (max - min);

      slider.value = value;
    }]]
  })

  // WMO Weather interpretation codes (WW)
  // Code	Description
  // 0	Clear sky
  // 1, 2, 3	Mainly clear, partly cloudy, and overcast
  // 45, 48	Fog and depositing rime fog
  // 51, 53, 55	Drizzle: Light, moderate, and dense intensity
  // 56, 57	Freezing Drizzle: Light and dense intensity
  // 61, 63, 65	Rain: Slight, moderate and heavy intensity
  // 66, 67	Freezing Rain: Light and heavy intensity
  // 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
  // 77	Snow grains
  // 80, 81, 82	Rain showers: Slight, moderate, and violent
  // 85, 86	Snow showers slight and heavy
  // 95 *	Thunderstorm: Slight or moderate
  // 96, 99 *	Thunderstorm with slight and heavy hail
  // (*) Thunderstorm forecast with hail is only available in Central Europe


  const weatherIcon = Icon({
    class_name: 'bg-transparent mx-2',
    size: 24,
    vpack: 'center',
    connections: [[WeatherInfo, icon => {
      const { current: { weathercode, is_day } } = WeatherInfo.value

      const dayIconSet = {
        [0]: 'weather-clear',
        [1]: 'weather-few-clouds',
        [2]: 'weather-clouds',
        [3]: 'weather-overcast',
        [45]: 'weather-fog',
        [48]: 'weather-fog',
        [51]: 'weather-showers-scattered-day',
        [53]: 'weather-showers-scattered-day',
        [55]: 'weather-showers-scattered-day',
        [56]: 'weather-showers-scattered-day',
        [57]: 'weather-showers-scattered-day',
        [61]: 'weather-showers-day',
        [63]: 'weather-showers-day',
        [65]: 'weather-showers-day',
        [66]: 'weather-showers-day',
        [67]: 'weather-showers-day',
        [71]: 'weather-snow-scattered-day',
        [73]: 'weather-snow-scattered-day',
        [75]: 'weather-snow-scattered-day',
        [77]: 'weather-snow-scattered-day',
        [80]: 'weather-showers-scattered-day',
        [81]: 'weather-showers-day',
        [82]: 'weather-showers-day',
        [85]: 'weather-snow-scattered-day',
        [86]: 'weather-snow-scattered-day',
        [95]: 'weather-storm-day',
        [96]: 'weather-storm-day',
        [99]: 'weather-storm-day',
      }

      const nightIconSet = {
        [0]: 'weather-clear-night',
        [1]: 'weather-few-clouds-night',
        [2]: 'weather-clouds-night',
        [3]: 'weather-overcast',
        [45]: 'weather-fog',
        [48]: 'weather-fog',
        [51]: 'weather-showers-scattered-night',
        [53]: 'weather-showers-scattered-night',
        [55]: 'weather-showers-scattered-night',
        [56]: 'weather-showers-scattered-night',
        [57]: 'weather-showers-scattered-night',
        [61]: 'weather-showers-night',
        [63]: 'weather-showers-night',
        [65]: 'weather-showers-night',
        [66]: 'weather-showers-night',
        [67]: 'weather-showers-night',
        [71]: 'weather-snow-scattered-night',
        [73]: 'weather-snow-scattered-night',
        [75]: 'weather-snow-scattered-night',
        [77]: 'weather-snow-scattered-night',
        [80]: 'weather-showers-scattered-night',
        [81]: 'weather-showers-night',
        [82]: 'weather-showers-night',
        [85]: 'weather-snow-scattered-night',
        [86]: 'weather-snow-scattered-night',
        [95]: 'weather-storm-night',
        [96]: 'weather-storm-night',
        [99]: 'weather-storm-night',
      }

      const iconSet = is_day ? dayIconSet : nightIconSet;

      icon.icon = iconSet[weathercode];
    }]]
  })

  return Box({
    class_name: 'bg-transparent rounded-full my-2 mx-4',
    vertical: false,
    hexpand: true,
    children: [
      weatherIcon,
      currentTemperature,
      temperatureSlider,
    ]
  })
}

const SysTrayItem = (item) => Button({
    child: Icon({ 
      binds: [['icon', item, 'icon']],
      size: 24,
      hpack: 'center',
      vpack: 'center',
      class_name: 'bg-transparent'
    }),
    class_name: "ma-2 rounded-full bg-transparent",
    binds: [['tooltip-markup', item, 'tooltip-markup']],
    on_primary_click: (_, event) => item.activate(event),
    on_secondary_click: (_, event) => item.openMenu(event),
});

const EndModule = () => Box({
    class_name: 'rounded-full bg-surface_background/60 ma-2',
    binds: [['children', SystemTray, 'items', item => [
      Weather(),
      Box({ hexpand: true }),
      ...item.map(SysTrayItem)
    ]]],
})

export const Top = () => {
  const content = CenterBox({
    class_name: "bg-base_background/60 rounded-b-6 mx-4",
    vexpand: true,
    hexpand: true,
    start_widget: StartModule(),
    center_widget: CenterModule(),
    end_widget: EndModule()
  });

  return Window({
    name: "powermode-top",
    class_name: "bg-transparent",
    anchor: ["top", "left", "right"],
    visible: true,
    exclusivity: "exclusive",
    child: SetupRevealer("slide_down", content, {
      width: "max",
      height: 60
    }),
  });
};
