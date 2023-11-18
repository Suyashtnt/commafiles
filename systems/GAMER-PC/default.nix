{
  ezModules,
  inputs,
  ...
}: {
  imports = [
    inputs.home-manager.nixosModules.default

    ezModules.core
    ezModules.intel
    ezModules.nvidia
    ezModules.ld
    ezModules.printing
    ezModules.wayland
    ezModules.greetd
    ezModules.geoclue
    ezModules.openrgb

    ./config.nix
    ./hardware.nix
  ];
}
