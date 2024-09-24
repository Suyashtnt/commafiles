{ config, pkgs, ... }: let
  theme = config.lib.stylix.colors;
in {
  xdg.portal.extraPortals = [pkgs.xdg-desktop-portal-gtk pkgs.xdg-desktop-portal-gnome pkgs.gnome-keyring];
  home.packages = [ pkgs.swww pkgs.brightnessctl pkgs.wl-clipboard ];
  programs.niri.settings = {
   binds = with config.lib.niri.actions; let
      sh = spawn "sh" "-c";
    in {
      "Mod+Shift+Slash".action = show-hotkey-overlay;

      "Mod+Q".action = spawn "wezterm";
      "Mod+D".action = sh "ags -t applauncher";
      "Mod+W".action = sh "ags -r 'togglePowerMode()'";
      "Mod+P".action = sh "ags -r 'toggleMusicOnly()'";

      "Mod+F".action = fullscreen-window;

      "Mod+H".action = focus-column-left;
      "Mod+J".action = focus-window-or-workspace-down;
      "Mod+K".action = focus-window-or-workspace-up;
      "Mod+L".action = focus-column-right;

      "Mod+Shift+H".action = move-column-left;
      "Mod+Shift+J".action = move-window-down-or-to-workspace-down;
      "Mod+Shift+K".action = move-window-up-or-to-workspace-up;
      "Mod+Shift+L".action = move-column-right;

      "Mod+Left".action = focus-column-left;
      "Mod+Down".action = focus-window-or-workspace-down;
      "Mod+Up".action = focus-window-or-workspace-up;
      "Mod+Right".action = focus-column-right;

      "Mod+Shift+Left".action = move-column-left;
      "Mod+Shift+Down".action = move-window-down-or-to-workspace-down;
      "Mod+Shift+Up".action = move-window-up-or-to-workspace-up;
      "Mod+Shift+Right".action = move-column-right;

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

      "XF86AudioRaiseVolume".action = sh "wpctl set-volume @DEFAULT_AUDIO_SINK@ 0.1+";
      "XF86AudioLowerVolume".action = sh "wpctl set-volume @DEFAULT_AUDIO_SINK@ 0.1-";
      "XF86AudioMute".action = sh "wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle";

      "XF86MonBrightnessUp".action = sh "brightnessctl set 5%+";
      "XF86MonBrightnessDown".action = sh "brightnessctl set 5%-";
      "XF86Calculator".action = sh "${pkgs.qalculate-gtk}/bin/qalculate-gtk";

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

    environment = {
      DISPLAY = ":0"; # xwayland-satellite
    };

    outputs."eDP-1" = {     
      variable-refresh-rate = true;
    };

    spawn-at-startup = [
      {
        command = ["ags"];
      }
      {
        command = ["swww-daemon"];
      }
      {
        command = ["dbus-update-activation-environment" "--all" "--systemd"];
      }
      {
        command = ["${pkgs.polkit_gnome}/libexec/polkit-gnome-authentication-agent-1"];
      }
      {
        command = [
          "sh" "-c" 
          ''
            eval $(gnome-keyring-daemon -s --components=pkcs11,secrets,ssh -f);
            export SSH_AUTH_SOCK;
          ''
        ];
      }
      {
        command = ["${pkgs.xwayland-satellite}/bin/xwayland-satellite"];
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
      focus-follows-mouse.enable = true;
      touchpad.click-method = "clickfinger";
    };

    animations = let
      movement-conf = {
        spring = {
          damping-ratio = 0.760000;
          epsilon = 0.000100;
          stiffness = 700;
        };
      };
    in {
      horizontal-view-movement = movement-conf;
      window-movement = movement-conf;
      workspace-switch = movement-conf;
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

      {
        matches = [
          {
            app-id = "^org.nickvision.cavalier$";
          }
        ];
        draw-border-with-background = false;
      }
      {
        geometry-corner-radius = {
          bottom-left = 12.0;
          bottom-right = 12.0;
          top-left = 12.0;
          top-right = 12.0;
        };
        clip-to-geometry = true;
      }
    ];
  };
}
