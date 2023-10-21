import { ShowPowerMode } from "./variables.js";
import { Top } from "./top.js";
import { Bottom } from "./bottom.js";
import { Left } from "./left.js";
import { Right } from "./right.js";
import { Revealer, Box } from "../imports.js";

export const SetupRevealer = (transition, content, isMusic = false) => Box({
  style: 'padding: 1px;',
  child: Revealer({
    revealChild: false,
    transition,
    connections: [[ShowPowerMode, revealer => {
      if (isMusic) {
        revealer.revealChild = ShowPowerMode.value.powerMode || ShowPowerMode.value.musicOnly
      } else {
        revealer.revealChild = ShowPowerMode.value.powerMode
      }

      revealer.className = revealer.revealChild ? 'bg-mantle/100' : ''
    }]],
    child: content
  }),
})

export const SetupPowerMode = () => {
  globalThis.togglePowerMode = () => {
    ShowPowerMode.value = {
      powerMode: !ShowPowerMode.value.powerMode,
      musicOnly: ShowPowerMode.value.musicOnly
    }

    return ShowPowerMode.value
  }

  globalThis.toggleMusicOnly = () => {
    ShowPowerMode.value = {
      powerMode: ShowPowerMode.value.powerMode,
      musicOnly: !ShowPowerMode.value.musicOnly
    }

    return ShowPowerMode.value
  }

  return [
    Left(),
    Right(),
    Top(),
    Bottom(),
  ];
}
