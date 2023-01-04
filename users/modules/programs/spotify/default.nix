{pkgs, ...}: {
  home.packages = with pkgs; [
    spotify # used as a way to give auth creds to spotifyd, rather use spt when actually playing music
    sptlrx
    spotify-tui
  ];

  services.spotifyd = {
    enable = true;
    settings = builtins.fromTOML (builtins.readFile ./spotifyd.toml);
  };
}
