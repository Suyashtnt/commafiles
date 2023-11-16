import {
  Box,
  Button,
  CenterBox,
  Label,
  Mpris,
  Scrollable,
  Slider,
  GLib,
  Utils,
  Variable,
  Window,
} from "../imports.js";
import { SetupRevealer } from "./index.js";
import { ShowPowerMode } from "./variables.js";0

const { execAsync, exec } = Utils

const getAlbumArtPath = (song) => {
  const url = song.album.images[0].url;
  const filename = url.split("/").pop();

  const fileExists = async (path) => {
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
    vertical: true,
    children: [
      Label({
        className: "text-2xl",
        wrap: true,
        label: "No title",
      }),
      Label({
        className: "text-lg",
        wrap: true,
        label: "No artist",
      }),
    ],
  });

  box.updateInfo = (newInfo) => {
    box.children[0].label = newInfo.title.substring(0, 22)
    box.children[1].label = newInfo.artist.substring(0, 25)
                                           
  };

  return box;
};

const MusicProgress = () => {
  const progressBar = Slider({
    hexpand: true,
    drawValue: false,
    onChange: ({ value }) => {
      console.log(`Trying to change position to ${value} without player`);
    },
    min: 0,
    max: 1,
    value: 0.5,
  });

  const progressText = Box({
    hexpand: true,
    className: "text-sm mx-2 mb-0",
    children: [
      Label({ label: "0:00" }),
      Box({ hexpand: true }),
      Label({ label: "0:00" }),
    ]
  })

  progressBar.updatePlayer = (player) => {
    if (!player) return;

    progressBar.onChange = ({ value }) => {
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

const formatTime = (millis) => {
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
  const buttonCss = "rounded-2xl mx-md min-h-12 min-w-12 text-4xl icon";

  const controls = Box({
    className: "min-h-2",
    spacing: 16,
    valign: "end",
    hexpand: true,
    children: [
      Button({
        child: Label("󰒮"),
        className: buttonCss,
        hexpand: true,
        onClicked: () => {},
      }),
      Button({
        child: Label("󰐎"),
        className: buttonCss,
        hexpand: true,
        onClicked: () => {},
      }),
      Button({
        child: Label("󰒭"),
        className: buttonCss,
        hexpand: true,
        onClicked: () => {},
      }),
    ],
  });

  const progress = MusicProgress();

  controls.updatePlayer = (player) => {
    controls.children[0].onClicked = () => player?.previous();

    controls.children[1].child.label = player?.playBackStatus === "Playing"
      ? "󰏤"
      : "󰐊";

    controls.children[1].onClicked = () => player?.playPause();

    controls.children[2].onClicked = () => player?.next();
  };

  const box = Box({
    className: "bg-surface0/90 rounded-2xl p-sm",
    vertical: true,
    vexpand: true,
    valign: "end",
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

          box.style =
            `background-image: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.6) 15%, rgba(34,34,34,0) 100%), url('${songArt}'); background-size: cover; background-repeat: no-repeat; background-position: center; min-height: 280px;`;

          startWidget.updateInfo({
            title: player?.trackTitle || "No title",
            artist: player?.trackArtists.join(", ") || "No artist",
          });

          endWidget.updatePlayer(player);
        } catch (_e)  {
          box.style = "";
          startWidget.updateInfo({
            title: "No title",
            artist: "No artist",
          });
          endWidget.updatePlayer(null);
        }
      }],
    ],
    vertical: true,
    startWidget,
    endWidget,
    className: "bg-surface0/100 p-sm rounded-tl-6",
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
  return Box({
    className: "rounded-xl mx-4 my-4",
    vertical: true,
    connections: [
      [
        currentQueue,
        (box) => {
          currentQueue.value.slice(0, 10).forEach(({ name, artists, coverArt }, idx) => {
            const coverArtBox = box.children[idx].children[0];
            coverArtBox.style = `background-image: url('${coverArt}'); background-size: cover; background-repeat: no-repeat; background-position: center;`;

            const songInfo = box.children[idx].children[1]
            songInfo.children[0].label = name;
            songInfo.children[1].label = artists;
          })
        }
      ],
    ],
    spacing: 8,
    children: Array(10).fill(0).map((_, idx) =>
      Box({
        className: "bg-surface0/80 rounded-lg pa-3",
        hexpand: true,
        children: [
          Box({
            className: "bg-surface0/100 rounded-lg min-h-10 min-w-10",
          }),
          Box({
            vertical: true,
            className: "mx-2",
            children: [
              Label({
                className: "text-lg mb-1",
                xalign: 0,
                truncate: 'end',
                label: `Title`,
              }),
              Label({
                className: "text-md text-subtext0/80",
                xalign: 0,
                truncate: 'end',
                label: `Artist`,
              })
            ]
          }),
          Box({ hexpand: true }),
          Button({
            className: "icon text-2xl px-4 py-2 ml-4",
            child: Label("󰒬"),
            onClicked: () => {
              for (let i = 0; i <= idx; i++) {
                Mpris.getPlayer("spotify_player").next();
              }
            },
          }),
        ]
      })
    ),
  });
};

export const Right = () => {
  const content = Box({
    className: "bg-mantle/60 rounded-l-6 my-4 min-w-48",
    vertical: true,
    children: [
      Music(),
      Scrollable({
        className: "min-h-100",
        vscroll: "automatic",
        hscroll: "never",
        vexpand: true,
        child: UpNext(),
      }),
    ],
  });

  return Window({
    name: "powermode-right",
    className: "bg-transparent",
    anchor: ["top", "bottom", "right"],
    exclusive: true,
    visible: true,
    child: SetupRevealer("slide_left", content, true),
  });
};
