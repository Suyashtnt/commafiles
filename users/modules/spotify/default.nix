{
  pkgs,
  packages,
  inputs,
  ...
}: let
  spotifyPlayerName = pkgs.craneLib.crateNameFromCargoToml {
    cargoToml = "${inputs.spotify-player-src}/spotify_player/Cargo.toml";
  };

  spotifyPlayer = pkgs.craneLib.buildPackage ({
      src = pkgs.craneLib.cleanCargoSource inputs.spotify-player-src;
      nativeBuildInputs = with pkgs; [pkg-config alsaLib.dev dbus.dev libpulseaudio libiconv openssl];
      cargoExtraArgs = "-p spotify_player --no-default-features --features image,notify,daemon,media-control,pulseaudio-backend";
    }
    // spotifyPlayerName);
in {
  home.packages = with pkgs; [
    spotifyPlayer # spotify terminal edition
    sptlrx # spotify lyrics
    cava # the funny music visualizer
    packages.${pkgs.system}.cavalier # the funnier music visualizer
  ];

  xdg.configFile.cava.source = ./config;
}
