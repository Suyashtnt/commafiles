import { Window, Label, Box, Mpris, Utils, App, CenterBox, Button, Scrollable } from "../imports.js";

const MusicHeader = ({ title, artist }) => Box({
    vertical: true,
    children: [
        Label({
            className: "text-2xl",
            label: title
        }),
        Label({
            className: "text-lg",
            label: artist
        }),
    ]
})

const MusicControls = ({
    playPause,
    next,
    previous,
    isPlaying
}) => {
    const buttonCss = "rounded-2xl mx-md min-h-12 min-w-12 text-4xl";
    return Box({
        className: "min-h-2",
        spacing: 16,
        valign: 'end',
        hexpand: true,
        children: [
            Button({
                child: Label(''),
                className: buttonCss,
                hexpand: true,
                onClicked: previous
            }),
            Button({
                child: Label(isPlaying ? '' : ''),
                className: buttonCss,
                hexpand: true,
                onClicked: playPause
            }),
            Button({
                child: Label(''),
                className: buttonCss,
                hexpand: true,
                onClicked: next
            }),
        ]
    })
}


const Music = () =>  CenterBox({
    connections: [
        [Mpris, box => {
            const player = Mpris.getPlayer('spotify_player');
            const scriptPath = App.configDir + '/scripts/getCoverArt';
            const songArt = Utils.exec(scriptPath);

            box.style = `background-image: linear-gradient(0deg, rgba(1,1,1,1) 0%, rgba(51,51,51,0.2) 40%, rgba(77,77,77,0.7) 75%, rgba(51,51,51,0.8) 90%, rgba(0,0,0,0.8) 100%), url('${songArt}'); background-size: cover; background-repeat: no-repeat; background-position: center; min-height: 500px;`;

            box.startWidget = MusicHeader({
                title: player?.trackTitle.substr(0, 30) || "No title",
                artist: player?.trackArtists.join(", ").substr(0, 30) || "No artist"
            })

            box.endWidget = MusicControls({
                next: () => player?.next(),
                previous: () => player?.previous(),
                playPause: () => player?.playPause(),
                isPlaying: player?.playBackStatus === "Playing"
            })
        }]
    ],
    vertical: true,
    className: "bg-surface0/100 p-sm rounded-tl-6",
})

const UpNext = () => {
    const command = ["nu", "-c", "spotify_player get key queue | from json | get queue | each { get name artists } | each { |it| $it | update 1 ($it | get 1 | each { get name }) } | each { |it| { name: ($it | get 0), artists: ($it | get 1) } } | to json"]

    const createContent = async () => {
        const output = await Utils.execAsync(command).catch(err => {
            console.error(err)
            return "[]"
        })

        const content = JSON.parse(output).map(({ name, artists }) => {
            // at max have 10 characters in the name
            // any spare characters can be added to the artist list
            // if the artist list is too long, then it will be cut off
            // at 10 characters + the extra characters from the name

            const newName = name.substring(0, 15)

            const artistLength = 12 + (15 - newName.length)
            const newArtists = artists.join(", ").substring(0, artistLength)

            return Box({
                vertical: true,
                className: "bg-surface0/100 rounded-lg p-sm",
                child: Label({
                    className: "text-lg",
                    label: `${newName} - ${newArtists}`
                })
            })
        })

        return content
    }

    return Box({
        className: "rounded-xl mx-4 my-sm",
        vertical: true,
        connections: [
            [Mpris, async box => {
                const content = await createContent();
                box.children = content
            }]
        ],
        spacing: 8,
        children: []
    })
}

export const Right = () => {
    const content = Box({
        className: "bg-mantle/100 rounded-l-6 p-md my-lg",
        vertical: true,
        children: [
            Music(),
            Scrollable({
                className: "min-h-100",
                vscroll: "automatic",
                hscroll: "never",
                vexpand: true,
                child: UpNext()
            })
        ]
    })

    return Window({
        name: "powermode-right",
        className: "bg-transparent my-lg",
        anchor: ["top", "bottom", "right"],
        exclusive: true,
        popup: true,
        child: content
    })
}
