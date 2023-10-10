import { PowerMode } from "./powermode/index.js";
import { NotificationsPopup } from "./notifications/index.js";

export default {
  notificationPopupTimeout: 5000, // milliseconds
  style: ags.App.configDir + "/style.css",
  windows: [
    ...PowerMode(),
    NotificationsPopup(),
  ],
};
