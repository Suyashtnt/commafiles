{...}: {
  perSystem = {
    config,
    self',
    inputs',
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
    };
  };
}
