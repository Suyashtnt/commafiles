import {
  Box,
  Button,
  Scrollable,
  Utils,
  Window,
  Calendar,
  toCSS
} from "../imports.js";
import { SetupRevealer } from "./index.js";

const { execAsync } = Utils

const ImageSelector = ({
  imagePath,
}) =>
  Button({
    className: "rounded-xl pa-0 border-none",
    onClicked: () =>
      execAsync(
        `swww img -t wave --transition-angle 30 --transition-bezier 0.41,0.26,0.98,1 --transition-step 180 --transition-fps 60 --transition-duration 1.2 ${imagePath}`,
      ),
    child: Box({
      spacing: 10,
      css: toCSS({
          backgroundImage: `url('${imagePath}')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          minWidth: '380px',
          minHeight: '180px'
      }),
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
    className: "bg-base_background/60 rounded-r-6 min-w-48 my-2",
    vertical: true,
    spacing: 8,
    children: [
      Calendar({
        showDayNames: false,
        showHeading: true,
        className: "rounded-rt-6 bg-surface_background/60 border-none text-surface_foreground/100",
      }),
      Scrollable({
        className: "min-h-100 ma-3 mt-0 pa-3 bg-surface_background/60 rounded-4",
        vscroll: "automatic",
        hscroll: "never",
        vexpand: true,
        child: Images(),
      }),
    ],
  });

  return Window({
    name: "powermode-left",
    className: "bg-transparent",
    anchor: ["top", "left", "bottom"],
    visible: true,
    exclusivity: "exclusive",
    child: SetupRevealer("slide_right", content),
  });
};
