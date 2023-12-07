import {
  Box,
  Button,
  CenterBox,
  Label,
  Mpris,
  Scrollable,
  Slider,
  GLib,
  Gdk,
  Utils,
  Variable,
  Window,
  toCSS,
  Widget,
  Revealer,
  Vte,
} from "../imports.js";
import { SetupRevealer } from "./index.js";
import { ShowPowerMode } from "./variables.js";


const Terminal = Widget.subclass(Vte.Terminal, "AgsVteTerminal")

/** @type {Vte.Terminal} */
const terminal = Terminal({
  class_name: "bg-surface_background/60 rounded-4 ma-2",
  name: "lyrics-terminal"
})
const bgCol = new Gdk.RGBA()
bgCol.parse("rgba(9, 8, 27, 0.8)")
terminal.set_color_background(bgCol)

const { execAsync, exec } = Utils

const getAlbumArtPath = (/** @type {{ album: { images: { url: string; }[]; }; }} */ song) => {
  const url = song.album.images[0].url;
  const filename = url.split("/").pop();

  const fileExists = async (/** @type {string} */ path) => {
    try {
          await execAsync(`test -f ${path}`);
          return true;
    } catch {
        return false;
    }
  }

  const homePath = GLib.get_home_dir();
  const filePath = `${homePath}/.cache/ags/media/${filename}`

  fileExists(filePath).then(exists => {
    if(!exists) {
      execAsync(`curl -s ${url} -o ${filePath}`).catch(e => {
        console.log(`failed to download file: ${e}`);
      })
    }
  })

  return filePath
}

const MusicHeader = () => {
  const box = Box({
    class_name: "bg-overlay_background/90 rounded-2xl p-sm",
    hexpand: false,
    vpack: "start",
    vertical: true,
    children: [
      Label({
        class_name: "text-2xl text-bold text-primary_foreground/100",
        wrap: true,
        label: "No title",
      }),
      Label({
        class_name: "text-lg",
        wrap: true,
        label: "No artist",
      }),
    ],
  });

  box.updateInfo = (/** @type {{ title: string; artist: string; }} */ newInfo) => {
    box.children[0].label = newInfo.title.substring(0, 20)
    box.children[1].label = newInfo.artist.substring(0, 25)
  };

  return box;
};

const MusicProgress = () => {
  const progressBar = Slider({
    hexpand: true,
    draw_value: false,
    onChange: ({ value }) => {
      console.log(`Trying to change position to ${value} without player`);
    },
    min: 0,
    max: 1,
    value: 0.5,
  });

  const progressText = Box({
    hexpand: true,
    class_name: "text-sm mx-2 mb-0",
    children: [
      Label({ label: "0:00" }),
      Box({ hexpand: true }),
      Label({ label: "0:00" }),
    ]
  })

  progressBar.updatePlayer = (player) => {
    if (!player) return;

    progressBar.on_change = ({ value }) => {
      player.position = value;
    };

    progressBar.max = player.length;
    progressBar.value = player.position;
  };

  progressText.updatePlayer = (player) => {
    if (!player) return;

    progressText.children[0].label = formatTime(player.position);
    progressText.children[2].label = formatTime(player.length);
  };

  const progress = Box({
    hexpand: true,
    vertical: true,
    children: [
      progressText,
      progressBar,
    ]
  })

  progress.updatePlayer = (player) => {
    progress.children[0].updatePlayer(player);
    progress.children[1].updatePlayer(player);
  }

  return progress
};

const formatTime = (/** @type {number} */ millis) => {
  // format as hh:mm:ss (remove hours if less than 1 hour)
  const hours = Math.floor(millis / 3600);
  const minutes = Math.floor((millis % 3600) / 60);
  const seconds = Math.floor(millis % 60);

  const hourString = hours > 0 ? `${hours}:` : "";
  const minuteString = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
  const secondString = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${hourString}${minuteString}${secondString}`;
}

const MusicControls = () => {
  const buttonCss = "rounded-2xl mx-md min-h-12 min-w-12 text-4xl icon text-primary_foreground/100 bg-primary_background/60";

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
        on_clicked: () => {},
      }),
      Button({
        child: Label("󰐎"),
        class_name: buttonCss,
        hexpand: true,
        on_clicked: () => {},
      }),
      Button({
        child: Label("󰒭"),
        class_name: buttonCss,
        hexpand: true,
        on_clicked: () => {},
      }),
    ],
  });

  const progress = MusicProgress();

  controls.updatePlayer = (player) => {
    controls.children[0].on_clicked = () => player?.previous();

    controls.children[1].child.label = player?.playBackStatus === "Playing"
      ? "󰏤"
      : "󰐊";

    controls.children[1].on_clicked = () => player?.playPause();

    controls.children[2].on_clicked = () => player?.next();
  };

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

  box.updatePlayer = (player) => {
    box.children[0].updatePlayer(player);
    box.children[1].updatePlayer(player);
  };

  return box;
};

const Music = () => {
  const startWidget = MusicHeader();
  const endWidget = MusicControls();

  return CenterBox({
    connections: [
      [Mpris, (box) => {
        try {
          const player = Mpris.getPlayer("spotify_player");
          if (!player) throw new Error("No player");

          const song = JSON.parse(exec("spotify_player get key playback"))
          const songArt = getAlbumArtPath(song.item);

          box.css = toCSS({
            backgroundImage: `url('${songArt}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: '240px'
          })

          startWidget.updateInfo({
            title: player?.track_title || "No title",
            artist: player?.track_artists.join(", ") || "No artist",
          });

          endWidget.updatePlayer(player);
        } catch (_e)  {
          box.css = "";
          startWidget.updateInfo({
            title: "No title",
            artist: "No artist",
          });
          endWidget.updatePlayer(null);
        }
      }],
    ],
    vertical: true,
    start_widget: startWidget,
    end_widget: endWidget,
    class_name: "bg-surface_background/100 pa-4 rounded-tl-6 rounded-b-6",
  });
};

const currentQueue = Variable([], {
  poll: [10000, "spotify_player get key queue", (out) => {
    try {
      const { queue } = JSON.parse(out);

      return queue.map((item) => {
        const coverArt = getAlbumArtPath(item);

        return {
          name: item.name,
          artists: item.artists.map((artist) => artist.name).join(", "),
          coverArt
        };
      });
    } catch (e) {
      // @ts-ignore
      console.log(e)
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
    connections: [
      [
        currentQueue,
        (box) => {
          /** @type {Array} */ (currentQueue.value).slice(1, 10).forEach(({ name, artists, coverArt }, idx) => {

            /** @type {ReturnType<Box>} */
            // @ts-expect-error this is fine
            const coverArtBox = box.children[idx].children[0];
            coverArtBox.css = toCSS({
              backgroundImage: `url('${coverArt}')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            })

            /** @type {ReturnType<Box>} */
            // @ts-expect-error this is fine
            const songInfo = box.children[idx].children[1]

            songInfo.children[0].label = name;
            songInfo.children[1].label = artists;
          })
        }
      ],
    ],
    spacing: 8,
    class_name: "pa-[1px]",
    children: Array(9).fill(0).map((_, idx) =>
      Box({
        class_name: "bg-overlay_background/40 rounded-lg pa-3",
        hexpand: true,
        children: [
          Box({
            class_name: "bg-overlay_background/100 rounded-lg min-h-10 min-w-10",
          }),
          Box({
            vertical: true,
            class_name: "mx-2",
            children: [
              Label({
                class_name: "text-lg mb-1",
                xalign: 0,
                truncate: 'end',
                label: `Title`,
              }),
              Label({
                class_name: "text-md text-subtle/80",
                xalign: 0,
                truncate: 'end',
                label: `Artist`,
              })
            ]
          }),
          Box({ hexpand: true }),
          Button({
            class_name: "icon text-2xl px-4 py-2 ml-4 bg-overlay_background/60 text-primary_foreground/100",
            child: Label("󰒬"),
            on_clicked: () => {
              for (let i = 0; i <= idx; i++) {
                Mpris.getPlayer("spotify_player")?.next();
              }
            },
          }),
        ]
      })
    ),
  });

  const revealer = Revealer({
    reveal_child: false,
    transition: "slide_down",
    transition_duration: 300,
    child: Scrollable({
      class_name: "min-h-60 ma-3 pa-3 bg-surface_background/60 rounded-4",
      vscroll: "automatic",
      hscroll: "never",
      vexpand: true,
      child: queue
    }),
  })

  const button = Button({
    class_name: "rounded-2xl p-0 mx-4 mt-4 bg-transparent",
    child: Box({
      class_name: "bg-surface_background/40 rounded-lg pa-3",
      connections: [[
        currentQueue,
        box => {
            const { name, artists, coverArt } = currentQueue.value[0];

            /** @type {ReturnType<Box>} */
            // @ts-expect-error this is fine
            const coverArtBox = box.children[0];
            coverArtBox.css = toCSS({
              backgroundImage: `url('${coverArt}')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            })

            /** @type {ReturnType<Box>} */
            // @ts-expect-error this is fine
            const songInfo = box.children[1]

            songInfo.children[0].label = name;
            songInfo.children[1].label = artists;
        }
      ]],
      children: [
        Box({
          class_name: "bg-overlay_background/100 rounded-lg min-h-10 min-w-10",
        }),
        Box({
          vertical: true,
          class_name: "mx-2",
          children: [
            Label({
              class_name: "text-lg mb-1",
              xalign: 0,
              truncate: 'end',
              max_width_chars: 15,
              label: `Title`,
            }),
            Label({
              class_name: "text-md text-subtle/80",
              xalign: 0,
              truncate: 'end',
              max_width_chars: 20,
              label: `Artist`,
            })
          ]
        }),
      ]
    }),
    on_clicked: () => {
      revealer.reveal_child = !revealer.reveal_child
      setTimeout(() => {
        if(revealer.reveal_child) {
          terminal.set_size(18, 10)
        } else {
          terminal.set_size(18, 25)
        }
      }, 300)
    }
  })

  return Box({
    vertical: true,
    children: [
      button,
      revealer
    ]
  })
};


const Lyrics = () => {
  terminal.set_size(18, 25)

  // spawn `sptlrx --current "bold" --before "#a6adc8,faint,italic" --after "104,faint"`
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
    null
  );

  return terminal
}

export const Right = () => {
  const content = Box({
    class_name: "bg-base_background/60 rounded-l-6 my-2",
    vertical: true,
    children: [
      Music(),
      UpNext(),
      Lyrics()
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
    } ,true),
  });
};
