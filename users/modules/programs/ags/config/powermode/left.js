import { Window, Label, Button, Utils, Box, Scrollable, CenterBox, Gtk } from "../imports.js";

const Calendar = ags.Widget({
    type: Gtk.Calendar,
    showDayNames: false,
    showHeading: true,
    className: "rounded-rt-6 border-none",
});

const ImageSelector = ({
    imagePath,
    name
}) => Button({
    className: "rounded-xl pa-0",
    onClicked: () => 
    Utils.execAsync(`swww img -t wave --transition-angle 30 --transition-bezier 0.41,0.26,0.98,1 --transition-step 180 --transition-fps 60 --transition-duration 1.2 ${imagePath}`),
    child: CenterBox({
        spacing: 10,
        style: `background-image: linear-gradient(0deg, rgba(1,1,1,1) 0%, rgba(0,0,0,0) 40%), url('${imagePath}'); background-size: cover; background-repeat: no-repeat; background-position: center;`,
        className: "min-h-38 rounded-xl",
        endWidget: Label({
            valign: Gtk.Align.END,
            className: "text-2xl font-bold mx-8 mb-2",
            label: name
        })
    })
})

export const Images = () => {
    const images = [
        {
            name: "Gabriel ultrakill",
            path: "/home/tntman/commafiles/wallpapers/gabriel.png"
        },
        {
            name: "Into the catrix",
            path: "/home/tntman/commafiles/wallpapers/intoTheCatrix.png"
        },
        {
            name: "I don't know how to describe this",
            path: "/home/tntman/commafiles/wallpapers/justAReallyCoolArtwork.png"
        },
        {
            name: "Takeoff",
            path: "/home/tntman/commafiles/wallpapers/launch.jpg"
        },
        {
            name: "Linox",
            path: "/home/tntman/commafiles/wallpapers/linox.png"
        },
        {
            name: "Long road ahead",
            path: "/home/tntman/commafiles/wallpapers/longRoadAhead.png"
        },
        {
            name: "Particle system (OC!)",
            path: "/home/tntman/commafiles/wallpapers/Particles.png"
        },
        {
            name: "The almighty shape",
            path: "/home/tntman/commafiles/wallpapers/theAlmightyHexagon.png"
        },
        {
            name: "wavy",
            path: "/home/tntman/commafiles/wallpapers/waves.png"
        }
    ].map(({ name, path }) => ImageSelector({ name, imagePath: path }))

    return Box({
        className: "rounded-xl mx-4",
        vertical: true,
        spacing: 8,
        children: images
    })
}

export const Left = () => {
    const content = Box({
        className: "bg-mantle/100 rounded-r-6 p-md my-lg",
        vertical: true,
        spacing: 8,
        children: [
            Calendar,
            Scrollable({
                className: "min-h-100",
                vscroll: "automatic",
                hscroll: "never",
                vexpand: true,
                child: Images()
            })
        ]
    })

    return Window({
        name: "powermode-left",
        className: "bg-transparent my-lg",
        anchor: ["top", "left", "bottom"],
        exclusive: true,
        popup: true,
        child: content
    })
}
