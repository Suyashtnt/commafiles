import { EventBox, Icon, Box, Button, Label, Utils, Notifications, toCSS } from '../imports.js'
/** @typedef {NonNullable<ReturnType<typeof Notifications.getNotification>>} Notification */

const { lookUpIcon, timeout } = Utils

const NotificationIcon = (
  /** @type {Notification} */
  { image, app_icon: appIcon, app_entry: appEntry }
) => {
    if (image) {
        return Box({
            vpack: 'start',
            hexpand: false,
            className: 'rounded-xl mr-2 min-w-18 min-h-18 bg-mantle/100',
            css: toCSS({
                backgroundImage: `url('${image}')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }),
        });
    }

    let icon = 'dialog-information-symbolic';
    if (lookUpIcon(appIcon))
        icon = appIcon;

    if (appEntry && lookUpIcon(appEntry))
        icon = appEntry;

    return Box({
        vpack: 'start',
        hexpand: false,
        className: 'rounded-xl mr-2 min-w-24 min-h-24',
        children: [Icon({
            icon, 
            size: 58,
            hpack: 'center', hexpand: true,
            vpack: 'center', vexpand: true,
        })],
    });
};

/** @param {Notification} notification */
export const Notification = notification => EventBox({
    className: `${notification.urgency}`,
    onPrimaryClick: () => notification.dismiss(),
    properties: [['hovered', false]],
    onHover: self => {
        if (self._hovered)
            return;

        // if there are action buttons and they are hovered
        // EventBox onHoverLost will fire off immediately,
        // so to prevent this we delay it
        timeout(300, () => self._hovered = true);
    },
    onHoverLost: self => {
        if (!self._hovered)
            return;

        self._hovered = false;
        notification.dismiss();
    },
    vexpand: false,
    child: Box({
        vertical: true,
        style: 'box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);',
        className: 'mb-4 rounded-xl bg-mantle/100',
        children: [
            Box({
                children: [
                    NotificationIcon(notification),
                    Box({
                        hexpand: true,
                        vertical: true,
                        children: [
                            Box({
                                children: [
                                    Label({
                                        className: 'text-xl min-w-64',
                                        xalign: 0,
                                        justification: 'left',
                                        hexpand: true,
                                        wrap: true,
                                        label: notification.summary,
                                        useMarkup: true,
                                    }),
                                    Button({
                                        className: 'ma-0 pa-0 min-h-10 min-w-10 rounded-full bg-transparent',
                                        vpack: 'start',
                                        child: Icon('window-close-symbolic'),
                                        onClicked: notification.close.bind(notification),
                                    }),
                                ],
                            }),
                            Label({
                                className: 'text-subtext1/80 text-lg',
                                hexpand: true,
                                useMarkup: true,
                                xalign: 0,
                                justification: 'left',
                                label: notification.body,
                                wrap: true,
                            }),
                        ],
                    }),
                ],
            }),
            Box({
                children: notification.actions.map(({ id, label }) => Button({
                  className: 'mx-2 first:ml-0 last:mr-0 first:last:mx-0',
                    onClicked: () => notification.invoke(id),
                    hexpand: true,
                    child: Label({ label }),
                })),
            }),
        ],
    }),
});
