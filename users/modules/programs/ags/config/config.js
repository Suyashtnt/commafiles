import { PowerMode } from './powermode/index.js'

const css = ags.App.configDir + '/style.css';

export default {
    notificationPopupTimeout: 5000, // milliseconds
    style: css,
    windows: [
        ...PowerMode()
    ],
};
