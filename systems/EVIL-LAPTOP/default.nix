{
  ezModules,
  inputs,
  ...
}: {
  imports = [
    inputs.home-manager.nixosModules.default
    inputs.stylix.nixosModules.stylix

    ezModules.core
    ezModules.intel
    ezModules.ld
    ezModules.printing
    ezModules.wayland

    ezModules.theme
    ezModules.kleur

    ./config.nix
    ./hardware.nix
  ];
}
