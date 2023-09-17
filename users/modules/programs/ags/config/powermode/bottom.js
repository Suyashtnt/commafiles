import { Label, Window } from "../imports.js";

export const Bottom = () => {
  const content = Label({
    className: "bg-mantle/100 pmb p-md mx-md",
    label: "Sample text",
  });

  return Window({
    name: "powermode-bottom",
    className: "bg-transparent",
    anchor: ["bottom", "left", "right"],
    exclusive: true,
    popup: true,
    child: content,
  });
};
