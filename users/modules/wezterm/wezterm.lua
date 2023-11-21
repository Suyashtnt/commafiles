-- This table will hold the configuration.
local config = {}

-- In newer versions of wezterm, use the config_builder which will
-- help provide clearer error messages
if wezterm.config_builder then
  config = wezterm.config_builder()
end

config.color_scheme = 'KleurDark'
config.font = wezterm.font_with_fallback {
  "ComicCodeLigatures Nerd Font",
  "JetBrains Mono Nerd Font Mono",
}
config.window_background_opacity = 0.6
config.enable_wayland = true
config.front_end = "WebGpu";

-- and finally, return the configuration to wezterm
return config
