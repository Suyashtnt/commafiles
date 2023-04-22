{pkgs, ...}: {
  home.packages = with pkgs; [
    spotify # used as a way to give auth creds to spotifyd, rather use spt when actually playing music
    spotifyPlayer # spotify-tui but cooler
    cava # the funny music visualizer
    cavalier # the funnier music visualizer
  ];

  services.spotifyd = {
    enable = true;
    settings = builtins.fromTOML (builtins.readFile ./config/spotifyd.toml);
  };

  xdg.configFile.cava.source = ./config;
}
