{wallpapers, pkgs, ...}: {
  programs.regreet = {
    enable = true;
    settings = {
      background.path = "${wallpapers}/Particles.png";
      GTK = {
        theme_name = "Catppuccin-Mocha-Standard-Lavender-Dark";
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
        command = "${pkgs.hyprland}/bin/Hyprland --config ${hyprland-conf}";
        user = "tntman";
      };
    };
  };
}
