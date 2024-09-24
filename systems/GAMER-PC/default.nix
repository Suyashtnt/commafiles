{
  ezModules,
  inputs,
  ...
}: {
  imports = [
    inputs.home-manager.nixosModules.default
    inputs.stylix.nixosModules.stylix
    inputs.lix-module.nixosModules.default

    ezModules.core
    ezModules.intel
    ezModules.nvidia
    ezModules.sops
    ezModules.ld
    ezModules.printing
    ezModules.wayland
    ezModules.greetd
    ezModules.geoclue
    ezModules.niri
    ezModules.openrgb
    ezModules.tablet
    ezModules.steam
    ezModules.sunshine

    ezModules.theme
    ezModules.kleur

    ./config.nix
    ./hardware.nix
  ];
}
