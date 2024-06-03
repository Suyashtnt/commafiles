{
  ezModules,
  inputs,
  ...
}: {
  imports = [
    inputs.home-manager.nixosModules.default
    inputs.stylix.nixosModules.stylix

    ezModules.core
    ezModules.laptop
    ezModules.intel
    ezModules.ld
    ezModules.printing
    ezModules.wayland
    ezModules.niri
    ezModules.greetd
    ezModules.sops

    ezModules.theme
    ezModules.kleur

    ./config.nix
    ./hardware.nix
  ];
}
