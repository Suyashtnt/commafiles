import {
  Box,
  Button,
  CenterBox,
  Gdk,
  GLib,
  Label,
  Mpris,
  Revealer,
  Scrollable,
  Slider,
  toCSS,
  Utils,
  Variable,
  Vte,
  Widget,
  Window,
} from "../imports.js";
import { SetupRevealer } from "./index.js";
import { ShowPowerMode } from "./variables.js";

/** @typedef {import("../types/service/mpris.js").MprisPlayer | null} MprisPlayer */
/** @typedef {import("../types/service.js").Binding<any, any, MprisPlayer>} PlayerSignal */

// @ts-expect-error this is fine
const Terminal = Widget.subclass(Vte.Terminal, "AgsVteTerminal");

/** @type {Vte.Terminal} */
// @ts-expect-error this is fine
const terminal = Terminal({
  class_name: "bg-surface_background/60 rounded-4 ma-2",
  name: "lyrics-terminal",
});
const bgCol = new Gdk.RGBA();
bgCol.parse("rgba(9, 8, 27, 0.8)");
terminal.set_color_background(bgCol);

const { execAsync, exec } = Utils;

const getAlbumArtPath = (
  /** @type {{ album: { images: { url: string; }[]; }; }} */ song,
) => {
  const url = song.album.images[0].url;
  const filename = url.split("/").pop();

  const fileExists = async (/** @type {string} */ path) => {
    try {
      await execAsync(`test -f ${path}`);
      return true;
    } catch {
      return false;
    }
  };

  const homePath = GLib.get_home_dir();
  const filePath = `${homePath}/.cache/ags/media/${filename}`;

  fileExists(filePath).then((exists) => {
    if (!exists) {
      execAsync(`curl -s ${url} -o ${filePath}`).catch((e) => {
        console.log(`failed to download file: ${e}`);
      });
    }
  });

  return filePath;
};

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
    min: 0,
    max: player?.bind("length") || 1,
    value: player?.bind("position") || 0.5,
  });

  const progressText = Box({
    hexpand: true,
    class_name: "text-sm mx-2 mb-0",
    children: [
      Label({
        setup: (self) =>
          self
            .poll(500, (self) => {
              self.label = formatTime(player?.position || 0);
            }),
        label: "0:00",
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
          // @ts-expect-error this is fine
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
      hadPlayer: false,
    },
    setup: (self) =>
      self.hook(Mpris, (self) => {
        const player = Mpris.getPlayer("spotify_player");
        if (Boolean(player) !== self.attribute.hadPlayer) {
          console.log("switching player...");
          const startWidget = MusicHeader(player);
          const endWidget = MusicControls(player);

          self.start_widget = startWidget;
          self.end_widget = endWidget;

          self.attribute.hadPlayer = Boolean(player);
        }

        if (player) {
          const song = JSON.parse(exec("spotify_player get key playback"));
          const songArt = getAlbumArtPath(song.item);

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

/** @type {ReturnType<typeof Variable<{name: string; artists: string; coverArt: string; }[]>>} */
const currentQueue = Variable([], {
  poll: [5000, "spotify_player get key queue", (out) => {
    try {
      const { queue } = JSON.parse(out);

      return queue.map(
        (
          /** @type {{ name: string; artists: {name: string}[]; album: { images: { url: string; }[]; }; }} */ item,
        ) => {
          const coverArt = getAlbumArtPath(item);

          return {
            name: item.name,
            artists: item.artists.map((artist) => artist.name).join(", "),
            coverArt,
          };
        },
      );
    } catch (e) {
      // @ts-expect-error why the hell does gtk override the type
      console.log(e);
      return [];
    }
  }],
});

// since we refresh so often its beneficial to only start polling when we need to
ShowPowerMode.connect("changed", () => {
  if (ShowPowerMode.value.powerMode || ShowPowerMode.value.musicOnly) {
    currentQueue.startPoll();
  } else {
    currentQueue.stopPoll();
  }
});

const UpNext = () => {
  const queue = Box({
    vertical: true,
    spacing: 8,
    class_name: "pa-[1px]",
    children: Array(10).fill(0).map((_, idx) =>
      Box({
        class_name: "bg-overlay_background/40 rounded-lg pa-3",
        hexpand: true,
        children: [
          Box({
            class_name:
              "bg-overlay_background/100 rounded-lg min-h-10 min-w-10",
            css: currentQueue.bind("value").transform((queue) =>
              toCSS({
                backgroundImage: `url('${queue[idx]?.coverArt}')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              })
            ),
          }),
          Box({
            vertical: true,
            class_name: "mx-2",
            children: [
              Label({
                class_name: "text-lg mb-1",
                justification: "left",
                truncate: "end",
                label: currentQueue.bind("value").transform((queue) =>
                  queue[idx]?.name || "No title"
                ),
              }),
              Label({
                class_name: "text-md text-subtle/80",
                justification: "left",
                truncate: "end",
                label: currentQueue.bind("value").transform((queue) =>
                  queue[idx]?.artists || "No artist"
                ),
              }),
            ],
          }),
          Box({ hexpand: true }),
          Button({
            class_name:
              "icon text-2xl px-4 py-2 ml-4 bg-overlay_background/60 text-primary_foreground/100",
            child: Label("󰒬"),
            on_clicked: () => {
              for (let i = 0; i <= idx; i++) {
                Mpris.getPlayer("spotify_player")?.next();
              }
            },
          }),
        ],
      })
    ),
  });

  return Revealer({
    reveal_child: false,
    transition: "slide_down",
    transition_duration: 300,
    class_name: "pa-0 ma-0",
    child: Scrollable({
      class_name:
        "min-h-60 mx-3 pt-3 pa-3 bg-surface_background/60 rounded-b-4",
      vscroll: "automatic",
      hscroll: "never",
      hexpand: true,
      child: queue,
    }),
  });
};

const Music = () => {
  const upNext = UpNext();
  const player = MusicPlayer();

  const button = Button({
    class_name: "rounded-2xl p-0 bg-transparent",
    child: Label({
      label: "",
      justification: "center",
      class_name: "text-4xl text-primary_foreground/100 icon",
    }),
    on_clicked: (self) => {
      upNext.reveal_child = !upNext.reveal_child;

      /** @type {ReturnType<Label>} **/
      // @ts-expect-error look above
      const child = self.child;
      child.label = upNext.reveal_child ? "" : "";
    },
  });

  return Box({
    class_name: "bg-transparent",
    vertical: true,
    children: [
      player,
      upNext,
      button,
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
    // @ts-expect-error outdated typedefs
    null,
    null,
  );

  return Box({
    // @ts-expect-error this is fine
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
