import { SetupPowerMode } from "./powermode/index.js";
import { App } from './imports.js'
import { NotificationsPopup } from "./notifications/index.js";

export default {
  notificationPopupTimeout: 5000, // milliseconds
  style: App.configDir + "/style.css",
  windows: [
    ...SetupPowerMode(),
    NotificationsPopup(),
  ],
};
