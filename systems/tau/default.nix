{
  ezModules,
  inputs,
  ...
}: {
  imports = [
    ./config.nix
    ./hardware.nix

    ../modules/core/nix.nix
    ../modules/core/network.nix
    ../modules/core/security.nix
    ../modules/core/home-manager.nix
    ../modules/core/sound.nix

    ezModules.navidrome
    ezModules.vaultwarden
    ezModules.sops

    "${inputs.nixpkgs}/nixos/modules/installer/sd-card/sd-image-aarch64-installer.nix"
    "${inputs.nixos-hardware}/raspberry-pi/4"
  ];
}
