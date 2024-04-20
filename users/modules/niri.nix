{ config, pkgs, ... }: let
  theme = config.lib.stylix.colors;
in {
  xdg.portal.extraPortals = [pkgs.xdg-desktop-portal-gtk];
  home.packages = [ pkgs.swww ];
  programs.niri.settings = {
    binds = with config.lib.niri.actions; {
      "Mod+Shift+Slash".action = show-hotkey-overlay;

      "Mod+Q".action = spawn "wezterm";
      "Mod+D".action = spawn "ags" "-t" "applauncher";
      "Mod+W".action = spawn "ags" "-r" "'togglePowerMode()'";
      "Mod+P".action = spawn "ags" "-r" "'toggleMusicOnly()'";

      "Mod+F".action = fullscreen-window;

      "Mod+H".action = focus-column-left;
      "Mod+J".action = focus-window-or-workspace-down;
      "Mod+K".action = focus-window-or-workspace-up;
      "Mod+L".action = focus-column-right;

      "Mod+Shift+H".action = move-column-left;
      "Mod+Shift+J".action = move-window-down-or-to-workspace-down;
      "Mod+Shift+K".action = move-window-up-or-to-workspace-up;
      "Mod+Shift+L".action = move-column-right;

      "Mod+Minus".action = set-column-width "-10%";
      "Mod+Shift+Equal".action = set-column-width "+10%";

      "Mod+Ctrl+Minus".action = set-window-height "-10%";
      "Mod+Ctrl+Shift+Equal".action = set-window-height "+10%";

      "Mod+S".action = screenshot;
      "Mod+Shift+S".action = screenshot-screen;

      "Mod+WheelScrollDown" = {
        cooldown-ms = 150;
        action = focus-workspace-down;
      };

      "Mod+WheelScrollUp" = {
        cooldown-ms = 150;
        action = focus-workspace-up;
      };

      "Mod+Shift+WheelScrollDown".action = focus-column-right;
      "Mod+Shift+WheelScrollUp".action = focus-column-left;
     
      "Mod+Shift+C".action = close-window;
      "Mod+Ctrl+Shift+C".action = quit;

      "Mod+Comma".action = consume-window-into-column;
      "Mod+Period".action = expel-window-from-column;

      "Mod+1".action = focus-workspace 1;
      "Mod+2".action = focus-workspace 2;
      "Mod+3".action = focus-workspace 3;
      "Mod+4".action = focus-workspace 4;
      "Mod+5".action = focus-workspace 5;
      "Mod+6".action = focus-workspace 6;
      "Mod+7".action = focus-workspace 7;
      "Mod+8".action = focus-workspace 8;
      "Mod+9".action = focus-workspace 9;

      "Mod+Shift+1".action = move-column-to-workspace 1;
      "Mod+Shift+2".action = move-column-to-workspace 2;
      "Mod+Shift+3".action = move-column-to-workspace 3;
      "Mod+Shift+4".action = move-column-to-workspace 4;
      "Mod+Shift+5".action = move-column-to-workspace 5;
      "Mod+Shift+6".action = move-column-to-workspace 6;
      "Mod+Shift+7".action = move-column-to-workspace 7;
      "Mod+Shift+8".action = move-column-to-workspace 8;
      "Mod+Shift+9".action = move-column-to-workspace 9;
    };     

    spawn-at-startup = [
      {
        command = ["ags"];
      }
      {
        command = ["swww-daemon"];
      }
    ];

    layout = {
      border = {
        active = {
          gradient = {
            angle = 130;
            relative-to = "workspace-view";
            from = "#${theme.base0D}";
            to = "#${theme.base0E}";
          };
        };
        inactive = { 
          gradient = {
            angle = 130;
            relative-to = "workspace-view";
            from = "#${theme.base0D}90";
            to = "#${theme.base0E}90";
         };  
       };
      };
    };

    input = {
      focus-follows-mouse = true;
      touchpad.click-method = "clickfinger";
    };

    window-rules = [
      {
        matches = [
          {
            app-id = "^org.wezfurlong.wezterm$";
          }
        ];
        default-column-width = {};    
      }
    ];
  };
}
