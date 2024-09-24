import {
  Box,
  Button,
  CenterBox,
  Gdk,
  GLib,
  Label,
  Mpris,
  Slider,
  toCSS,
  Utils,
  Vte,
  Widget,
  Window
} from "../imports.js";
import { SetupRevealer } from "./index.js";

/** @typedef {import("../types/service/mpris.js").MprisPlayer | null} MprisPlayer */
/** @typedef {import("../types/service.js").Binding<any, any, MprisPlayer>} PlayerSignal */

const Terminal = Widget.subclass(Vte.Terminal, "AgsVteTerminal");

/** @type {Vte.Terminal} */
const terminal = Terminal({
  class_name: "bg-surface_background/60 rounded-4 ma-2",
  name: "lyrics-terminal",
});
const bgCol = new Gdk.RGBA();
bgCol.parse("rgba(9, 8, 27, 0.8)");
terminal.set_color_background(bgCol);

const { execAsync, exec } = Utils;

const MusicHeader = (/** @type MprisPlayer */ player) => {
  const box = Box({
    class_name: "bg-overlay_background/90 rounded-2xl p-sm",
    hexpand: false,
    vpack: "start",
    vertical: true,
    children: [
      Label({
        class_name: "text-2xl text-bold text-primary_foreground/100",
        wrap: true,
        label: player?.bind("track_title").transform((title) =>
          title.substring(0, 20)
        ) || "No title",
      }),
      Label({
        class_name: "text-lg",
        wrap: true,
        label: player?.bind("track_artists").transform((artists) =>
          artists.join(", ").substring(0, 20)
        ) || "No artist",
      }),
    ],
  });

  return box;
};

const MusicProgress = (/** @type MprisPlayer */ player) => {
  const progressBar = Slider({
    hexpand: true,
    draw_value: false,
    on_change: ({ value }) => {
      if (player) {
        player.position = value;
      } else {
        console.log(`Trying to change position to ${value} without player`);
      }
    },
    setup: self => {
       if (!player) return;

       const update = (/** @type {any} */ _, /** @type {number} */ time) => {
         self.value = time || player.position;
       };
       self.hook(player, update, 'position');
       self.poll(500, update);
    },        
    min: 0,
    max: player?.bind("length"),
    value: 0,
  });

  const progressText = Box({
    hexpand: true,
    class_name: "text-sm mx-2 mb-0",
    children: [
      Label({
       setup: self => {
            if (!player) return;

            const update = (/** @type {any} */ _, /** @type {number} */ time) => {
                player.length > 0
                    ? self.label = formatTime(time || player.position)
                    : self.visible = !!player;
            };
            self.hook(player, update, 'position');
            self.poll(500, update);
        },        
      }),
      Box({ hexpand: true }),
      Label({
        label: player?.bind("length").transform(formatTime) || "0:00",
      }),
    ],
  });

  const progress = Box({
    hexpand: true,
    vertical: true,
    children: [
      progressText,
      progressBar,
    ],
  });

  return progress;
};

const formatTime = (/** @type {number} */ seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const timeArr = [];

  if (hours > 0) timeArr.push(hours.toString().padStart(2, "0"));
  timeArr.push(minutes.toString().padStart(2, "0"));
  timeArr.push(secs.toFixed(0).toString().padStart(2, "0"));

  return timeArr.join(":");
};

const MusicControls = (/** @type {MprisPlayer} */ player) => {
  const buttonCss =
    "rounded-2xl mx-md min-h-12 min-w-12 text-4xl icon text-primary_foreground/100 bg-primary_background/60";

  const controls = Box({
    class_name: "min-h-2",
    spacing: 16,
    vpack: "end",
    hexpand: true,
    children: [
      Button({
        child: Label("󰒮"),
        class_name: buttonCss,
        hexpand: true,
        on_clicked: player?.previous.bind(player) ?? (() => {}),
      }),
      Button({
        child: Label({
          label: player?.bind("play_back_status").transform((status) =>
            status === "Playing" ? "󰏤" : "󰐊"
          ) || "󰐊",
        }),
        class_name: buttonCss,
        hexpand: true,
        on_clicked: player?.playPause.bind(player) ?? (() => {}),
      }),
      Button({
        child: Label("󰒭"),
        class_name: buttonCss,
        hexpand: true,
        on_clicked: player?.next.bind(player) ?? (() => {}),
      }),
    ],
  });

  const progress = MusicProgress(player);

  const box = Box({
    class_name: "bg-overlay_background/90 rounded-2xl p-sm",
    vertical: true,
    vexpand: true,
    vpack: "end",
    children: [
      progress,
      controls,
    ],
  });

  return box;
};

const MusicPlayer = () => {
  return CenterBox({
    attribute: {
      currentPlayerName: ""
    },
    setup: (self) =>
      self.hook(Mpris, (self) => {
        const players = Mpris.players
        const hasName = (/** @type {string} */ name) => (/** @type {MprisPlayer} */ player) => player?.name === name
        const player = 
          players.find(hasName("strawberry"))
          ?? players.find(hasName("Feishin"))
          ?? players.find(hasName("firefox"))
        if (player && player.name !== self.attribute.currentPlayerName) {
          console.log(`switching player to ${player.name}`);
          const startWidget = MusicHeader(player);
          const endWidget = MusicControls(player);

          self.start_widget = startWidget;
          self.end_widget = endWidget;

          self.attribute.currentPlayerName = player.name;
        }

        if (player) {
          const songArt = player.track_cover_url;

          self.css = toCSS({
            backgroundImage: `url('${songArt}')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minHeight: "240px",
          });
        }
      }),
    orientation: 1,
    vexpand: true,
    hexpand: true,
    start_widget: MusicHeader(null),
    end_widget: MusicControls(null),
    class_name: "bg-surface_background/100 pa-4 rounded-tl-6 rounded-b-6",
  });
};

const Music = () => {
  const player = MusicPlayer();


  return Box({
    class_name: "bg-transparent",
    vertical: true,
    children: [
      player
    ],
  });
};

const Lyrics = () => {
  terminal.set_size(26, 20);

  terminal.spawn_async(
    Vte.PtyFlags.DEFAULT,
    GLib.get_home_dir(),
    [
      "sptlrx",
      "--current",
      "bold",
      "--before",
      "#a6adc8,faint,italic",
      "--after",
      "104,faint",
    ],
    [],
    GLib.SpawnFlags.SEARCH_PATH,
    null,
    GLib.MAXINT32,
    null,
    null,
  );

  return Box({
    child: terminal,
    hpack: "center",
    class_name: "bg-transparent rounded-4 pa-2",
  });
};

export const Right = () => {
  const content = Box({
    class_name: "bg-base_background/60 rounded-l-6 my-2",
    vertical: true,
    children: [
      Music(),
      Lyrics(),
    ],
  });

  return Window({
    name: "powermode-right",
    class_name: "bg-transparent",
    anchor: ["top", "bottom", "right"],
    visible: true,
    exclusivity: "exclusive",
    child: SetupRevealer("slide_left", content, {
      width: 320,
      height: "max",
    }, true),
  });
};
