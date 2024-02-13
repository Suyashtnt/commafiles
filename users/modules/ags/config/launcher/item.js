import { App, Box, Button, Icon, Label } from "../imports.js";
import { WINDOW_NAME } from "./index.js";

/** @param {import('resource:///com/github/Aylur/ags/service/applications.js').Application} app */
export const AppItem = (app) =>
  Button({
    on_clicked: () => {
      App.closeWindow(WINDOW_NAME);
      app.launch();
    },
    attribute: { app },
    class_name: "bg-surface_background/60 rounded-4",
    child: Box({
      children: [
        Icon({
          icon: app.icon_name || "",
          class_name: "mr-4",
          size: 42,
        }),
        Box({
          vertical: true,
          vpack: "center",
          children: [
            Label({
              class_name: "text-xl text-surface_foreground/100",
              label: app.name,
              xalign: 0,
              vpack: "center",
              truncate: "end",
            }),
            Label({
              class_name: "text-lg font-light text-subtle/60",
              label: app.description || "",
              wrap: true,
              xalign: 0,
              justification: "left",
              vpack: "center",
            }),
          ],
        }),
      ],
    }),
  });
