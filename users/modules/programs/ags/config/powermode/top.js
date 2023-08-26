import { Window, Label } from "../imports.js";

export const Top = () => {
    const content = Label({
        className: "bg-mantle/100 pmt p-md mx-md",
        label: "Sample text"
    })

    return Window({
        name: "powermode-top",
        className: "bg-transparent",
        anchor: ["top", "left", "right"],
        exclusive: true,
        popup: true,
        child: content
    })
}
