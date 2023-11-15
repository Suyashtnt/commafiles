{inputs, ...}: {
  imports = [
    ./config.nix
    ./hardware.nix

    ../modules/core/nix.nix
    ../modules/core/network.nix
    ../modules/core/security.nix

    "${inputs.nixpkgs}/nixos/modules/installer/sd-card/sd-image-aarch64-installer.nix"
    "${inputs.nixos-hardware}/raspberry-pi/4"
  ];
}
