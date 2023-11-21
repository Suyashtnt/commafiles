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
    ezModules.nvidia
    ezModules.ld
    ezModules.printing
    ezModules.wayland
    ezModules.greetd
    ezModules.geoclue
    ezModules.hyprland
    ezModules.openrgb

    ezModules.theme
    ezModules.kleur

    ./config.nix
    ./hardware.nix
  ];
}
