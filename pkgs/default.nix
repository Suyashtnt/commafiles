{config, ...}: {
  perSystem = {
    self',
    pkgs,
    ...
  }: {
    packages = let
      getPackage = pname: (pkgs.callPackage ../_sources/generated.nix {}).${pname};
    in {
      fennel-ls = pkgs.callPackage ./fennel-ls {
        inherit (getPackage "fennel-ls") src version pname;
      };
      cavalier = pkgs.callPackage ./cavalier {
        inherit (getPackage "cavalier") src version pname;
      };
      firefox-pwa = pkgs.callPackage ./firepwa {};
      default = pkgs.writeText "cachix-deploy.json" (builtins.toJSON {
        agents = {
          GAMER-PC = config.flake.nixosConfigurations.GAMER-PC.config.system.build.toplevel;
          EVIL-LAPTOP = config.flake.nixosConfigurations.EVIL-LAPTOP.config.system.build.toplevel;
        };
      });
    };
  };
}
