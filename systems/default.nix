{
  nixpkgs,
  self,
  ...
}: let
  inputs = self.inputs;
  bootloader = ./modules/core/bootloader.nix;
  core = ./modules/core;
  intel = ./modules/intel;
  nvidia = ./modules/nvidia;
  wayland = ./modules/wayland;
  printing = ./modules/printing;
  teamviewer = ./modules/teamviewer;
  ld = ./modules/ld;

  greetd = ./modules/loginManager/greetd.nix;
  geoclue = ./modules/geoclue;
  openrgb = ./modules/openrgb;

  hmModule = inputs.home-manager.nixosModules.home-manager;

  tntman = ../users/tntman;
  tau = ../users/tau;
in {
  GAMER-PC = nixpkgs.lib.nixosSystem rec {
    system = "x86_64-linux";
    specialArgs = {
      inherit inputs system;
      hostname = "GAMER-PC";
    };
    modules = [
      ./GAMER-PC
      ./GAMER-PC/hardware.nix
      bootloader
      core
      intel
      ld
      printing
      nvidia
      wayland
      teamviewer
      hmModule
      greetd
      geoclue
      openrgb
      {
        home-manager = {
          useUserPackages = true;
          useGlobalPkgs = true;
          extraSpecialArgs = {
            inherit inputs self system;
            packages = self.packages."x86_64-linux";
          };
          users.tntman = tntman;
        };
      }
    ];
  };
  tau = nixpkgs.lib.nixosSystem rec {
    system = "aarch64-linux";
    specialArgs = {
      inherit inputs system;
      hostname = "tau";
    };
    modules = [
      ./tau
      ./tau/hardware.nix

      ./modules/core/nix.nix
      ./modules/core/network.nix
      ./modules/core/security.nix

      hmModule
      "${inputs.nixpkgs}/nixos/modules/installer/sd-card/sd-image-aarch64-installer.nix"
      "${inputs.nixos-hardware}/raspberry-pi/4"

      {
        home-manager = {
          useUserPackages = true;
          useGlobalPkgs = true;
          extraSpecialArgs = {
            inherit inputs self system;
            packages = self.packages."aarch64-linux";
          };
          users.tau = tau;
        };
      }
    ];
  };
}
