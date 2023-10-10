import {
  Box,
  Button,
  Gtk,
  Scrollable,
  Utils,
  Window,
  Widget
} from "../imports.js";

const { execAsync } = Utils

const Calendar = Widget({
  type: Gtk.Calendar,
  showDayNames: false,
  showHeading: true,
  className: "rounded-rt-6 border-none",
});

const ImageSelector = ({
  imagePath,
}) =>
  Button({
    className: "rounded-xl pa-0",
    onClicked: () =>
      execAsync(
        `swww img -t wave --transition-angle 30 --transition-bezier 0.41,0.26,0.98,1 --transition-step 180 --transition-fps 60 --transition-duration 1.2 ${imagePath}`,
      ),
    child: Box({
      spacing: 10,
      style:
      // 21:9 aspect ratio
        `
          background-image: url('${imagePath}');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          min-width: 380px;
          min-height: 180px;
      `
          .trim()
          .replaceAll("\n", " "),
      className: "min-h-38 rounded-xl",
    }),
  });

export const Images = () => {
  const images = [
    "/home/tntman/commafiles/wallpapers/gabriel.png",
    "/home/tntman/commafiles/wallpapers/intoTheCatrix.png",
    "/home/tntman/commafiles/wallpapers/justAReallyCoolArtwork.png",
    "/home/tntman/commafiles/wallpapers/launch.jpg",
    "/home/tntman/commafiles/wallpapers/linox.png",
    "/home/tntman/commafiles/wallpapers/longRoadAhead.png",
    "/home/tntman/commafiles/wallpapers/Particles.png",
    "/home/tntman/commafiles/wallpapers/theAlmightyHexagon.png",
    "/home/tntman/commafiles/wallpapers/waves.png",
  ].map((path) => ImageSelector({ imagePath: path }));

  return Box({
    className: "rounded-xl mx-4",
    vertical: true,
    spacing: 8,
    children: images,
  });
};

export const Left = () => {
  const content = Box({
    className: "bg-mantle/100 rounded-r-6 p-md my-lg min-w-48",
    vertical: true,
    spacing: 8,
    children: [
      Calendar,
      Scrollable({
        className: "min-h-100",
        vscroll: "automatic",
        hscroll: "never",
        vexpand: true,
        child: Images(),
      }),
    ],
  });

  return Window({
    name: "powermode-left",
    className: "bg-transparent my-lg",
    anchor: ["top", "left", "bottom"],
    exclusive: true,
    popup: true,
    child: content,
  });
};
