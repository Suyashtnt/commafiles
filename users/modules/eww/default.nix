{
  pkgs,
  ...
}: {
  home.packages = with pkgs; [
    alsa-utils
  ];

  programs.eww = {
    enable = true;
    package = pkgs.eww-wayland;
    configDir = ./config;
  };
}
