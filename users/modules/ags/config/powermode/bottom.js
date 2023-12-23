import { Box, Label, Window } from "../imports.js";
import { SetupRevealer } from "./index.js";

export const Bottom = () => {
  const content = Box({
    class_name: "bg-base_background/60 rounded-t-6 pa-2 mx-4",
    vexpand: true,
    hexpand: true,
    child: Label({
      label: "Sample text",
    }),
  });

  return Window({
    name: "powermode-bottom",
    class_name: "bg-transparent",
    anchor: ["bottom", "left", "right"],
    visible: true,
    exclusivity: "exclusive",
    child: SetupRevealer("slide_up", content, {
      width: "max",
      height: 60,
    }),
  });
};
