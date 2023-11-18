import { Label, Window, Box } from "../imports.js";
import { SetupRevealer } from "./index.js";

export const Bottom = () => {
  const content = Box({
    className: "bg-mantle/60 rounded-t-6 pa-2 mx-4",
    vexpand: true,
    hexpand: true,
    child: Label({
      label: "Sample text"
    })
  })

  return Window({
    name: "powermode-bottom",
    className: "bg-transparent",
    anchor: ["bottom", "left", "right"],
    visible: true,
    exclusivity: "exclusive",
    child: SetupRevealer("slide_up", content),
  });
};
