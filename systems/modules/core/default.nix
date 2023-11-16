{...}: {
  # some things that will always be needed
  imports = [
    ./bootloader.nix
    ./fonts.nix
    ./network.nix
    ./nix.nix
    ./opengl.nix
    ./security.nix
    ./sound.nix
    ./home-manager.nix
  ];
}
