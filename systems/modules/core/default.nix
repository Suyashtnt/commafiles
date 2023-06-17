{
  pkgs,
  hostname,
  ...
}: {
  # some things that will always be needed
  imports = [
    ./fonts.nix
    ./network.nix
    ./nix.nix
    ./opengl.nix
    ./security.nix
    ./sound.nix
  ];
}
