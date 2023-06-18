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
in {
  GAMER-PC = nixpkgs.lib.nixosSystem {
    system = "x86_64-linux";
    specialArgs = {
      inherit inputs;
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
            inherit inputs;
            inherit self;
            packages = self.packages."x86_64-linux";
          };
          users.tntman = tntman;
        };
      }
    ];
  };
}
