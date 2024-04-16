-- This table will hold the configuration.
local config = {}

-- In newer versions of wezterm, use the config_builder which will
-- help provide clearer error messages
if wezterm.config_builder then
  config = wezterm.config_builder()
end

config.color_scheme = 'stylix'
config.font = wezterm.font_with_fallback {
  "ComicCodeLigatures Nerd Font",
  "JetBrains Mono Nerd Font Mono",
}
config.window_background_opacity = 0.6
config.enable_wayland = true
config.enable_tab_bar = false
config.underline_thickness = "2pt"

local gpus = wezterm.gui.enumerate_gpus()
config.front_end = "WebGpu"
config.webgpu_preferred_adapter = gpus[2]

-- and finally, return the configuration to wezterm
return config
