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
        inherit (getPackage "fennel-ls") src version;
      };
      cavalier = pkgs.callPackage ./cavalier {
        inherit (getPackage "cavalier") src version;
      };
    };
  };
}
