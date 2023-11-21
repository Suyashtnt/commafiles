{config, pkgs, ...}: {
  programs.wezterm = {
    enable = true;
    package = pkgs.wezterm-git;
    extraConfig = builtins.readFile ./wezterm.lua;
    colorSchemes = let
      theme = config.tntman.theme;
    in {
      KleurDark = {
        ansi = [
          "#060516"
          "#ff5d66"
          "#27b892"
          "#ea9d00"
          "#44a8e7"
          "#ab8be3"
          "#00c2ba"
          "#60607a"
        ];
        background = "#09081b";
        brights = [
          "#45455d"
          "#ff5d66"
          "#27b892"
          "#ea9d00"
          "#44a8e7"
          "#ab8be3"
          "#00c2ba"
          "#dadbf8"
        ];
        compose_cursor = "#acaaff";
        cursor_bg = "#433889";
        cursor_border = "#acaaff";
        cursor_fg = "#acaaff";
        foreground = "#dadbf8";
        scrollbar_thumb = "#45455d";
        selection_bg = "#141327";
        selection_fg = "#d4d5f2";
        split = "#60607a";
        visual_bell = "#433889";

        indexed = {
          "16" = "#ea9d00";
          "17" = "#ffd687";
        };

        tab_bar = {
          background = "#060516";
          inactive_tab_edge = "#45455d";

          active_tab = {
            bg_color = "#433889";
            fg_color = "#acaaff";
            intensity = "Normal";
            italic = false;
            strikethrough = false;
            underline = "None";
          };

          inactive_tab = {
            bg_color = "#45455d";
            fg_color = "#adaeca";
            intensity = "Normal";
            italic = false;
            strikethrough = false;
            underline = "None";
          };

          inactive_tab_hover = {
            bg_color = "#141327";
            fg_color = "#e7e8ff";
            intensity = "Normal";
            italic = false;
            strikethrough = false;
            underline = "None";
          };

          new_tab = {
            bg_color = "#09081b";
            fg_color = "#dadbf8";
            intensity = "Normal";
            italic = false;
            strikethrough = false;
            underline = "None";
          };

          new_tab_hover = {
            bg_color = "#141327";
            fg_color = "#e7e8ff";
            intensity = "Normal";
            italic = false;
            strikethrough = false;
            underline = "None";
          };
        };
      };
    };
  };

  tntman.home.terminal = {
    executable = "${config.programs.wezterm.package}/bin/wezterm";
    name = "wezterm";
  };
}
