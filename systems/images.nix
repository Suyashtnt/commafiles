{self, ...}: let
  nixosSystems = import ./default.nix {
    inherit self;
    nixpkgs = self.inputs.nixpkgs;
  };
in {
  rpi4 = nixosSystems.tau.config.system.build.sdImage;
}
