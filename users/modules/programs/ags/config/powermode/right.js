import {
  App,
  Box,
  Button,
  CenterBox,
  Label,
  Mpris,
  Scrollable,
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

const MusicControls = () => {
  const buttonCss = "rounded-2xl mx-md min-h-12 min-w-12 text-4xl icon";

  const box = Box({
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

  box.updatePlayer = (player) => {
    box.children[0].onClicked = () => player?.previous();

    box.children[1].child.label = player?.playBackStatus === "Playing"
      ? "󰏤"
      : "󰐊";
    box.children[1].onClicked = () => player?.playPause();

    box.children[2].onClicked = () => player?.next();
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
          `background-image: linear-gradient(0deg, rgba(1,1,1,1) 0%, rgba(51,51,51,0.2) 40%, rgba(77,77,77,0.7) 75%, rgba(51,51,51,0.8) 90%, rgba(0,0,0,0.8) 100%), url('${songArt}'); background-size: cover; background-repeat: no-repeat; background-position: center; min-height: 500px;`;

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
