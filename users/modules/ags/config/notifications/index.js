import { Box, Notifications, Window, toCSS } from '../imports.js'
import { Notification } from './popup.js'

const PopupList = () => Box({
    className: 'ma-8 bg-transparent',
    css: toCSS({
      padding: '1px'
    }), 
    vertical: true,
    binds: [['children', Notifications, 'popups',
        popups => popups.map(Notification)]],
});

export const NotificationsPopup = () => Window({
    className: 'bg-transparent',
    name: 'notification-popup-window',
    anchor: ['top', 'right'],
    child: PopupList(),
});
