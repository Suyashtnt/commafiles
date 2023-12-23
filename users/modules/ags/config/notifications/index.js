import { Box, Notifications, Window } from "../imports.js";
import { Notification } from "./popup.js";

const PopupList = () =>
  Box({
    class_name: "ma-8 bg-transparent pa-[1px]",
    vertical: true,
    // @ts-expect-error this works. Generic types do be weird
    children: Notifications.bind("popups").transform((notifs) =>
      notifs.map(Notification)
    ),
  });

export const NotificationsPopup = () =>
  Window({
    class_name: "bg-transparent",
    name: "notification-popup-window",
    anchor: ["top", "right"],
    child: PopupList(),
  });
