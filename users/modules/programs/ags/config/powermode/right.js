import {
  App,
  Box,
  Button,
  CenterBox,
  Label,
  Mpris,
  Scrollable,
  Slider,
  Utils,
  Variable,
  Window,
} from "../imports.js";

const MusicHeader = () => {
  const box = Box({
    vertical: true,
    children: [
      Label({
        className: "text-2xl",
        label: "No title",
      }),
      Label({
        className: "text-lg",
        label: "No artist",
      }),
    ],
  });

  box.updateInfo = (newInfo) => {
    box.children[0].label = newInfo.title;
    box.children[1].label = newInfo.artist;
  };

  return box;
};

const MusicProgress = () => {
  const progress = Slider({
    className: "bg-surface0/100 rounded-2xl",
    hexpand: true,
    drawValue: false,
    onChange: ({ value }) => {
      console.log(`Trying to change position to ${value} without player`);
    },
    min: 0,
    max: 1,
    value: 0.5,
  });

  progress.updatePlayer = (player) => {
    if (!player) return;

    progress.onChange = ({ value }) => {
      player.position = value;
    };

    progress.max = player.length;
    progress.value = player.position;
  };

  return progress;
};

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
    className: "bg-surface0/100 rounded-2xl p-sm",
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
        const player = Mpris.getPlayer("spotify_player");
        const scriptPath = App.configDir + "/scripts/getCoverArt";
        const songArt = Utils.exec(scriptPath);

        box.style =
          `background-image: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.5984768907563025) 15%, rgba(34,34,34,0) 20%, rgba(255,255,255,0) 100%), url('${songArt}'); background-size: cover; background-repeat: no-repeat; background-position: center; min-height: 500px;`;

        startWidget.updateInfo({
          title: player?.trackTitle.substr(0, 30) || "No title",
          artist: player?.trackArtists.join(", ").substr(0, 30) || "No artist",
        });

        endWidget.updatePlayer(player);
      }],
    ],
    vertical: true,
    startWidget,
    endWidget,
    className: "bg-surface0/100 p-sm rounded-tl-6",
  });
};

/**
 * @type {{value: {name: string, artists: string}[]}}
 */
const currentQueue = Variable([], {
  poll: [1000, "spotify_player get key queue", (out) => {
    try {
      const { queue } = JSON.parse(out);

      return queue.map(({ name, artists }) => {
        // at max have 10 characters in the name
        // any spare characters can be added to the artist list
        // if the artist list is too long, then it will be cut off
        // at 10 characters + the extra characters from the name

        const newName = name.substring(0, 15);

        const artistLength = 12 + (15 - newName.length);
        const newArtists = artists.map((artist) => artist.name).join(", ")
          .substring(0, artistLength);

        return {
          name: newName,
          artists: newArtists,
        };
      });
    } catch (e) {
      return [];
    }
  }],
});

const UpNext = () => {
  return Box({
    className: "rounded-xl mx-4 my-sm",
    vertical: true,
    connections: [
      [
        currentQueue,
        (box) =>
          currentQueue.value.slice(0, 10).forEach(({ name, artists }, idx) => {
            box.children[idx].children[0].label = `${name} - ${artists}`;
          }),
      ],
    ],
    spacing: 8,
    children: Array(10).fill(0).map(() =>
      Box({
        vertical: true,
        className: "bg-surface0/100 rounded-lg p-sm",
        child: Label({
          className: "text-lg",
          label: `Waiting for spotify...`,
        }),
      })
    ),
  });
};

export const Right = () => {
  const content = Box({
    className: "bg-mantle/100 rounded-l-6 p-md my-lg",
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
    className: "bg-transparent my-lg",
    anchor: ["top", "bottom", "right"],
    exclusive: true,
    popup: true,
    child: content,
  });
};
