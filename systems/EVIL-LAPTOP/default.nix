{
  ezModules,
  inputs,
  ...
}: {
  imports = [
    inputs.home-manager.nixosModules.default
    inputs.stylix.nixosModules.stylix

    ezModules.core
    ezModules.amd
    ezModules.ld
    ezModules.printing
    ezModules.wayland
    ezModules.geoclue

    ezModules.theme
    ezModules.kleur

    ./config.nix
    ./hardware.nix
  ];
}
