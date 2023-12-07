import {
  Box,
  Button,
  Scrollable,
  Revealer,
  Utils,
  Window,
  Calendar,
  toCSS,
  Label,
  GLib,
  Variable
} from "../imports.js";
import { SetupRevealer } from "./index.js";

const { execAsync } = Utils

const ImageSelector = ({
  imagePath,
  onSelect
}) =>
  Button({
    class_name: "rounded-xl pa-0 border-none",
    on_clicked: onSelect,
    child: Box({
      css: toCSS({
          backgroundImage: `url('${imagePath}')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          minWidth: '280px',
          minHeight: '118px'
      }),
      class_name: "min-h-38 rounded-xl",
    }),
  });

export const Images = () => {
  const selectedImage = Variable(0)

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
  ]
    
  const imageWidgets = images.map((path, idx) => ImageSelector({ 
    imagePath: path,
    onSelect: () => {
      execAsync(
        `swww img -t wave --transition-angle 30 --transition-bezier 0.41,0.26,0.98,1 --transition-step 180 --transition-fps 60 --transition-duration 1.2 ${path}`,
      )
      selectedImage.value = idx
    }
  }));

  const revealer = Revealer({
    reveal_child: false,
    transition: "slide_down",
    class_name: "pa-[1px]",
    child: Scrollable({
      class_name: "min-h-128 mt-0 rounded-4",
      vscroll: "automatic",
      hscroll: "never",
      child: Box({
        vertical: true,
        spacing: 8,
        children: imageWidgets,
      })
    })
  })

  const genBoxCss = (/** @type {string} */ imagePath) => toCSS({
      backgroundImage: `url('${imagePath}')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minWidth: '380px',
      minHeight: '180px'
  })

  const button = Button({
    class_name: "bg-transparent border-none pa-0",
    on_clicked: () => revealer.reveal_child = !revealer.reveal_child,
    child: Box({
      css: genBoxCss(images[selectedImage.value]),
      class_name: "min-h-38 rounded-xl",
      connections: [[selectedImage, box => {
        box.css = genBoxCss(images[selectedImage.value])
      }]]
    }),
  })

  return Box({
    class_name: "rounded-xl mx-4 bg-surface_background/60 pa-0",
    vertical: true,
    spacing: 16,
    children: [
      button,
      revealer,
    ],
  });
};

const DateModule = () => {
  const revealer = Revealer({
    reveal_child: false,
    child: Calendar({
      show_day_names: false,
      show_heading: true,
      class_name: "bg-surface_background/40 border-none text-surface_foreground/100 pa-[1px]",
    }),
  })

  const button = Button({
    class_name: "rounded-rt-6 bg-transparent border-none",
    on_clicked: () => revealer.reveal_child = !revealer.reveal_child,
    child: Label({
      class_name: "text-surface_foreground/100 text-xl pt-[2px]",
      label: "Date",
      vpack: 'center',
      connections: [[1000, label =>
           label.label = GLib.DateTime.new_now_local().format("%H:%M:%S · %A %d/%m") ?? "No date"
      ]],
    }),
  })

  return Box({
    class_name: "rounded-rt-6 bg-surface_background/60 border-none",
    vertical: true,
    spacing: 8,
    children: [
      button,
      revealer,
    ]
  })
}

export const Left = () => {
  const content = Box({
    class_name: "bg-base_background/60 rounded-r-6 my-2",
    vertical: true,
    spacing: 8,
    children: [
      DateModule(),
      Images(),
    ],
  });

  return Window({
    name: "powermode-left",
    class_name: "bg-transparent",
    anchor: ["top", "left", "bottom"],
    visible: true,
    exclusivity: "exclusive",
    child: SetupRevealer("slide_right", content, {
      width: 320,
      height: "max",
    }),
  });
};
