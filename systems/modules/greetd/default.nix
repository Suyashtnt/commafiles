{wallpapers, pkgs, ...}: {
  programs.regreet = {
    enable = true;
    settings = {
      background = {
        path = "${wallpapers}/Orbit.png";
        fit = "Cover";
      };
      GTK = {
        icon_theme_name = "Papirus-Dark";
        font_name = "Inter 13";
        cursor_theme_name = "Catppuccin-Mocha-Lavender-Cursors";
        theme_name = "adw-gtk3";
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
      command = "dbus-run-session cage -s -- regreet";
    };
  };
}
