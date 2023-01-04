{ pkgs, ... }: {
  home.packages = with pkgs; [
    spotify # used as a way to give auth creds to spotifyd, rather use spt when actually playing music
    sptlrx
    spotify-tui
    cava # the funny music visualizer
  ];

  services.spotifyd = {
    enable = true;
    settings = builtins.fromTOML (builtins.readFile ./config/spotifyd.toml);
  };

  xdg.configFile.cava.source = ./config;
}
