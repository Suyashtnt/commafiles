{
  pkgs,
  lib,
  ...
}@args:
with lib; let
  mkService = lib.recursiveUpdate {
    Unit.PartOf = ["graphical-session.target"];
    Unit.After = ["graphical-session.target"];
    Install.WantedBy = ["graphical-session.target"];
  };

  ocr = pkgs.writeShellScriptBin "ocr" ''
    #!/bin/bash
    grim -g "$(slurp -w 0 -b eebebed2)" /tmp/ocr.png && tesseract /tmp/ocr.png /tmp/ocr-output && wl-copy < /tmp/ocr-output.txt && notify-send "OCR" "Text copied!" && rm /tmp/ocr-output.txt -f
  '';

  screenshot = pkgs.writeShellScriptBin "screenshot" ''
    #!/bin/bash
    hyprctl keyword animation "fadeOut,0,8,slow" && ${pkgs.grim}/bin/grim -g "$(${pkgs.slurp}/bin/slurp -w 0 -b 5e81acd2)" - | pngquant -q 75 | ${pkgs.wl-clipboard}/bin/wl-copy --type image/png; hyprctl keyword animation "fadeOut,1,8,slow"
  '';
in {
  home.packages = with pkgs; [
    xdg-desktop-portal-hyprland
    libnotify
    brightnessctl
    pamixer
    python39Packages.requests
    slurp
    tesseract5
    ocr
    grim
    screenshot
    wl-clipboard
    pngquant
    swww
    libsForQt5.qt5.qtwayland
  ];

  wayland.windowManager.hyprland = {
    enable = true;
    package = pkgs.hyprland;

    xwayland.enable = true;
    systemd.enable = true;

    extraConfig = import ./hyprland.conf.nix args;
  };

  systemd.user.services.swww = mkService {
    Unit.Description = "Wallpaper chooser";
    Service.ExecStart = "${pkgs.swww}/bin/swww init --no-daemon";
  };
}
