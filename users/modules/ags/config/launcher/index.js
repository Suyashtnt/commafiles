import {
  App,
  Applications,
  Box,
  Entry,
  Scrollable,
  Window,
} from "../imports.js";
import { AppItem } from "./item.js";

export const WINDOW_NAME = "applauncher";

const Applauncher = ({ width = 500, height = 500, spacing = 12 } = {}) => {
  const list = Box({
    vertical: true,
    spacing,
    /** @type {ReturnType<AppItem>[]} */
    children: []
  });

  const entry = Entry({
    hexpand: true,
    css: `margin-bottom: ${spacing}px;`,
    text: "-",

    // to launch the first item on Enter
    on_accept: ({ text }) => {
      const list = Applications.query(text || "");
      if (list[0]) {
        App.toggleWindow(WINDOW_NAME);
        list[0].launch();
      }
    },

    // filter out the list
    on_change: ({ text }) =>
      list.children.map((/** @type {ReturnType<AppItem>} */ item) => {
        item.visible = item.attribute.app.match(text ?? '');
      }),
  });

  return Box({
    vertical: true,
    css: `margin: ${spacing * 2}px;`,
    class_name: "bg-base_background/60 rounded-6 pa-4",
    children: [
      entry,
      // wrap the list in a scrollable
      Scrollable({
        hscroll: "never",
        css: `
                    min-width: ${width}px;
                    min-height: ${height}px;
                `,
        child: list,
      }),
    ],

    setup: (self) =>
      self
        .hook(App, (_, name, visible) => {
          if (name !== WINDOW_NAME) {
            return;
          }

          list.children = Applications.list.map(AppItem);

          entry.text = "";
          if (visible) {
            entry.grab_focus();
          }
        }),
  });
};

export const Launcher = () => {
  const launcher = Window({
    name: WINDOW_NAME,
    class_name: "bg-transparent",
    visible: false,
    keymode: 'exclusive',
    child: Applauncher(),
  });

  
  launcher.keybind("Escape", () => App.closeWindow("window-name"))

  globalThis.toggleAppLauncher = () => {
    App.toggleWindow(WINDOW_NAME);
  };

  return launcher;
};
