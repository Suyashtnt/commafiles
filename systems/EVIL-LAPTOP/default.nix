{
  ezModules,
  inputs,
  ...
}: {
  imports = [
    inputs.home-manager.nixosModules.default
    inputs.stylix.nixosModules.stylix

    ezModules.bluetooth
    ezModules.core
    ezModules.laptop
    ezModules.intel
    ezModules.ld
    ezModules.printing
    ezModules.wayland
    ezModules.niri
    ezModules.greetd
    ezModules.sops
    ezModules.niri

    ezModules.theme
    ezModules.kleur

    ./config.nix
    ./hardware.nix
  ];
}
