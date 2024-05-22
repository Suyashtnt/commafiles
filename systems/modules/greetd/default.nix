{wallpapers, pkgs, ...}: {
  programs.regreet = {
    enable = true;
    settings = {
      background.path = "${wallpapers}/Orbit.png";
      GTK = {
        icon_theme_name = "Papirus-Dark";
        font_name = "Inter 13";
        cursor_theme_name = "Catppuccin-Mocha-Lavender-Cursors";
      };
      commands = {
        reboot = ["systemctl" "reboot"];
        poweroff = ["systemctl" "poweroff"];
      };
    };
  };

  services.greetd = {
    enable = true;
    settings = {
      default_session = let 
        hyprland-conf = pkgs.writeText "hyprland-greeter.conf" ''
          exec-once = ${pkgs.greetd.regreet}/bin/regreet; hyprctl dispatch exit
        '';
      in {
        command = "dbus-run-session ${pkgs.hyprland}/bin/Hyprland --config ${hyprland-conf}";
        user = "tntman";
      };
    };
  };
}
