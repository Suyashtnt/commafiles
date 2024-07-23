{
  ezModules,
  inputs,
  ...
}: {
  imports = [
    ./config.nix
    ./hardware.nix

    ezModules.bluetooth
    ../modules/core/nix.nix
    ../modules/core/network.nix
    ../modules/core/security.nix
    ../modules/core/home-manager.nix
    ../modules/core/sound.nix
    ../modules/core/opengl.nix

    "${inputs.nixpkgs}/nixos/modules/installer/sd-card/sd-image-aarch64-installer.nix"
    "${inputs.nixos-hardware}/raspberry-pi/4"
  ];
}
