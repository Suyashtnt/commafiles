{wallpapers, pkgs, ...}: {
  programs.regreet = {
    enable = true;
    settings = {
      background = {
        path = "${wallpapers}/Orbit.png";
        fit = "Cover";
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
