{pkgs, ...}: {
  home.packages = with pkgs; [swaylock-effects];

  programs.swaylock = {
    settings = {
      clock = true;
      color = "2e3440";
      show-failed-attempts = true;
      indicator = true;
      indicator-radius = 200;
      indicator-thickness = 20;
      line-color = "2e3440";
      ring-color = "434c5e";
      inside-color = "3b4252";
      key-hl-color = "5e81ac";
      separator-color = "00000000";
      text-color = "d8dee9";
      text-caps-lock-color = "";
      line-ver-color = "2e3440";
      ring-ver-color = "81a1c1";
      inside-ver-color = "2e3440";
      text-ver-color = "d8dee9";
      ring-wrong-color = "bf616a";
      text-wrong-color = "cce9ea";
      inside-wrong-color = "3b4252";
      inside-clear-color = "3b4252";
      text-clear-color = "d8dee9";
      ring-clear-color = "a3be8c";
      bs-hl-color = "bf616a";
      line-uses-ring = false;
      grace = 2;
      grace-no-mouse = true;
      grace-no-touch = true;
      datestr = "%d.%m";
      fade-in = "0.1";
      ignore-empty-password = true;
    };
  };

  services.swayidle = {
    enable = true;
    events = [
      {
        event = "before-sleep";
        command = "swaylock";
      }
      {
        event = "lock";
        command = "swaylock";
      }
    ];
    timeouts = [
      {
        timeout = 300;
        command = "hyprctl dispatch dpms off";
        resumeCommand = "hyprctl dispatch dpms on";
      }
      {
        timeout = 310;
        command = "loginctl lock-session";
      }
    ];
  };
}
